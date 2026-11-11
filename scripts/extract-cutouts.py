# /// script
# requires-python = ">=3.9"
# dependencies = ["numpy", "pillow", "opencv-python-headless"]
# ///
"""Jorge's cut-outs with real transparency: public/images/cutouts/<id>-<width>.webp.

The sources (private/originals/assets/, supplied 2026-11-09; git-ignored, never served) are flat files: JPEGs on a white,
black or cream ground or on a "transparent" checkerboard painted into the pixels, and two
PNGs on an opaque flat grey. Nothing is redrawn and the originals are never modified;
every pixel of an object is the original's.

Keys (one per ground):
- `flood`: the ground is one colour. Pixels close to it AND connected to the image's edge
  are background, so whatever repeats the ground inside the object (the knob's white
  numbers, the barcode's bars, a highlight) stays. Edge pixels get a partial alpha from
  their distance to the ground and their colour is un-mixed from it (no white or grey
  fringe).
- `checker`: the same against the painted checkerboard, rebuilt square by square (period
  and phase measured on the image's edges). `enclosed=True` keys every checker pixel, for
  objects with holes (the map pin).
- `ink`: marker or print on paper: colour-to-alpha against the paper, as in
  scripts/extract-marker-arrow.py; translucent ink stays translucent.
- `alpha`: a source that is already cut out (an RGBA file): its own matte is kept.

Edges (`edge`):
- `None`: the object's own edge (tape, ink) or its own paper (stickers, barcode, pin).
- `'paper'`: a die-cut paper margin, as if the photo had been cut out with scissors: the
  matte grown by `margin` (a share of the object's size), roughened with low-frequency
  noise, filled with off-white paper and a little grain. Where a photo was already cut by
  its frame (headphones, the train, the phone's cord), the margin follows that straight cut
  too: it is a scissor cut, not a hidden edge.

Output: trimmed, resized in premultiplied alpha (no dark or light halos), lossy WebP colour
and alpha at the widths each cut-out is shown at (1×, 2× and, for the hero's larger ones,
a step between, so a 2× screen does not fetch more than it shows). Change a recipe's
widths here and the registry in src/config/assets.ts together.

Not part of the build (needs uv, https://docs.astral.sh/uv/):
    uv run scripts/extract-cutouts.py            # every cut-out
    uv run scripts/extract-cutouts.py knob pin   # some of them
"""
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'private/originals/assets'
OUT = ROOT / 'public/images/cutouts'

# Off-white cut paper: a touch warmer than the page, so the margin reads as paper.
PAPER = np.array([246, 244, 239]) / 255.0

RECIPES = {
    # Sticker with its own black outline and cream print, on an opaque flat grey.
    'not-ai': dict(src='descarga (2).png', key='flood', ground=(128, 128, 128), tol=(0.03, 0.12), choke=1, widths=(200, 300, 400)),
    # Blue marker on cream paper: ink, translucent. Its dark-theme ink comes from
    # scripts/generate-theme-variants.mjs.
    'scribble': dict(src='ca456dafb3b1f3fa835966f0762978a5.jpg', key='ink', ground=(255, 252, 247), hue='blue', widths=(460,)),
    # Two exclamation marks printed black: cut out as a sticker.
    'bang': dict(src='ab1db9bafd90ccd2293b55c884fcf7fc.jpg', key='ink', ground=(247, 247, 247), edge='paper', margin=0.055, widths=(120, 240)),
    # Product photos on white: cut out with a thin scissor margin.
    'headphones': dict(src='8f1f787f7dfe17d909ac2da4871118cf.jpg', key='flood', ground=(255, 255, 255), tol=(0.025, 0.1), edge='paper', margin=0.018, widths=(360, 540, 720)),
    'knob': dict(src='e14cb002fa588e89b1eb05aa941f0f24.jpg', key='flood', ground=(255, 255, 255), tol=(0.025, 0.1), edge='paper', margin=0.035, widths=(180, 270, 360)),
    'phone': dict(src='d5c1781fd8005fdd9de725f7553c0734.jpg', key='flood', ground=(255, 255, 255), tol=(0.025, 0.1), edge='paper', margin=0.02, widths=(100, 200)),
    # Paper cut-outs that bring their own paper.
    'pin': dict(src='ca7a189e62645406674eeccd383e3041.jpg', key='checker', tol=(0.04, 0.1), enclosed=True, widths=(180, 340)),
    'https': dict(src='92fdc57a2b50f62312f35db31bc53b63.jpg', key='flood', ground=(255, 255, 255), tol=(0.03, 0.12), edge='paper', margin=0.02, widths=(260, 520)),
    # Its middle square is the white ground too.
    'hash': dict(src='9c13ac0ade59c7a1d56b4dc924d3bea3.jpg', key='flood', ground=(255, 255, 255), tol=(0.03, 0.12), enclosed=True, widths=(200, 400)),
    # Torn paper label on black.
    'barcode': dict(src='5010494e709afdc1582fe32c3993c194.jpg', key='flood', ground=(0, 0, 0), tol=(0.04, 0.14), choke=1, widths=(280, 560)),
    # 2026-11-10 (ADR-001). The iPod, Proceso's object: a product photo on white, its
    # screen left dark (the chapter prints its playlist there). Shown up to ~460 px wide.
    'ipod': dict(src='75b26a489ffd36cad1f8903b662339e4.jpg', key='flood', ground=(255, 255, 255), tol=(0.025, 0.1), edge='paper', margin=0.012, widths=(460, 760, 920), quality=74),
    # Jorge's portrait (the pass's photo), already cut out: its own matte, with a
    # scissor margin like the other photos. Sobre mí's object; the source is 457 px wide.
    'jorge': dict(src=ROOT / 'public/images/brand/avatar.webp', key='alpha', edge='paper', margin=0.022, widths=(320, 480)),
}


