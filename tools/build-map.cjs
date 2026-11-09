/* Build-time map generator.
 * Reads Natural Earth (countries, lakes) + geoBoundaries (Iran ADM1),
 * projects with Lambert Conformal Conic into the 1440x810 frame,
 * simplifies topologically (shared borders stay shared), merges provinces into
 * five zones, and writes the SVG/JSON blocks into ../index.html between markers.
 * Usage: NODE_PATH=<node_modules> node build-map.cjs <geo dir>
 */
const fs = require('fs'), path = require('path');
const d3 = require('d3-geo'), { geoProject } = require('d3-geo-projection');
const topojson = require('topojson-server'), tc = require('topojson-client'), ts = require('topojson-simplify');

const GEO = process.argv[2];
const read = f => JSON.parse(fs.readFileSync(path.join(GEO, f)));
const r1 = n => Math.round(n * 10) / 10;

// ---------- zones (editorial groupings, not official divisions) ----------
const ZONES = [
  { id: 'caspian', provinces: ['Gilan', 'Mazandaran', 'Golestan'] },
  { id: 'northwest', provinces: ['East Azerbaijan', 'West Azerbaijan', 'Ardabil', 'Zanjan', 'Kurdistan', 'Kermanshah', 'Ilam', 'Hamadan', 'Lorestan'] },
  { id: 'central', provinces: ['Tehran', 'Alborz', 'Qazvin', 'Markazi', 'Qom', 'Isfahan', 'Semnan', 'Yazd'] },
  { id: 'south', provinces: ['Khuzestan', 'Bushehr', 'Fars', 'Hormozgan', 'Kohgiluyeh and Boyer-Ahmad', 'Chaharmahal and Bakhtiari'] },
  { id: 'east', provinces: ['North Khorasan', 'Razavi Khorasan', 'South Khorasan', 'Kerman', 'Sistan and Baluchestan'] },
];
const FA = {
  'Gilan': 'گیلان', 'Mazandaran': 'مازندران', 'Golestan': 'گلستان',
  'East Azerbaijan': 'آذربایجان شرقی', 'West Azerbaijan': 'آذربایجان غربی', 'Ardabil': 'اردبیل', 'Zanjan': 'زنجان',
  'Kurdistan': 'کردستان', 'Kermanshah': 'کرمانشاه', 'Ilam': 'ایلام', 'Hamadan': 'همدان', 'Lorestan': 'لرستان',
  'Tehran': 'تهران', 'Alborz': 'البرز', 'Qazvin': 'قزوین', 'Markazi': 'مرکزی', 'Qom': 'قم', 'Isfahan': 'اصفهان',
  'Semnan': 'سمنان', 'Yazd': 'یزد', 'Khuzestan': 'خوزستان', 'Bushehr': 'بوشهر', 'Fars': 'فارس', 'Hormozgan': 'هرمزگان',
  'Kohgiluyeh and Boyer-Ahmad': 'کهگیلویه و بویراحمد', 'Chaharmahal and Bakhtiari': 'چهارمحال و بختیاری',
  'North Khorasan': 'خراسان شمالی', 'Razavi Khorasan': 'خراسان رضوی', 'South Khorasan': 'خراسان جنوبی',
  'Kerman': 'کرمان', 'Sistan and Baluchestan': 'سیستان و بلوچستان',
};
ZONES.forEach(z => z.provinces = z.provinces.map(p => (p === 'Hamedan' ? 'Hamadan' : p)));
const zoneOf = {}; ZONES.forEach((z, i) => z.provinces.forEach(p => (zoneOf[p] = i)));

// ---------- data ----------
const rewind = f => { // geoBoundaries uses RFC7946 (CCW) winding; d3 expects CW on the sphere
  const g = f.geometry, rev = rings => rings.map(r => r.slice().reverse());
  if (g.type === 'Polygon') g.coordinates = rev(g.coordinates);
  else g.coordinates = g.coordinates.map(rev);
  return f;
};
const provinces = read('irn_adm1.geojson');
provinces.features.forEach(f => { if (d3.geoArea(f) > 2 * Math.PI) rewind(f); });
const names = new Set(provinces.features.map(f => f.properties.shapeName));
for (const n of names) if (zoneOf[n] === undefined) throw new Error('Unzoned province ' + n);
if (names.size !== 31) throw new Error('Expected 31 provinces, got ' + names.size);

