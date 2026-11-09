"""Province photos -> web files.
Usage: python build-provinces.py <folder of <slug>.jpg originals> <project>/assets/prov
Writes <slug>.webp (short side 1200px, story panels) and <slug>-sm.webp (640px, map fills)."""
import sys, glob, os
from PIL import Image, ImageOps
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for f in sorted(glob.glob(f"{src}/*.jpg")):
    slug = os.path.basename(f)[:-4]
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    # story panels are portrait, so size by the short side (1200px) to keep the crop sharp
    k = min(1, 1200 / min(im.size))
    big = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    big.save(f"{out}/{slug}.webp", "WEBP", quality=68, method=6)
    sm = im.copy(); sm.thumbnail((640, 640), Image.LANCZOS)
    sm.save(f"{out}/{slug}-sm.webp", "WEBP", quality=70, method=6)
    print(slug, big.size, os.path.getsize(f"{out}/{slug}.webp") // 1024, "KB")
