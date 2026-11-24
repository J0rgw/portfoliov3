# /// script
# requires-python = ">=3.9"
# dependencies = ["numpy", "pillow", "pillow-heif", "opencv-python-headless"]
# ///
"""Sources for /sobre-mi/ (ADR-004, 2026-11-19) from Jorge's photos in private/originals/me/
(supplied 2026-11-19; git-ignored, never served: the photos carry the places they were
taken). Writes private/originals/me/lifted/, which scripts/extract-cutouts.py reads; the
rest of the page's cut-outs are Jorge's own (IMG_75xx, lifted on his phone).

- cheque: the Santander X Award's cheque, cropped out of the group photo first (the two
  other people never leave this script), then lifted.
- godzilla: the head over Shinjuku, lifted alone (the cinema sign under it is another
  subject and is left out).
- gundam: the Gundam over the Ciudad de las Artes y las Ciencias (Valencia, 2026-09-05), its
  head lifted against the sky (IMG_6420, 2026-11-19: Jorge's own photos replaced the Unicorn).
- peppers: the bucket. Vision lifts it with the white plastic chair it stands on: the
  chair's bright, unsaturated pixels (and its arm in shade, at the left) are dropped, the
  largest blob kept and its small holes (highlights on the peppers) filled.
- vds, gordale, gundam-valencia: photos printed whole (the VDS hall, the cover's rock, the
  Gundam with the building behind it, IMG_6418), orientation applied, 1800 px at most.

Lifting needs macOS 14+ (scripts/lift-subject.swift, Apple's Vision). Not part of the build:
    uv run scripts/prepare-about-art.py
    uv run scripts/extract-cutouts.py cheque badge vds godzilla gundam gundam-valencia peppers gordale
"""
import subprocess
import tempfile
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'private/originals/me'
OUT = SRC / 'lifted'
LIFT = ROOT / 'scripts/lift-subject.swift'


def lift(source: Path, out: Path, pick: str = 'all'):
    subprocess.run(['swift', str(LIFT), str(source), str(out), pick], check=True)


def trim(path: Path):
    image = Image.open(path).convert('RGBA')
    alpha = np.asarray(image)[..., 3]
    ys, xs = np.where(alpha > 4)
    box = (max(xs.min() - 2, 0), max(ys.min() - 2, 0), min(xs.max() + 3, image.width), min(ys.max() + 3, image.height))
    image.crop(box).save(path)
    print(f'  {path.name}  trimmed to {box[2] - box[0]}×{box[3] - box[1]}')


def without_chair(path: Path):
    rgba = np.asarray(Image.open(path).convert('RGBA')).astype(np.float64) / 255
    rgb, alpha = rgba[..., :3], rgba[..., 3]
    high, low = rgb.max(2), rgb.min(2)
    saturation = (high - low) / np.maximum(high, 1e-6)
    chair = (low > 0.55) & (saturation < 0.14) & (alpha > 0.5)
    h, w = low.shape
    left = np.arange(w)[None, :].repeat(h, 0) < w * 0.16
    chair |= left & (low > 0.3) & (saturation < 0.3) & (alpha > 0.5)
    keep = cv2.morphologyEx(((alpha > 0.5) & ~chair).astype(np.uint8), cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    _, labels, stats, _ = cv2.connectedComponentsWithStats(keep, connectivity=8)
    blob = (labels == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
    holes = (1 - blob).astype(np.uint8)
    count, hole_labels, hole_stats, _ = cv2.connectedComponentsWithStats(holes, connectivity=4)
    for i in range(1, count):
        x, y, bw, bh, area = hole_stats[i]
        on_edge = x == 0 or y == 0 or x + bw == w or y + bh == h
        if not on_edge and area < blob.sum() * 0.02:
            blob[hole_labels == i] = 1
    soft = cv2.GaussianBlur(blob.astype(np.float32), (0, 0), 1.2)
    alpha = np.minimum(alpha, np.clip(soft * 1.4 - 0.2, 0, 1))
    Image.fromarray((np.dstack([rgb, alpha]) * 255).round().astype(np.uint8), 'RGBA').save(path)


def photo(name: str, out: str):
    image = ImageOps.exif_transpose(Image.open(SRC / name)).convert('RGB')
    image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
    # A fresh image: none of the original's metadata (its GPS position) comes along.
    Image.fromarray(np.asarray(image)).save(OUT / out)
    print(f'  {out}  {image.width}×{image.height}')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        group = ImageOps.exif_transpose(Image.open(SRC / '00F0619E-2C1C-479E-BF98-E2A990F559ED.JPG')).convert('RGB')
        w, h = group.size
        crop = Path(tmp) / 'cheque.png'
        group.crop((int(0.383 * w), int(0.352 * h), int(0.625 * w), int(0.655 * h))).save(crop)
        lift(crop, OUT / 'cheque.png')
    lift(SRC / '1000067722.JPG', OUT / 'godzilla.png', '0.45,0.6')
    lift(SRC / 'IMG_6420.HEIC', OUT / 'gundam.png')
    lift(SRC / 'IMG_6057.HEIC', OUT / 'peppers.png')
    without_chair(OUT / 'peppers.png')
    for name in ('cheque', 'godzilla', 'gundam', 'peppers'):
        trim(OUT / f'{name}.png')
    photo('IMG_7453.HEIC', 'vds.png')
    photo('IMG_6984.HEIC', 'gordale.png')
    photo('IMG_6418.HEIC', 'gundam-valencia.png')


if __name__ == '__main__':
    main()