const world = read('ne_10m_admin_0_countries.geojson');
const BOX = [25, 8, 82, 52];
const near = world.features.filter(f => {
  const [[x0, y0], [x1, y1]] = d3.geoBounds(f);
  const lat = y1 > BOX[1] && y0 < BOX[3];
  // Russia crosses the antimeridian, so its bounds come back with x0 > x1: treat as [x0..180] ∪ [-180..x1]
  const lon = x0 <= x1 ? (x1 > BOX[0] && x0 < BOX[2]) : (x0 < BOX[2] || x1 > BOX[0]);
  return lat && lon;
});
const neighbours = near.filter(f => f.properties.ADM0_A3 !== 'IRN');
const lakes = read('ne_10m_lakes.geojson').features.filter(f => ['Lake Urmia', 'Lake Van', 'Lake Sevan'].includes(f.properties.name));

// ---------- projection ----------
const iranFC = { type: 'FeatureCollection', features: provinces.features };
const EXT = [[-420, -320], [1860, 1130]];   // bleed area beyond the 1440x810 frame
const projection = d3.geoConicConformal().parallels([29, 37]).rotate([-53.5, 0])
  .fitExtent([[410, 98], [988, 752]], iranFC);   // RTL layout: map sits left of the intro
projection.clipExtent(EXT);
const P = ([lon, lat]) => projection([lon, lat]).map(r1);

// ---------- topologies (planar, already projected) ----------
const projFC = fc => geoProject(fc, projection);
// Visvalingam thresholds in px² of the 1440x810 frame: Iran keeps more detail than its neighbours
function topo(objects, SIMPLIFY) {
  let t = topojson.topology(objects, 1e5);
  t = ts.presimplify(t, ts.planarTriangleArea);
  return ts.simplify(t, SIMPLIFY);
}
// Chaikin corner-cutting on every arc, endpoints fixed: borders get rounder,
// and because arcs are shared, neighbouring provinces still meet exactly.
function smooth(t, rounds = 1, outerRounds = rounds) {
  // arcs used by only one shape are Iran's outer border (coast + frontier): those get extra rounds
  const uses = new Array(t.arcs.length).fill(0);
  const walk = x => Array.isArray(x) ? x.forEach(walk) : uses[x < 0 ? ~x : x]++;
  Object.values(t.objects).forEach(o => o.geometries.forEach(g => walk(g.arcs)));
  t.arcs = t.arcs.map((arc, ai) => {
    let a = arc.map(p => [p[0], p[1]]);
    const n = uses[ai] === 1 ? outerRounds : rounds;
    for (let k = 0; k < n && a.length > 2; k++) {
      const out = [a[0]];
      for (let i = 0; i < a.length - 1; i++) {
        const [x0, y0] = a[i], [x1, y1] = a[i + 1];
        if (i > 0) out.push([x0 * .75 + x1 * .25, y0 * .75 + y1 * .25]);
        if (i < a.length - 2) out.push([x0 * .25 + x1 * .75, y0 * .25 + y1 * .75]);
      }
      out.push(a[a.length - 1]);
      a = out;
    }
    return a;
  });
  return t;
}
const pathGen = d3.geoPath().digits(1);
const onEdge = ([x, y]) => Math.abs(x - EXT[0][0]) < .5 || Math.abs(x - EXT[1][0]) < .5 || Math.abs(y - EXT[0][1]) < .5 || Math.abs(y - EXT[1][1]) < .5;
function dropEdges(mls) { // remove artificial clip-extent segments from a MultiLineString
  const out = [];
  for (const line of mls.coordinates) {
    let run = [];
    for (let i = 0; i < line.length; i++) {
      if (i > 0 && onEdge(line[i]) && onEdge(line[i - 1])) { if (run.length > 1) out.push(run); run = [line[i]]; continue; }
      run.push(line[i]);
    }
    if (run.length > 1) out.push(run);
  }
  return { type: 'MultiLineString', coordinates: out };
}
const lineD = ls => pathGen({ type: 'LineString', coordinates: ls });
const mlsD = mls => pathGen(mls);

