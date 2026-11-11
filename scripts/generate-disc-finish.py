# /// script
# requires-python = ">=3.9"
# dependencies = ["numpy", "pillow", "opencv-python-headless"]
# ///
"""The photographic finish of the printed project discs (DESIGN.md "Materials"):

- public/images/disc/shell.webp: the clear hub and the outer rim of Jorge's printed disc,
  cut from the hero disc photo (private/originals/hero/disc.webp), with the printed band in
  between made transparent. Every project disc wears the same real plastic as the hero
  disc; its own print shows through the band. Measured on that photo (radius fractions):
  hole < 0.11, clear hub to ~0.195, print 0.20–0.96, rim 0.965–0.99. Neutral greys: one
  file serves both themes.
- public/images/disc/wear.webp: the scratches and dust of a real disc, lifted from the
  photo of the broken CD (private/originals/assets/f098….jpg): the luminance's fine detail
  (a high-pass), white with alpha. The cracks between the shards and their bright edges
  are masked out, so the map shows wear, not breakage; the hub's print (someone else's
  catalogue text) is masked out too. Some shards are far more scratched than others, so
  the density is evened out over ~a tenth of the disc, and three turned copies of the map
  fill each other's gaps: no shard's outline survives. Disc.css rotates it per disc.

Nothing is drawn: every visible pixel comes from the two photos.

Not part of the build (needs uv, https://docs.astral.sh/uv/):
    uv run scripts/generate-disc-finish.py
"""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
HERO_DISC = ROOT / 'private/originals/hero/disc.webp'
BROKEN = ROOT / 'private/originals/assets/f098154a4a8bfa62ea126dbc9227955d.jpg'
OUT = ROOT / 'public/images/disc'

HUB = 0.195     # the clear hub ends, the print starts (hero disc, measured)
RIM = 0.967     # the print ends, the rim starts (clear of its last blue pixels)
FEATHER = 0.006  # soft seam, as a share of the radius

WEAR_SIZE = 640
WEAR_RANGE = (0.36, 0.955)  # radius band kept: off the broken disc's printed hub, its ring and rim
CRACK_LEVEL = 0.16           # darker than this is a gap between shards (black ground)
CRACK_GROW = 9               # px at the photo's scale: the shards' bright cut edges


def save(rgba: np.ndarray, path: Path, quality: int, alpha_quality: int = 90) -> None:
    image = Image.fromarray((np.clip(rgba, 0, 1) * 255).round().astype(np.uint8), 'RGBA')
    image.save(path, 'WEBP', quality=quality, alpha_quality=alpha_quality, method=6)
    print(f'  {path.relative_to(ROOT)}  {image.width}×{image.height}  {path.stat().st_size / 1024:.1f} kB')


def shell() -> None:
    disc = np.asarray(Image.open(HERO_DISC).convert('RGBA')).astype(np.float64) / 255.0
    h, w = disc.shape[:2]
    ys, xs = np.mgrid[0:h, 0:w]
    r = np.hypot(xs - (w - 1) / 2, ys - (h - 1) / 2) / (w / 2)
    hub = np.clip((HUB - r) / FEATHER, 0, 1)
    rim = np.clip((r - RIM) / FEATHER, 0, 1)
    keep = np.maximum(hub, rim)
    rgba = disc.copy()
    rgba[..., 3] = disc[..., 3] * keep
    # Hub and rim are clear plastic and silver: neutralise the label's blue at their seams.
    grey = rgba[..., :3].mean(axis=2, keepdims=True)
    rgba[..., :3] = np.where((keep > 0)[..., None], grey, rgba[..., :3])
    save(rgba, OUT / 'shell.webp', 90)


def wear() -> None:
    photo = np.asarray(Image.open(BROKEN).convert('RGB')).astype(np.float64) / 255.0
    lum = photo @ np.array([0.2126, 0.7152, 0.0722])
    h, w = lum.shape

    # The disc's circle: the shards' silhouette against the black ground.
    solid = (lum > CRACK_LEVEL).astype(np.uint8)
    solid = cv2.morphologyEx(solid, cv2.MORPH_CLOSE, np.ones((25, 25), np.uint8))
    contours, _ = cv2.findContours(solid, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    (cx, cy), radius = cv2.minEnclosingCircle(max(contours, key=cv2.contourArea))

    # Fine detail only: scratches and specks brighter than their surroundings.
    detail = lum - cv2.GaussianBlur(lum, (0, 0), sigmaX=3.0)
    detail = np.clip(detail, 0, None)

    gaps = (lum < CRACK_LEVEL).astype(np.uint8)
    gaps = cv2.dilate(gaps, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * CRACK_GROW + 1,) * 2))
    ys, xs = np.mgrid[0:h, 0:w]
    r = np.hypot(xs - cx, ys - cy) / radius
    band = (r > WEAR_RANGE[0]) & (r < WEAR_RANGE[1])
    detail[(gaps > 0) | ~band] = 0

    # Even the density: divide by the local amount of detail (shards differ a lot).
    kept = ((gaps == 0) & band).astype(np.float64)
    window = radius * 0.2
    local = cv2.GaussianBlur(detail, (0, 0), window) / np.maximum(cv2.GaussianBlur(kept, (0, 0), window), 1e-3)
    detail = np.where(kept > 0, detail / np.maximum(local, np.percentile(local[kept > 0], 20)), 0)

    # Scale so the strongest scratches are nearly opaque and the noise floor vanishes.
    floor, peak = np.percentile(detail[kept > 0], [82, 99.8])
    alpha = np.clip((detail - floor) / (peak - floor), 0, 1) ** 1.3

    # Centre on the disc and resample to the output size (the disc fills it).
    size = int(round(radius * 2))
    x0, y0 = int(round(cx - radius)), int(round(cy - radius))
    canvas = np.zeros((size, size))
    sx0, sy0 = max(x0, 0), max(y0, 0)
    sx1, sy1 = min(x0 + size, w), min(y0 + size, h)
    canvas[sy0 - y0:sy1 - y0, sx0 - x0:sx1 - x0] = alpha[sy0:sy1, sx0:sx1]
    canvas = cv2.resize(canvas, (WEAR_SIZE, WEAR_SIZE), interpolation=cv2.INTER_AREA)

    # Three turned copies fill each other's gaps (a crack at one angle is a shard at another).
    centre = ((WEAR_SIZE - 1) / 2, (WEAR_SIZE - 1) / 2)
    turned = [cv2.warpAffine(canvas, cv2.getRotationMatrix2D(centre, angle, 1.0), (WEAR_SIZE, WEAR_SIZE))
              for angle in (0, 131, 227)]
    filled = np.max(np.stack(turned), axis=0)
    ys, xs = np.mgrid[0:WEAR_SIZE, 0:WEAR_SIZE]
    r = np.hypot(xs - centre[0], ys - centre[1]) / (WEAR_SIZE / 2)
    # Fade in from the hub side over a tenth of the radius: no visible edge to the wear.
    filled *= np.clip((r - WEAR_RANGE[0]) / 0.1, 0, 1) * np.clip((WEAR_RANGE[1] - r) / 0.02, 0, 1)
    rgba = np.dstack([np.ones((WEAR_SIZE, WEAR_SIZE, 3)), np.clip(filled * 0.9, 0, 1)])
    # Seen at low opacity over a print: a coarser alpha costs half the bytes and shows nothing.
    save(rgba, OUT / 'wear.webp', 60, alpha_quality=45)


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    shell()
    wear()
