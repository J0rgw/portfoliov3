# /// script
# requires-python = ">=3.9"
# dependencies = ["fonttools", "brotli"]
# ///
"""ATLAXIA's printed disc and sleeve (2026-11-25): the hero disc reprinted for ATLAXIA.

Jorge's brief: "use the atlaxia logo and name to modify the burned cd and make the cd black
and the logo white". The hero's printed CD (private/originals/hero/cdJorge_1200px.png) keeps
its layout: the name in the upper left, a short rule and two lines of small print under it,
the volume between two rules in the lower left, a halftone along the left rim, and the mark,
very large, running behind the hub. Here the field is the print black, the name is ATLAXIA's
wordmark and the mark is its symbol, both in the print white, and the small print is set in
Poppins (the site's face, as on the hero disc), turned into outlines so the files need no font.

Sources (private/originals/atlaxia/, git-ignored): ATLAXIA's brand SVGs, copied unchanged from
J0rgw/AtlaxiaBussinessWeb, src/assets/brand/svg. Inks: the print tokens in
src/design/tokens.css (--print-dark, --print-light, --print-shade), which stay put in both
themes. Drawn on CoverArt's 400 x 400 grid: on a disc the hub covers r < 39 and the rim r > 193.

Output (public/images/projects/atlaxia/): disc.svg (the label, cut by Disc's mask) and
sleeve.svg (the square cover). Generated graphics: rerun this script after changing them.

Not part of the build (needs uv, https://docs.astral.sh/uv/):
    uv run scripts/generate-atlaxia-print.py
"""
import re
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'private/originals/atlaxia'
OUT = ROOT / 'public/images/projects/atlaxia'
FONT = ROOT / 'public/fonts/poppins-regular-latin.woff2'
TOKENS = ROOT / 'src/design/tokens.css'

# The print's words. The small print is ATLAXIA's own headline (atlaxia.es, h1); the volume
# is the web's second version, the one Jorge's case study is about (2026).
LINES = ('TECNOLOGÍA PARA ENTENDER', 'SISTEMAS INDUSTRIALES')
VOLUME = ('VOL. 02 /', '2026')

# ---- Layout, in grid units -----------------------------------------------------------
# Disc: the hero disc's columns, measured on its 1200 px print and divided by three.
DISC = dict(
    left=50,              # the text column's left edge
    name_top=98,          # the wordmark's cap line
    name_width=152,       # the wordmark's width
    small=8.6,            # small print size (em)
    tracking=0.02,        # small print letter spacing (em)
    vol_top=246,          # the volume block's first rule
    mark_apex=(292, 38),  # where the symbol's apex lands
    mark_width=328,       # the symbol's width (it runs off the right rim, as the hero's mark does)
)
SLEEVE = dict(
    left=30,
    name_top=36,
    name_width=210,
    small=9.6,
    tracking=0.02,
    vol_top=324,
    mark_apex=(262, 146),  # the whole symbol shows on the sleeve, its base just above the edge
    mark_width=286,
)


def tokens():
    css = TOKENS.read_text()
    palette = dict(re.findall(r'--(palette-[\w-]+):\s*(#[0-9a-fA-F]{3,8})', css))

    def ink(name):
        ref = re.search(rf'--{name}:\s*var\(--([\w-]+)\)', css).group(1)
        return palette[ref]

    return ink('print-dark'), ink('print-light'), ink('print-shade')


def brand_paths(name):
    """The `d` of every path in one of ATLAXIA's SVGs, as polygons, and its viewBox."""
    svg = (SRC / f'{name}.svg').read_text()
    box = [float(v) for v in re.search(r'viewBox="([^"]+)"', svg).group(1).split()]
    polygons = []
    for d in re.findall(r'\sd="([^"]+)"', svg):
        numbers = [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', d)]
        polygons.append(list(zip(numbers[0::2], numbers[1::2])))
    return box, polygons


def bounds(polygons):
    xs = [x for poly in polygons for x, _ in poly]
    ys = [y for poly in polygons for _, y in poly]
    return min(xs), min(ys), max(xs), max(ys)


def place(polygons, scale, dx, dy):
    """Polygons scaled and moved onto the grid, as one path."""
    out = []
    for poly in polygons:
        pts = ' '.join(f'{x * scale + dx:.2f} {y * scale + dy:.2f}' for x, y in poly)
        out.append(f'M {pts} Z')
    return ' '.join(out)


class Type:
    """Poppins outlines: a line of text as one path."""

    def __init__(self, path):
        self.font = TTFont(path)
        self.glyphs = self.font.getGlyphSet()
        self.cmap = self.font.getBestCmap()
        self.upm = self.font['head'].unitsPerEm
        self.cap = self.font['OS/2'].sCapHeight / self.upm

    def line(self, text, x, baseline, size, tracking=0.0):
        pen = SVGPathPen(self.glyphs, ntos=lambda n: f'{n:.1f}'.rstrip('0').rstrip('.'))
        scale = size / self.upm
        cursor = x
        for char in text:
            name = self.cmap[ord(char)]
            glyph = self.glyphs[name]
            glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, cursor, baseline)))
            cursor += glyph.width * scale + tracking * size
        return pen.getCommands(), cursor - tracking * size - x


