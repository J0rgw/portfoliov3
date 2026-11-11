"""Jorge's blue marker arrow with real transparency: public/images/gallery/marker-arrow.webp.

The source (private/originals/gallery/cd7e159e….jpg, 450×300) is a JPEG with the
"transparent" checkerboard painted into it: 15 px squares, white (255) and light grey
(~245). Nothing is redrawn: every pixel of the stroke is the original's.

For each pixel the checkerboard colour behind it is known, so the ink is recovered by
colour-to-alpha against that colour: alpha is the smallest opacity that explains the
pixel, the colour is un-mixed from the grey. Marker ink is translucent, so the stroke
keeps its translucency, the darker overlaps where it crosses itself and its ragged,
anti-aliased edges. Ink only darkens and is blue: what is lighter than the squares (JPEG
ringing, a white fringe) or grey (noise in the squares) is backdrop, not stroke.

CROP leaves a small margin round the stroke. MarkerArrow.tsx declares the result's size
(370×236): change both together.

Not part of the build (Python 3 with Pillow and NumPy):
    python3 scripts/extract-marker-arrow.py
"""
import numpy as np
from PIL import Image

SRC = 'private/originals/gallery/cd7e159e71e5f37d1b0dc37067c65d32.jpg'
OUT = 'public/images/gallery/marker-arrow.webp'
SQUARE = 15                 # checkerboard square, px
LIGHT, GREY = 255.0, 245.0  # its two levels
NOISE = 0.03                # alpha below this is JPEG noise in the squares
BLUE = (0.02, 0.07)         # blueness (B - R) / 255 from backdrop to ink
CROP = (40, 30, 410, 266)   # left, top, right, bottom: the stroke plus a margin

rgb = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float64)
h, w, _ = rgb.shape
ys, xs = np.mgrid[0:h, 0:w]
grey = ((xs // SQUARE + ys // SQUARE) % 2) == 1
bg = np.where(grey, GREY, LIGHT)[..., None].repeat(3, axis=2)

# Per channel, how far the pixel is from the backdrop towards black.
alpha = np.clip(np.where(rgb < bg, (bg - rgb) / bg, 0.0).max(axis=2), 0.0, 1.0)

# Un-mix the colour with the pixel's own alpha, then floor the noise.
safe = np.maximum(alpha, 1e-6)[..., None]
ink = np.clip(bg + (rgb - bg) / safe, 0, 255)
blueness = (rgb[..., 2] - rgb[..., 0]) / 255.0
gate = np.clip((blueness - BLUE[0]) / (BLUE[1] - BLUE[0]), 0.0, 1.0)
gate = gate * gate * (3 - 2 * gate)
alpha = np.clip((alpha - NOISE) / (1 - NOISE), 0.0, 1.0) * gate

rgba = np.dstack([ink, alpha * 255]).round().astype(np.uint8)
rgba[alpha == 0] = 0
img = Image.fromarray(rgba).crop(CROP)
# Lossy colour and alpha: 27 kB instead of 45 kB lossless, the source is a JPEG anyway.
img.save(OUT, 'WEBP', quality=88, alpha_quality=90, method=6)
print(OUT, img.size)