// Iran
// Iran: simplified a bit harder than before (was 0.9) and smoothed once, for a calmer, rounder outline
const ti = smooth(topo({ prov: projFC(iranFC) }, 3), 1, 3);
const geoms = ti.objects.prov.geometries;
const iranOutline = tc.mesh(ti, ti.objects.prov, (a, b) => a === b);
const provinceLines = tc.mesh(ti, ti.objects.prov, (a, b) => a !== b && zoneOf[a.properties.shapeName] === zoneOf[b.properties.shapeName]);
const zoneLines = tc.mesh(ti, ti.objects.prov, (a, b) => a !== b && zoneOf[a.properties.shapeName] !== zoneOf[b.properties.shapeName]);
const iranArea = tc.merge(ti, geoms);
// icon outline: one heavily simplified, rounded mainland shape for the small Iran icons (no islands)
const tIcon = smooth(topo({ prov: projFC(iranFC) }, 160), 3);
const iconArea = tc.merge(tIcon, tIcon.objects.prov.geometries);
const polyArea = rings => pathGen.area({ type: 'Polygon', coordinates: rings });
const iconMain = { type: 'Polygon', coordinates: iconArea.coordinates.slice().sort((a, b) => polyArea(b) - polyArea(a))[0] };   // largest piece = mainland
const zones = ZONES.map((z, i) => {
  const shape = tc.merge(ti, geoms.filter(g => zoneOf[g.properties.shapeName] === i));
  const [[x0, y0], [x1, y1]] = pathGen.bounds(shape);
  const [cx, cy] = pathGen.centroid(shape);
  const [lon, lat] = projection.invert([cx, cy]);
  return { id: z.id, d: pathGen(shape), bbox: [Math.floor(x0), Math.floor(y0), Math.ceil(x1) - Math.floor(x0), Math.ceil(y1) - Math.floor(y0)], centroid: [r1(cx), r1(cy)], lonlat: [+lon.toFixed(2), +lat.toFixed(2)] };
});

// Provinces: one merged shape per province name (Mazandaran comes in two pieces)
const provNames = [...new Set(geoms.map(g => g.properties.shapeName))];
const provs = provNames.map(name => {
  const shape = tc.merge(ti, geoms.filter(g => g.properties.shapeName === name));
  const [[x0, y0], [x1, y1]] = pathGen.bounds(shape);
  const [cx, cy] = pathGen.centroid(shape);
  const [lon, lat] = projection.invert([cx, cy]);
  if (!FA[name]) throw new Error('No Persian name for ' + name);
  return { name, fa: FA[name], zone: zoneOf[name], d: pathGen(shape),
    bbox: [Math.floor(x0), Math.floor(y0), Math.ceil(x1) - Math.floor(x0), Math.ceil(y1) - Math.floor(y0)],
    centroid: [r1(cx), r1(cy)], lonlat: [+lon.toFixed(2), +lat.toFixed(2)] };
});

// Neighbours
const tn = topo({ c: projFC({ type: 'FeatureCollection', features: neighbours }) }, 8);
const nLand = tc.merge(tn, tn.objects.c.geometries);
const nBorders = dropEdges(tc.mesh(tn, tn.objects.c, (a, b) => a !== b));
const nCoast = dropEdges(tc.mesh(tn, tn.objects.c, (a, b) => a === b));
const tl = topo({ l: projFC({ type: 'FeatureCollection', features: lakes }) }, 0.6);
const lakeD = pathGen(tc.merge(tl, tl.objects.l.geometries));

// ---------- points ----------
const CITIES = { caspian: ['Sari', 53.0601, 36.5633], northwest: ['Tabriz', 46.2919, 38.08], central: ['Isfahan', 51.668, 32.6546], south: ['Bushehr', 50.8203, 28.9234], east: ['Zahedan', 60.8629, 29.4963] };
zones.forEach(z => { const [name, lon, lat] = CITIES[z.id]; z.city = { name, lon, lat, xy: P([lon, lat]) }; });
const TEHRAN = P([51.389, 35.6892]);