def load(name: str) -> np.ndarray:
    """RGB in 0..1."""
    return np.asarray(Image.open(SRC / name).convert('RGB')).astype(np.float64) / 255.0


def pad_with(rgb: np.ndarray, ground: np.ndarray, n: int) -> np.ndarray:
    """Room round an object that touches the frame, filled with its ground."""
    h, w, _ = rgb.shape
    out = np.empty((h + 2 * n, w + 2 * n, 3))
    out[:] = ground
    out[n:n + h, n:n + w] = rgb
    return out


def checker_ground(rgb: np.ndarray) -> np.ndarray:
    """Rebuild the painted checkerboard: two levels, square size and phase from the edges."""
    grey = rgb.mean(axis=2)
    h, w = grey.shape
    light, dark = np.percentile(grey[0], 90), np.percentile(grey[0], 10)
    mid = (light + dark) / 2

    def fit(line: np.ndarray):
        flips = np.where(np.diff((line > mid).astype(int)) != 0)[0] + 1
        k = np.arange(len(flips))
        period, phase = np.polyfit(k, flips, 1)
        return period, phase, line[0] > mid

    px, ox, first_light = fit(grey[1])
    py, oy, _ = fit(grey[:, 1])
    ys, xs = np.mgrid[0:h, 0:w]
    cell = (np.floor((xs - ox) / px) + np.floor((ys - oy) / py)).astype(int) % 2
    # cell 0 holds the colour of the first square (x < ox, y < oy).
    first = light if first_light else dark
    other = dark if first_light else light
    level = np.where(cell == 0, first, other)
    return np.repeat(level[..., None], 3, axis=2)


def key_ground(rgb: np.ndarray, ground: np.ndarray, tol, enclosed=False):
    """Alpha against a known ground (one colour, or an image of the checkerboard)."""
    lo, hi = tol
    dist = np.abs(rgb - ground).max(axis=2)
    near = dist < hi
    if enclosed:
        background = near
    else:
        count, labels = cv2.connectedComponents(near.astype(np.uint8), connectivity=4)
        edge_labels = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
        edge_labels = edge_labels[edge_labels > 0]
        background = np.isin(labels, edge_labels) & near
    alpha = np.ones(dist.shape)
    soft = np.clip((dist - lo) / (hi - lo), 0.0, 1.0)
    alpha[background] = soft[background]
    return alpha


def key_ink(rgb: np.ndarray, ground: np.ndarray, hue=None):
    """Colour-to-alpha for ink darker than its paper (scripts/extract-marker-arrow.py)."""
    alpha = np.clip(np.where(rgb < ground, (ground - rgb) / np.maximum(ground, 1e-6), 0.0).max(axis=2), 0, 1)
    if hue == 'blue':
        # Only blue reads as ink: grey JPEG noise in the paper is not.
        blueness = rgb[..., 2] - rgb[..., 0]
        gate = np.clip((blueness - 0.02) / 0.06, 0.0, 1.0)
        gate = gate * gate * (3 - 2 * gate)
        alpha = alpha * gate
    noise = 0.04
    return np.clip((alpha - noise) / (1 - noise), 0.0, 1.0)


def unmix(rgb: np.ndarray, alpha: np.ndarray, ground: np.ndarray) -> np.ndarray:
    """The object's own colour where it is partly covered by the ground (edges, ink)."""
    a = np.maximum(alpha, 1e-3)[..., None]
    return np.clip(ground + (rgb - ground) / a, 0.0, 1.0)


def choke(alpha: np.ndarray, px: int) -> np.ndarray:
    if px <= 0:
        return alpha
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * px + 1, 2 * px + 1))
    return cv2.erode(alpha.astype(np.float32), kernel).astype(np.float64)


