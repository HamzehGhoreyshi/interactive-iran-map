# Interactive Iran Map

An interactive map of Iran's 31 provinces. Hover a province to see a photo of it inside its border; click to open a card with its capital, population, area, a short description and a three-photo slideshow.

English by default; Persian at `?lang=fa` (right-to-left, Persian digits). The flag button in the top corner switches between them.

## Files
| File | What it holds |
|---|---|
| `index.html` | Page structure and the inline map SVG (generated, between `<!-- MAP-*:START/END -->` markers) |
| `style.css` | All styles: tokens, map, cards, slideshow, language switch, mobile layout |
| `i18n.js` | Language: picks `en`/`fa` from the URL, UI strings, and the English texts (descriptions, captions, labels) |
| `script.js` | Data (provinces, photos, colours, population/area) and behaviour (map, list, stories, slideshow) |
| `assets/prov/` | Province photos as WebP: `<slug>.webp` (story), `<slug>-sm.webp` (map fill), `<slug>-2/-3.webp` (slideshow) |
| `vercel.json` | Cache headers for hosting |

No framework and no build step to run it. Scripts load with `defer`, photos load only around the open story, and the small map photo loads first.

## Run locally
```bash
node tools/serve.cjs 5173
```
Then open http://localhost:5173 (canvas and images need a server, not `file://`).

## Rebuild the map
`tools/build-map.cjs` projects Natural Earth + geoBoundaries data (Lambert Conformal Conic), simplifies and smooths the borders (Iran's outer border a little more), and writes a separate, very simple outline (`#def-iran-icon`) for the small Iran icons.
```bash
NODE_PATH=<node_modules> node tools/build-map.cjs <folder with geojson>
```
Province photos are converted with `tools/build-provinces.py`.

## Content and licences
- Province texts are short factual introductions. Population (2023 estimate) and area: Wikipedia, "Provinces of Iran".
- Photos: Unsplash (Unsplash License) and Wikimedia Commons (CC BY / CC BY-SA), each one checked to be taken in its province; credited on every card and in the credits dialog.
- Map data: Natural Earth (public domain), geoBoundaries / OpenStreetMap (ODbL).
- Fonts: Ravi (Fontiran, Persian) and Proxima Nova (English) are commercial fonts, so the font files are **not** in this repo. The live site serves them from the deployment only. To run locally with them, put the licensed webfonts in `assets/fonts/` (`Ravi-<Weight>.woff2`, `ProximaNova-<Weight>.woff2`); without them the page falls back to Vazirmatn / Tahoma (Persian) and Helvetica Neue / Arial (English).
