# AGENTS.md — interactive-iran-map

## First
This project belongs to Hamzeh's AI OS.
Read `~/Desktop/AI/ai-os/AGENTS.md` and follow its session routine.
If you cannot reach that path, ask Hamzeh to also connect the `ai-os` folder.
Project summary lives in: `~/Desktop/AI/ai-os/10_context/projects/interactive-iran-map.md`

## This project
- What it is: Experiment — interactive editorial map of Iran's 31 provinces (hover = province photo inside its border, click = province story card). Persian by default, English at `?lang=en`.
- Tech stack: `index.html` (structure + generated inline map SVG) · `style.css` · `i18n.js` (en/fa strings) · `script.js` (data + behaviour). Vanilla, no framework, no build step to run.
- How to run it: `node tools/serve.cjs 5173` → http://localhost:5173 (needs a server, not file://).
- How to deploy it: static hosting; `vercel.json` sets cache headers. GitHub repo planned: HamzehGhoreyshi/interactive-iran-map (footer already links there).
- Rules specific to this project:
  - Map geometry is generated: edit `tools/build-map.cjs`, never the SVG paths by hand (they sit between `<!-- MAP-*:START/END -->` markers).
  - Photos: nature and city only, no people. Every photo must be checked to be taken in its province; credit it on the card and in the credits dialog.
  - Font: Ravi (Fontiran, commercial). Do not put the font files in a public repo without a web licence.
  - Persian text: never letter-space it; RTL layout mirrored.

## Session end (in addition to the AI OS routine)
- Commit and push this project's changes to its own repo.
- Update the project page in ai-os/10_context/projects/interactive-iran-map.md directly: state, decisions, next actions.