def despeckle(alpha: np.ndarray, min_area: int) -> np.ndarray:
    """Drop islands of noise that survived the key, smaller than `min_area` pixels."""
    solid = (alpha > 0.5).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(solid, connectivity=8)
    keep = np.zeros(count, bool)
    keep[1:] = stats[1:, cv2.CC_STAT_AREA] >= min_area
    grown = cv2.dilate(keep[labels].astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    return np.where(grown, alpha, 0.0)


def paper_edge(rgb: np.ndarray, alpha: np.ndarray, margin_px: float, seed: int):
    """A die-cut paper margin round the matte, roughened like a scissor cut."""
    rng = np.random.default_rng(seed)
    h, w = alpha.shape
    solid = (alpha > 0.5).astype(np.uint8)
    outside = cv2.distanceTransform(1 - solid, cv2.DIST_L2, 5)
    # Low-frequency wobble: the hand does not follow the outline exactly.
    wobble = cv2.GaussianBlur(rng.standard_normal((h, w)), (0, 0), sigmaX=max(margin_px * 2.2, 3))
    wobble /= np.abs(wobble).max() + 1e-6
    reach = margin_px * (1 + 0.35 * wobble)
    paper_alpha = np.clip(reach - outside + 0.5, 0.0, 1.0)
    # Fill the paper's pinholes (inside loops narrower than the margin stay paper).
    paper_alpha = np.maximum(paper_alpha, alpha)
    grain = cv2.GaussianBlur(rng.standard_normal((h, w)), (0, 0), sigmaX=0.7)[..., None] * 0.012
    # The cut edge catches a little shade: the paper's thickness.
    rim = np.clip(1 - (reach - outside) / 1.6, 0, 1)[..., None] * (outside > 0)[..., None] * 0.07
    paper = np.clip(PAPER + grain - rim, 0, 1)
    out_rgb = rgb * alpha[..., None] + paper * (1 - alpha[..., None])
    return out_rgb, paper_alpha


def trim(rgba: np.ndarray, margin: int = 2) -> np.ndarray:
    ys, xs = np.where(rgba[..., 3] > 0.004)
    y0, y1 = max(ys.min() - margin, 0), min(ys.max() + margin + 1, rgba.shape[0])
    x0, x1 = max(xs.min() - margin, 0), min(xs.max() + margin + 1, rgba.shape[1])
    return rgba[y0:y1, x0:x1]


def save(rgba: np.ndarray, name: str, widths, quality: int = 84) -> list:
    """Premultiplied resize (no halos), lossy colour and alpha."""
    image = Image.fromarray((np.clip(rgba, 0, 1) * 255).round().astype(np.uint8), 'RGBA')
    written = []
    for width in widths:
        width = min(width, image.width)
        height = round(image.height * width / image.width)
        resized = image.convert('RGBa').resize((width, height), Image.Resampling.LANCZOS).convert('RGBA')
        path = OUT / f'{name}-{width}.webp'
        resized.save(path, 'WEBP', quality=quality, alpha_quality=88, method=6)
        written.append((path.relative_to(ROOT), width, height, path.stat().st_size))
    return written


def extract(name: str, recipe: dict, seed: int):
    rgb = load(recipe['src'])
    ground = np.array(recipe.get('ground', (0, 0, 0))) / 255.0
    paper = recipe.get('edge') == 'paper'
    margin_px = recipe.get('margin', 0) * max(rgb.shape[:2])
    room = int(np.ceil(margin_px * 1.5)) + 4

    if recipe['key'] == 'checker':
        rgb = np.pad(rgb, ((room, room), (room, room), (0, 0)), mode='reflect') if paper else rgb
        backdrop = checker_ground(rgb)
        alpha = key_ground(rgb, backdrop, recipe['tol'], recipe.get('enclosed', False))
        alpha = despeckle(alpha, 400)
        colour = unmix(rgb, alpha, backdrop)
    elif recipe['key'] == 'flood':
        rgb = pad_with(rgb, ground, room)
        alpha = key_ground(rgb, ground, recipe['tol'], recipe.get('enclosed', False))
        alpha = despeckle(alpha, 400)
        colour = unmix(rgb, alpha, ground)
    elif recipe['key'] == 'alpha':
        # Already cut out (an RGBA source): its own matte, with clear room round it.
        rgba = np.asarray(Image.open(SRC / recipe['src']).convert('RGBA')).astype(np.float64) / 255.0
        rgba = np.pad(rgba, ((room, room), (room, room), (0, 0)))
        colour, alpha = rgba[..., :3], rgba[..., 3]
    else:
        rgb = pad_with(rgb, ground, room)
        alpha = key_ink(rgb, ground, recipe.get('hue'))
        alpha = despeckle(alpha, 60)
        colour = unmix(rgb, alpha, ground)

    alpha = choke(alpha, recipe.get('choke', 0))
    if paper:
        colour, alpha = paper_edge(colour, alpha, margin_px, seed)
    rgba = trim(np.dstack([colour, alpha]))
    # Brushed metal is costly to encode; the iPod takes a lower quality (its screen is
    # covered by the chapter's own HTML anyway).
    return save(rgba, name, recipe['widths'], recipe.get('quality', 84))


def main(names):
    OUT.mkdir(parents=True, exist_ok=True)
    for seed, (name, recipe) in enumerate(RECIPES.items()):
        if names and name not in names:
            continue
        for path, width, height, size in extract(name, recipe, seed):
            print(f'  {path}  {width}×{height}  {size / 1024:.1f} kB')


if __name__ == '__main__':
    main(set(sys.argv[1:]))