const L = (lon, lat) => P([lon, lat]);
const labels = {
  turkey: L(41.2, 39.2), iraq: L(43.6, 32.6), armenia: L(44.95, 40.3), azerbaijan: L(48.2, 40.75),
  turkmenistan: L(59.2, 39.0), afghanistan: L(64.6, 33.2), pakistan: L(66.3, 27.6),
  caspian: L(51.0, 39.6), gulf: L(51.4, 27.15), oman: L(58.8, 24.35), hormuz: L(56.45, 26.35),
  iran: L(55.3, 33.6), zagros: L(49.6, 32.2), alborz: L(52.4, 36.15), tehran: TEHRAN,
};

// ---------- emit ----------
const curve = pts => 'M' + pts.map(p => P(p).join(',')).join('L');
const out = { zones: zones.map(({ d, ...z }) => z), provinces: provs.map(({ d, ...p }) => p), labels, zagrosD: curve([[45.6, 35.6], [47.4, 34.0], [49.3, 32.4], [51.2, 30.6], [53.2, 29.2], [55.0, 28.3]]), tehran: TEHRAN, iranBBox: pathGen.bounds(iranArea).map(p => p.map(Math.round)) };
const svgBase = [
  `<path class="m-nland" d="${pathGen(nLand)}"/>`,
  `<path class="m-lake" d="${lakeD}"/>`,
  `<defs><path id="def-iran" d="${pathGen(iranArea)}"/>`,
  `<path id="def-iran-icon" d="${pathGen(iconMain)}"/>`,
  ...zones.map((z, i) => `<path id="def-zone-${i}" d="${z.d}"/>`),
  ...provs.map((p, i) => `<path id="def-prov-${i}" d="${p.d}"/>`),
  `</defs><use href="#def-iran" class="m-iran"/>`,
].join('\n');
const split = (mls, cls) => mls.coordinates.filter(l => l.length > 1).map(l => `<path class="${cls}" pathLength="1" d="${lineD(l)}"/>`).join('\n');
const svgLines = [
  `<g class="ink ink-n">${split(nCoast, 'm-ncoast')}\n${split(nBorders, 'm-nborder')}</g>`,
  `<g class="ink ink-lake"><path class="m-lakeline" pathLength="1" d="${lakeD}"/></g>`,
  `<!-- white veil over everything outside Iran (sea, neighbours, their borders), so Iran and the UI read first -->`,
  `<mask id="mask-out-iran" maskUnits="userSpaceOnUse" x="-500" y="-400" width="2440" height="1610"><rect x="-500" y="-400" width="2440" height="1610" fill="#fff"/><use href="#def-iran" fill="#000"/></mask>`,
  `<rect class="m-veil" x="-500" y="-400" width="2440" height="1610" mask="url(#mask-out-iran)"/>`,
  `<g class="ink ink-prov">${split(provinceLines, 'm-prov')}\n${split(zoneLines, 'm-prov')}</g>`,
  `<g class="ink ink-iran">${split(iranOutline, 'm-outline')}</g>`,
].join('\n');
const clips = provs.map((p, i) => `<clipPath id="clip-prov-${i}" clipPathUnits="userSpaceOnUse"><use href="#def-prov-${i}" transform="translate(${-p.bbox[0]} ${-p.bbox[1]})"/></clipPath>`).join('\n');

const html = path.join(__dirname, '..', 'index.html');
if (process.argv[3] === '--dry') { console.log(JSON.stringify(out, null, 1)); console.log('bytes', svgBase.length, svgLines.length, 'nland', pathGen(nLand).length, 'ncoast', mlsD(nCoast).length, 'nb', mlsD(nBorders).length, 'iran', pathGen(iranArea).length, 'prov', mlsD(provinceLines).length); process.exit(); }
let src = fs.readFileSync(html, 'utf8');
const put = (name, content) => {
  const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!re.test(src)) throw new Error('marker missing ' + name);
  src = src.replace(re, `$1\n${content}\n$2`);
};
put('MAP-BASE', svgBase);
put('MAP-CLIPS', clips);
put('MAP-LINES', svgLines);
put('MAP-DATA', `<script type="application/json" id="map-data">${JSON.stringify(out)}</script>`);
fs.writeFileSync(html, src);
console.log('map injected:', (svgBase.length + svgLines.length + clips.length) / 1024 | 0, 'KB');
