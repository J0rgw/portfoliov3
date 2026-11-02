"""Clear plastic film over the hero cover: public/images/hero/film-{1024,640}.webp.

White crests and dark troughs with alpha, drawn at 2048 px and downsampled: the film's
wavy outer edge with two folded corner ears, a bright rim and an inner refraction line,
the paper edge seen through the film, a heat-seal seam along the top, long tapered
streaks, wrinkles at the corners, and pressure creases fanning out from under the thumb.
The lamp's broad sheen is a CSS gradient (Hero.css .hero__case::after), because a
smooth ramp in lossy WebP alpha bands into contours.

Coordinates are fractions of the sleeve box. GRIP and PAD must match Hero.css: --grip
is where the hand holds the right edge, PAD is under the thumb at that grip.

Not part of the build (Python 3 with Pillow and NumPy):
    python3 scripts/generate-hero-film.py [out-dir]   # default public/images/hero
Seeded, so the output is the same on every run. Recipe: docs/ART_DIRECTION.md §7.
"""
import math
import random
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = sys.argv[1] if len(sys.argv) > 1 else 'public/images/hero'
SS = 2048            # supersampled canvas
MARGIN = 0.022       # film around the print (Hero.css .hero__cover inset: 2.2%)
GRIP = 0.62          # Hero.css --grip
PAD = (0.70, 0.555)  # thumb pad at that grip
rng = random.Random(7)


def px(v):
    return v * SS


light = Image.new('F', (SS, SS), 0.0)  # alpha of white
dark = Image.new('F', (SS, SS), 0.0)   # alpha of black


def layer():
    return Image.new('L', (SS, SS), 0)


def add(target, img, alpha, blur=0.0):
    """Screen-style accumulation, so overlaps never exceed 1."""
    if blur:
        img = img.filter(ImageFilter.GaussianBlur(blur))
    arr = np.asarray(img, dtype=np.float32) / 255.0 * alpha
    t = np.asarray(target, dtype=np.float32)
    return Image.fromarray(1 - (1 - t) * (1 - arr))


