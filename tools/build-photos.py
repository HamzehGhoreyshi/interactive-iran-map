"""Compose the 3x2 landscape grid used for the zone photo fills on the map.
Usage: python build-photos.py <folder with 00.jpg..10.jpg> <project assets dir>
Crops are (scale, anchor): we cut a smaller window anchored top-right to drop
agency watermarks that sit in the bottom-left corner, then cover-fit to the cell."""
import sys
from PIL import Image, ImageOps
src, out = sys.argv[1], sys.argv[2]
CELL_W, CELL_H, GUT = 1680, 1120, 12

def crop(im, scale=1.0, anchor=(1, 0)):
    w, h = im.size
    cw, ch = w * scale, h * scale
    x = (w - cw) * anchor[0]; y = (h - ch) * anchor[1]
    return im.crop((int(x), int(y), int(x + cw), int(y + ch)))

def cover(im, W, H, focus=(0.5, 0.5)):
    return ImageOps.fit(im, (W, H), Image.LANCZOS, centering=focus)

# grid order (Unsplash, verified Iran): top row Gilan rice fields, Lake Urmia, Qeshm mangroves | bottom row Hormuz, Si-o-se-pol, Shahdad kaluts
cells = [("00", 1, (.5, .5)), ("01", 1, (.5, .55)), ("02", 1, (.5, .5)),
         ("03", 1, (.5, .5)), ("04", 1, (.5, .5)), ("05", 1, (.5, .6))]
grid = Image.new("RGB", (CELL_W * 3 + GUT * 2, CELL_H * 2 + GUT), "white")
for i, (f, sc, foc) in enumerate(cells):
    im = Image.open(f"{src}/{f}.jpg").convert("RGB")
    im = cover(crop(im, sc), CELL_W, CELL_H, foc)
    grid.paste(im, ((i % 3) * (CELL_W + GUT), (i // 3) * (CELL_H + GUT)))
grid.save(f"{out}/grid.jpg", quality=80, optimize=True, progressive=True)

print("ok")

# ---- web-optimised versions (WebP), what the page actually loads ----
# grid.webp: full size for large / high-DPI screens; grid-sm.webp: half size for phones.
# The .jpg files stay as a fallback for browsers without WebP.
g = Image.open(f"{out}/grid.jpg")
g.save(f"{out}/grid.webp", "WEBP", quality=72, method=6)
g.resize((g.width // 2, g.height // 2), Image.LANCZOS).save(f"{out}/grid-sm.webp", "WEBP", quality=74, method=6)
print("webp ok")