def rule(x, y, width=5.2, weight=1.1):
    return f'<rect x="{x:.2f}" y="{y - weight / 2:.2f}" width="{width}" height="{weight}"/>'


def halftone(shade):
    """The hero disc's halftone along the left rim: a dot screen that fades inwards and
    towards the top and the bottom, in the print's shade (a lighter black)."""
    return f'''
  <defs>
    <pattern id="dots" width="4.2" height="4.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45 200 200)">
      <circle cx="2.1" cy="2.1" r="1.25" fill="{shade}"/>
    </pattern>
    <radialGradient id="rim" cx="200" cy="200" r="193" gradientUnits="userSpaceOnUse">
      <stop offset="0.62" stop-color="#000"/>
      <stop offset="0.97" stop-color="#fff"/>
    </radialGradient>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.08" stop-color="#fff"/>
      <stop offset="0.42" stop-color="#000"/>
    </linearGradient>
    <mask id="rim-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">
      <rect width="400" height="400" fill="url(#rim)"/>
    </mask>
    <mask id="side-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">
      <rect width="400" height="400" fill="url(#side)"/>
    </mask>
  </defs>
  <g mask="url(#side-mask)"><rect width="400" height="400" fill="url(#dots)" mask="url(#rim-mask)"/></g>'''


def print_svg(layout, type_, dark, light, shade, disc):
    _, words = brand_paths('atlaxia-wordmark')
    _, symbol = brand_paths('atlaxia-symbol')

    # Wordmark, cropped to its letters (as ATLAXIA's own AtlaxiaWordmark does).
    wx0, wy0, wx1, wy1 = bounds(words)
    ws = layout['name_width'] / (wx1 - wx0)
    name = place(words, ws, layout['left'] - wx0 * ws, layout['name_top'] - wy0 * ws)
    name_bottom = layout['name_top'] + (wy1 - wy0) * ws

    # Symbol: its apex (the topmost point) lands on `mark_apex`.
    sx0, sy0, sx1, sy1 = bounds(symbol)
    apex = min((p for poly in symbol for p in poly), key=lambda p: p[1])
    ss = layout['mark_width'] / (sx1 - sx0)
    ax, ay = layout['mark_apex']
    mark = place(symbol, ss, ax - apex[0] * ss, ay - apex[1] * ss)

    # Small print under the name: a rule, then the lines, as on the hero disc.
    size, tracking, left = layout['small'], layout['tracking'], layout['left']
    cap = type_.cap * size
    leading = size * 1.22
    rule_y = name_bottom + size * 1.05
    small = [rule(left, rule_y)]
    baseline = rule_y + size * 0.55 + cap
    widths = []
    for text in LINES:
        d, width = type_.line(text, left, baseline, size, tracking)
        small.append(f'<path d="{d}"/>')
        widths.append(width)
        baseline += leading

    # The volume between two rules, lower left.
    vol = [rule(left, layout['vol_top'])]
    baseline = layout['vol_top'] + size * 0.55 + cap
    for text in VOLUME:
        d, _ = type_.line(text, left, baseline, size, tracking)
        vol.append(f'<path d="{d}"/>')
        baseline += leading
    vol.append(rule(left, baseline - leading + size * 0.62))

    title = 'ATLAXIA, disco' if disc else 'ATLAXIA, carátula'
    body = '\n  '.join([
        f'<rect width="400" height="400" fill="{dark}"/>',
        halftone(shade).strip() if disc else '',
        f'<g fill="{light}">',
        f'  <path d="{mark}"/>',
        f'  <path d="{name}"/>',
        *[f'  {item}' for item in small + vol],
        '</g>',
    ])
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">\n'
        f'  <title>{title}</title>\n'
        f'  <!-- Generated by scripts/generate-atlaxia-print.py: edit the script, then rerun it. -->\n'
        f'  {body}\n'
        '</svg>\n'
    )
    return svg, dict(name_bottom=round(name_bottom, 1), line_widths=[round(w, 1) for w in widths])


def main():
    dark, light, shade = tokens()
    type_ = Type(FONT)
    OUT.mkdir(parents=True, exist_ok=True)
    for file, layout, disc in (('disc.svg', DISC, True), ('sleeve.svg', SLEEVE, False)):
        svg, info = print_svg(layout, type_, dark, light, shade, disc)
        path = OUT / file
        path.write_text(svg)
        print(f'  {path.relative_to(ROOT)}  {len(svg.encode()) / 1024:.1f} kB  {info}')


if __name__ == '__main__':
    main()
