# /// script
# requires-python = ">=3.9"
# dependencies = ["numpy", "pillow", "scipy"]
# ///
"""The hero's photographs from Jorge's originals (private/originals/, 2026-11-10; git-ignored, never served).

- The grip (`private/006d00f4-2c54-4e72-a9f1-ab8f15059435.png`, 2026-11-10): Jorge holding
  a real jewel case, already cut out with the case. It lives in private/ (git-ignored, not
  served) because the case frames a private photo; only the hand ever leaves this script. The case (and the private photo inside it) is
  removed: inside the case's outline, fitted from its alpha edges and grown 12 px, only
  skin is kept (warm, bright pixels connected to the forearm, holes such as the nail
  filled); outside it the arm is re-cut by the same skin test, which drops the cut-out
  tool's wide white halo. The mask is pulled in 1 px and feathered, edge colours are taken
  from the opaque skin, and the part the frame can show is saved as arm-<width>.webp.
  Printed: where the case's top-right corner lands in that file and its turn, so Hero.css
  can lay the sleeve exactly where the case was.
- The cover (`jorge_arcas_cover_1200px.png`): the sleeve's print at 1200 px, saved as
  public/images/hero/cover-<width>.webp. Its dark files come from
  scripts/generate-theme-variants.mjs (complement), as before.
- The disc (private/originals/hero/cdJorge_1200px.png, 2026-11-10): the printed CD on black. The
  black round it and in the centre hole is cut away with two measured circles (centre and
  radii found along 72 rays), the rim pulled in 1.5 px so no black-mixed pixel stays, then
  saved as disc-<width>.webp and .avif. Dark files: generate-theme-variants.mjs.


Not part of the build (needs uv, https://docs.astral.sh/uv/):
    uv run scripts/prepare-hero-art.py
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'private/originals/assets'
OUT = ROOT / 'public/images/hero'

GRIP = ROOT / 'private/006d00f4-2c54-4e72-a9f1-ab8f15059435.png'
# The jewel case's corners in the photo, from straight fits of its alpha edges (top, right,
# bottom, left): it is turned 4.9° anticlockwise; its front insert is 650 px square.
CASE = ((0.9, 64.6), (760.5, 1.2), (818.6, 653.5), (40.2, 720.4))
CASE_TURN = 4.9
# Seen by the frame at every width checked (the rest of the forearm never is).
GRIP_CROP = (380, 150, 1640, 1180)
ARM_WIDTHS = (760, 1260)
COVER = 'jorge_arcas_cover_1200px.png'
COVER_WIDTHS = (480, 720, 880, 1024, 1200)
DISC = ROOT / 'private/originals/hero/cdJorge_1200px.png'
DISC_WIDTHS = (560, 800, 1190)


def defringe(rgba: np.ndarray, rounds: int = 6) -> np.ndarray:
    """Edge pixels take the mean colour of their opaque neighbours, grown outwards."""
    rgb = rgba[..., :3].astype(np.float32)
    known = rgba[..., 3] >= 250
    out = rgb.copy()
    for _ in range(rounds):
        total = np.zeros_like(out)
        count = np.zeros(known.shape, np.float32)
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dx == 0 and dy == 0:
                    continue
                shifted_known = np.roll(np.roll(known, dy, 0), dx, 1)
                shifted = np.roll(np.roll(out, dy, 0), dx, 1)
                total += shifted * shifted_known[..., None]
                count += shifted_known
        grow = ~known & (count > 0)
        out[grow] = total[grow] / count[grow][:, None]
        known = known | grow
    rgba = rgba.copy()
    rgba[..., :3] = np.clip(out, 0, 255).round().astype(np.uint8)
    return rgba


def trim(rgba: np.ndarray, margin: int = 2):
    ys, xs = np.where(rgba[..., 3] > 0)
    y0, y1 = max(ys.min() - margin, 0), min(ys.max() + margin + 1, rgba.shape[0])
    x0, x1 = max(xs.min() - margin, 0), min(xs.max() + margin + 1, rgba.shape[1])
    return rgba[y0:y1, x0:x1], (x0, y0)


def save(image: Image.Image, name: str, widths, alpha: bool):
    for width in widths:
        width = min(width, image.width)
        height = round(image.height * width / image.width)
        if alpha:
            # Premultiplied resize: no dark or light halo at the edge.
            resized = image.convert('RGBa').resize((width, height), Image.Resampling.LANCZOS).convert('RGBA')
            options = dict(quality=84, alpha_quality=90, method=6)
        else:
            resized = image.convert('RGB').resize((width, height), Image.Resampling.LANCZOS)
            # The upscaled print carries fine texture: 78 keeps the files near the old ones.
            options = dict(quality=78, method=6)
        path = OUT / f'{name}-{width}.webp'
        resized.save(path, 'WEBP', **options)
        print(f'  {path.relative_to(ROOT)}  {width}x{height}  {path.stat().st_size / 1024:.1f} kB')


def inside(poly, shape, grow):
    """Pixels inside a clockwise polygon (screen coordinates), grown by `grow` px."""
    h, w = shape
    yy, xx = np.mgrid[0:h, 0:w]
    mask = np.ones(shape, bool)
    for (x0, y0), (x1, y1) in zip(poly, poly[1:] + poly[:1]):
        nx, ny = y1 - y0, -(x1 - x0)
        n = np.hypot(nx, ny)
        mask &= (xx - x0) * nx / n + (yy - y0) * ny / n <= grow
    return mask


photo = np.asarray(Image.open(GRIP).convert('RGBA'))
r, g, b = (photo[..., i].astype(np.int16) for i in range(3))
lum = (r + g + b) / 3
warm = (r - b > 18) & (r >= g - 4)
case = inside(list(CASE), lum.shape, grow=12)
# In the case the insert is a dark night photo, neutral or bluish (red minus blue <= 0),
# while skin stays warm even in shadow: the shaded band along the thumb's top is dark
# (lightness ~45) but warm (r - b ~15), so warmth, not lightness, tells them apart. The
# nail is light and barely warm; the clear plastic is neutral. Elsewhere darker skin too.
nail = (r - b > 6) & (lum > 140)
shaded = (r - b > 8) & (r >= g - 4) & (lum > 30)
skin = np.where(case, shaded | nail, warm & (lum > 35) & (photo[..., 3] > 100))
skin = ndi.binary_opening(skin, structure=np.ones((3, 3)))
labels, _ = ndi.label(skin, structure=np.ones((3, 3)))
hand = ndi.binary_fill_holes(labels == labels[1500, 1500])
# A round closing fills the notches the skin test leaves on the contour (the nail's root,
# the step where the case's edge crossed the palm); a blur-and-threshold smooths it.
disk = np.hypot(*np.mgrid[-4:5, -4:5]) <= 4
hand = ndi.binary_fill_holes(ndi.binary_closing(hand, structure=disk, iterations=2))
hand = ndi.gaussian_filter(hand.astype(np.float32), 2.0) > 0.5
hand = ndi.binary_erosion(hand, iterations=1)
alpha = ndi.gaussian_filter(hand.astype(np.float32), 1.2)
cut = photo.copy()
cut[..., 3] = (np.clip(alpha, 0, 1) * 255).round().astype(np.uint8)
cut[~hand] = cut[~hand] * [0, 0, 0, 1]
x0, y0, x1, y1 = GRIP_CROP
cut = defringe(cut, rounds=4)[y0:y1, x0:x1]
save(Image.fromarray(cut, 'RGBA'), 'arm', ARM_WIDTHS, alpha=True)
w, h = x1 - x0, y1 - y0
corner = (CASE[1][0] - x0, CASE[1][1] - y0)
print(f'arm {w}x{h}: case top-right at ({corner[0]:.1f}, {corner[1]:.1f}) px = '
      f'{corner[0] / w * 100:.2f}% {corner[1] / h * 100:.2f}% of the file, {corner[0] / w:.4f} / '
      f'{-corner[1] / w:.4f} of its width; insert 650 px; turn {CASE_TURN}°')

save(Image.open(SRC / COVER), 'cover', COVER_WIDTHS, alpha=False)


def disc_circles(lum: np.ndarray):
    """Centre, outer radius and hole radius of the disc, from the brightest/darkest edge
    along 72 rays (one recentring pass from the image's middle)."""
    h, w = lum.shape

    def ray_edges(cx, cy):
        outer, inner = [], []
        for k in range(72):
            t = k * np.pi / 36
            r = np.arange(0, min(w, h) / 2 + 4, 0.5)
            x, y = cx + r * np.cos(t), cy + r * np.sin(t)
            keep = (x >= 0) & (x < w - 1) & (y >= 0) & (y < h - 1)
            bright = r[keep][lum[y[keep].astype(int), x[keep].astype(int)] > 60]
            outer.append(bright.max())
            inner.append(bright.min())
        return np.array(outer), np.array(inner)

    cx, cy = w / 2, h / 2
    outer, _ = ray_edges(cx, cy)
    angles = np.arange(36) * np.pi / 36
    cx += np.mean((outer[:36] - outer[36:]) * np.cos(angles))
    cy += np.mean((outer[:36] - outer[36:]) * np.sin(angles))
    outer, inner = ray_edges(cx, cy)
    return cx, cy, float(np.median(outer)), float(np.median(inner))


rgb = np.asarray(Image.open(DISC).convert('RGB'))
cx, cy, r_out, r_hole = disc_circles(rgb.mean(2))
side = int(np.floor(r_out)) * 2
x0, y0 = int(round(cx - side / 2)), int(round(cy - side / 2))
crop = rgb[y0:y0 + side, x0:x0 + side].astype(np.float32)
yy, xx = np.mgrid[0:side, 0:side] + 0.5
dist = np.hypot(xx - (cx - x0), yy - (cy - y0))
alpha = np.clip((r_out - 1.5) - dist + 0.6, 0, 1) * np.clip(dist - (r_hole + 1.0) + 0.6, 0, 1)
disc = np.dstack([crop, alpha * 255]).round().astype(np.uint8)
print(f'disc centre ({cx:.1f}, {cy:.1f}), radius {r_out:.1f}, hole {r_hole:.1f} -> {side} px square')
image = Image.fromarray(disc, 'RGBA')
save(image, 'disc', DISC_WIDTHS, alpha=True)
for width in DISC_WIDTHS:
    path = OUT / f'disc-{width}.avif'
    image.convert('RGBa').resize((width, width), Image.Resampling.LANCZOS).convert('RGBA').save(path, 'AVIF', quality=62)
    print(f'  {path.relative_to(ROOT)}  {path.stat().st_size / 1024:.1f} kB')