def noise1d(n, scale, amp, seed):
    r = np.random.default_rng(seed)
    k = r.normal(size=n // scale + 3)
    xs = np.linspace(0, len(k) - 3, n)
    i = xs.astype(int)
    f = xs - i
    f = f * f * (3 - 2 * f)
    return (k[i] * (1 - f) + k[i + 1] * f) * amp


# ---- the film's outline: a slightly wavy rectangle with two folded ears ----
N = 400
edge_noise = [noise1d(N, 40, 0.0011, s) for s in range(4)]
inset = 0.004
pts = []
for i in range(N):  # top, left to right
    t = i / N
    pts.append((inset + t * (1 - 2 * inset), inset + edge_noise[0][i]))
for i in range(N):  # right, top to bottom
    t = i / N
    pts.append((1 - inset + edge_noise[1][i], inset + t * (1 - 2 * inset)))
for i in range(N):  # bottom, right to left
    t = i / N
    pts.append((1 - inset - t * (1 - 2 * inset), 1 - inset + edge_noise[2][i]))
for i in range(N):  # left, bottom to top
    t = i / N
    pts.append((inset + edge_noise[3][i], 1 - inset - t * (1 - 2 * inset)))
poly = [(px(x), px(y)) for x, y in pts]

ears = [
    [(1 - inset, 0.02), (1.0, 0.0), (0.975, inset)],  # top right
    [(inset, 0.985), (0.0, 1.0), (0.03, 1 - inset)],  # bottom left
]

body = layer()
d = ImageDraw.Draw(body)
d.polygon(poly, fill=255)
for e in ears:
    d.polygon([(px(x), px(y)) for x, y in e], fill=255)
body_arr = np.asarray(body, dtype=np.float32) / 255.0

# two layers of film in the margin, a faint veil over the print
yy, xx = np.mgrid[0:SS, 0:SS].astype(np.float32) / SS
in_print = (xx > MARGIN) & (xx < 1 - MARGIN) & (yy > MARGIN) & (yy < 1 - MARGIN)
light = Image.fromarray(np.asarray(light) + np.where(in_print, 0.035, 0.20) * body_arr)
dark = Image.fromarray(np.asarray(dark) + np.where(in_print, 0.0, 0.05) * body_arr)

# ---- edges: a bright rim, a dark refraction line just inside ----
rim = layer()
ImageDraw.Draw(rim).line(poly + [poly[0]], fill=255, width=5)
light = add(light, rim, 0.85, blur=1.2)
rim_in = layer()
ImageDraw.Draw(rim_in).line(poly + [poly[0]], fill=255, width=3)
rim_in = Image.fromarray(np.roll(np.roll(np.asarray(rim_in), 6, axis=0), 6, axis=1))
dark = add(dark, rim_in, 0.20, blur=2.5)

# the paper's edge through the film: a light line, a darker one outside it
m0, m1 = px(MARGIN), px(1 - MARGIN)
pe = layer()
ImageDraw.Draw(pe).rectangle([m0, m0, m1, m1], outline=255, width=3)
light = add(light, pe, 0.30, blur=1.0)
pd = layer()
ImageDraw.Draw(pd).rectangle([m0 - 5, m0 - 5, m1 + 5, m1 + 5], outline=255, width=4)
dark = add(dark, pd, 0.16, blur=2.0)

# ---- heat-seal seam along the top margin, with crimp marks ----
seam = layer()
sd = ImageDraw.Draw(seam)
sy = px(0.0125)
prev = None
for i in range(0, SS, 4):
    y = sy + math.sin(i / 37.0) * 2.2
    if prev:
        sd.line([prev, (i, y)], fill=255, width=3)
    prev = (i, y)
    if i % 22 == 0:
        sd.line([(i, y - 7), (i + 3, y + 7)], fill=170, width=2)
light = add(light, seam, 0.45, blur=0.9)


# ---- strokes: tapered highlights with an optional glow and a dark companion ----
def stroke(points, width, alpha_l, alpha_d=0.0, offset=(0, 4), blur=1.0, glow=0.0):
    global light, dark
    L = layer()
    D = ImageDraw.Draw(L)
    n = len(points)
    for i in range(n - 1):
        t = i / (n - 1)
        w = max(1, int(width * math.sin(math.pi * t) ** 0.7))
        a = int(255 * (0.35 + 0.65 * math.sin(math.pi * t)))
        D.line([points[i], points[i + 1]], fill=a, width=w)
    light = add(light, L, alpha_l, blur=blur)
    if glow:
        G = layer()
        GD = ImageDraw.Draw(G)
        for i in range(n - 1):
            t = i / (n - 1)
            w = max(2, int(width * glow * math.sin(math.pi * t) ** 0.7))
            GD.line([points[i], points[i + 1]], fill=int(255 * math.sin(math.pi * t)), width=w)
        light = add(light, G, alpha_l * 0.32, blur=width * glow * 0.45)
    if alpha_d:
        Ld = Image.fromarray(np.roll(np.roll(np.asarray(L), offset[1], axis=0), offset[0], axis=1))
        dark = add(dark, Ld, alpha_d, blur=blur * 2)


def curve(x0, y0, length, angle, bend, steps=60):
    a = math.radians(angle)
    return [
        (px(x0 + math.cos(a) * length * t), px(y0 + math.sin(a) * length * t + bend * math.sin(math.pi * t)))
        for t in (i / steps for i in range(steps + 1))
    ]


# long streaks, mostly horizontal: x0, y0, length, angle, bend, width (px at 2048), alpha
streaks = [
    (0.06, 0.075, 0.42, -3, -0.006, 7, 0.55),
    (0.30, 0.105, 0.55, 2, 0.008, 4, 0.35),
    (0.62, 0.060, 0.30, -6, 0.004, 5, 0.45),
    (0.10, 0.300, 0.22, 4, 0.005, 3, 0.22),
    (0.04, 0.455, 0.20, -2, -0.004, 4, 0.30),
    (0.80, 0.270, 0.17, 8, 0.006, 3, 0.30),
    (0.08, 0.820, 0.30, -4, 0.006, 5, 0.32),
    (0.40, 0.905, 0.50, 2, -0.007, 6, 0.42),
    (0.05, 0.950, 0.26, 1, 0.003, 3, 0.30),
    (0.70, 0.790, 0.25, -5, 0.004, 3, 0.22),
]
for x0, y0, ln, ang, bend, w, a in streaks:
    stroke(curve(x0, y0, ln, ang, bend), w * 1.5, min(a * 1.45, 0.85), alpha_d=a * 0.3, offset=(0, 7), blur=1.2, glow=3.5)

# fine scuffs near the bottom right
for i in range(9):
    x0 = 0.60 + rng.random() * 0.30
    y0 = 0.86 + rng.random() * 0.10
    stroke(curve(x0, y0, 0.04 + rng.random() * 0.05, -35 + rng.random() * 10, 0.0, 10), 2, 0.22, blur=0.6)


# ---- wrinkles: a broad crest with its trough, and a fine glint on the crest ----
def crease(x0, y0, length, angle, bend, crest=0.5, trough=0.22, width=4):
    pts_ = curve(x0, y0, length, angle, bend, 30)
    a = math.radians(angle + 90)
    off = (int(round(math.cos(a) * 9)), int(round(math.sin(a) * 9)))
    stroke(pts_, width * 2.8, crest * 0.75, alpha_d=trough * 1.3, offset=off, blur=3.2)
    stroke(pts_, max(2, width // 2), crest, blur=0.7)


corners = [((0.0, 0.0), 45), ((1.0, 0.0), 135), ((1.0, 1.0), 225), ((0.0, 1.0), 315)]
for (cx, cy), base in corners:
    for k in range(rng.randint(4, 6)):
        ang = base + rng.uniform(-28, 28)
        start = rng.uniform(0.004, 0.02)
        crease(cx + math.cos(math.radians(ang)) * start, cy + math.sin(math.radians(ang)) * start,
               rng.uniform(0.03, 0.085), ang, rng.uniform(-0.006, 0.006),
               crest=rng.uniform(0.35, 0.6), trough=rng.uniform(0.15, 0.25), width=rng.choice([3, 4, 5]))

# pressure creases from under the thumb pad (left, up and down) and from the held edge
for k in range(9):
    ang = rng.uniform(100, 260)
    start = rng.uniform(0.02, 0.05)
    crease(PAD[0] + math.cos(math.radians(ang)) * start, PAD[1] + math.sin(math.radians(ang)) * start,
           rng.uniform(0.07, 0.15), ang, rng.uniform(-0.01, 0.01),
           crest=rng.uniform(0.35, 0.55), trough=rng.uniform(0.16, 0.24), width=rng.choice([3, 4]))
for k in range(5):
    ang = rng.uniform(150, 210)
    crease(0.995, GRIP + rng.uniform(-0.09, 0.12), rng.uniform(0.04, 0.08), ang, rng.uniform(-0.005, 0.005),
           crest=0.45, trough=0.2, width=3)

# ---- compose white over black, clipped to the film ----
L = np.clip(np.asarray(light), 0, 1) * body_arr
K = np.clip(np.asarray(dark), 0, 1) * body_arr
A = L + K * (1 - L)
C = np.where(A > 1e-4, L / np.maximum(A, 1e-4), 0)
rgb = (np.clip(C, 0, 1) * 255).astype(np.uint8)
im = Image.fromarray(np.dstack([rgb, rgb, rgb, (np.clip(A, 0, 1) * 255).astype(np.uint8)]))
for size in (1024, 640):
    # alpha_quality below ~70 posterises the faint veil; the sheen is not in here for that reason
    im.resize((size, size), Image.LANCZOS).save(f'{OUT}/film-{size}.webp', 'WEBP', quality=72, alpha_quality=70, method=6)
print(f'film-1024.webp, film-640.webp -> {OUT}')
