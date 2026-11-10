/* =====================================================================
   LANGUAGE — Persian by default, English with ?lang=en
   Everything the visitor reads comes from here; script.js asks T(...) or the EN tables.
   ===================================================================== */
const LANG = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fa';
const IS_FA = LANG === 'fa';
document.documentElement.lang = LANG;
document.documentElement.dir = IS_FA ? 'rtl' : 'ltr';

const UI = {
  fa: {
    title: 'استان‌های ایران',
    metaDesc: 'استان‌های ایران — نقشه‌ای تعاملی برای آشنایی با ۳۱ استان ایران: مرکز هر استان، جمعیت، مساحت، طبیعت و جاذبه‌های شاخص.',
    brand: 'ایران', brandSub: 'جمعیت · مساحت',
    eyebrow: 'استان‌های ایران',
    headlineLabel: 'سی‌ویک استان در سراسر ایران',
    intro: 'از جنگل‌های کرانه خزر تا کویر مرکزی و ساحل‌های خلیج فارس، هر استان ایران چهره‌ای متفاوت دارد.',
    introMore: ' یک استان را روی نقشه انتخاب کنید تا مرکز، طبیعت و جاذبه‌های شاخصش را بشناسید.',
    region: 'منطقه', tehran: 'تهران', pick: 'انتخاب استان',
    hint: 'روی استان بروید · برای معرفی کلیک کنید',
    footCount: '۳۱ استان در ۵ منطقه', credits: 'منابع عکس‌ها',
    stories: 'معرفی استان‌ها', slider: 'اسلایدر', slide: 'اسلاید',
    back: 'بازگشت به نقشه', drag: 'بکشید', close: 'بستن',
    creditsText: 'این صفحه معرفی کوتاهی از ۳۱ استان ایران است. عکس‌ها طبیعت و شهرهای هر استان را نشان می‌دهند، همگی در ایران گرفته شده‌اند و از آنسپلش (مجوز آنسپلش) و ویکی‌انبار (CC BY / CC BY-SA) آمده‌اند.',
    mapData: 'داده‌های نقشه: <bdi>Natural Earth</bdi> (مالکیت عمومی) و <bdi>geoBoundaries / OpenStreetMap</bdi> (<bdi>ODbL</bdi>). جمعیت (برآورد ۲۰۲۳) و مساحت: ویکی‌پدیا. تصویر مخروطی همدیس لامبرت.',
    mapLabel: 'نقشه ایران با ۳۱ استان در پنج منطقه',
    pop: 'جمعیت', area: 'مساحت', people: 'نفر', km2: 'کیلومتر مربع', capital: 'مرکز استان',
    million: 'میلیون', thousand: 'هزار', photo: 'عکس', photos: 'عکس‌های', prev: 'عکس قبلی', next: 'عکس بعدی', of: 'از',
    intro_prov: 'معرفی استان', province: 'استان',
    N: 'شمالی', S: 'جنوبی', E: 'شرقی', W: 'غربی',
    language: 'انتخاب زبان', langNames: { en: 'انگلیسی', fa: 'فارسی' },
  },
  en: {
    title: 'Provinces of Iran',
    metaDesc: 'Provinces of Iran — an interactive map of Iran’s 31 provinces: each capital, population, area, landscapes and landmarks.',
    brand: 'Iran', brandSub: 'Population · Area',
    eyebrow: 'Provinces of Iran',
    headlineLabel: '31 provinces across Iran',
    intro: 'From the Caspian forests to the central desert and the shores of the Persian Gulf, every province of Iran has its own face.',
    introMore: ' Pick a province on the map to meet its capital, landscapes and landmarks.',
    region: 'Region', tehran: 'Tehran', pick: 'Choose a province',
    hint: 'Hover a province · click to explore',
    footCount: '31 provinces in 5 regions', credits: 'Photo credits',
    stories: 'Province profiles', slider: 'slider', slide: 'slide',
    back: 'Back to map', drag: 'Drag', close: 'Close',
    creditsText: 'A short introduction to Iran’s 31 provinces. The photos show each province’s landscapes and cities; all were taken in Iran and come from Unsplash (Unsplash License) and Wikimedia Commons (CC BY / CC BY-SA).',
    mapData: 'Map data: <bdi>Natural Earth</bdi> (public domain) and <bdi>geoBoundaries / OpenStreetMap</bdi> (<bdi>ODbL</bdi>). Population (2023 estimate) and area: Wikipedia. Lambert conformal conic projection.',
    mapLabel: 'Map of Iran with 31 provinces in five regions',
    pop: 'Population', area: 'Area', people: '', km2: 'km²', capital: 'Capital',
    million: 'million', thousand: 'thousand', photo: 'Photo', photos: 'Photos of', prev: 'Previous photo', next: 'Next photo', of: 'of',
    intro_prov: 'open profile', province: 'Province',
    N: 'N', S: 'S', E: 'E', W: 'W',
    language: 'Choose language', langNames: { en: 'English', fa: 'Persian' },
  },
};
const T = k => UI[LANG][k];

/* English content (Persian lives next to the data in script.js) */
const EN = {
  regions: { caspian: 'Caspian coast', northwest: 'Northwest & west', central: 'Central plateau', south: 'South & Persian Gulf', east: 'East & northeast' },
  map: {
    countries: { turkey: 'Turkey', iraq: 'Iraq', armenia: 'Armenia', azerbaijan: 'Azerbaijan', turkmenistan: 'Turkmenistan', afghanistan: 'Afghanistan', pakistan: 'Pakistan' },
    caspian: 'Caspian Sea', gulf: 'Persian Gulf', oman: 'Gulf of Oman', hormuz: 'Strait of Hormuz',
    iran: 'IRAN', zagros: 'Zagros Mountains', tehran: 'Tehran',
    cities: { caspian: 'Sari', northwest: 'Tabriz', central: 'Isfahan', south: 'Bushehr', east: 'Zahedan' },
    ring: 'Explore the provinces',
  },
  capitals: {
    'Gilan': 'Rasht', 'Mazandaran': 'Sari', 'Golestan': 'Gorgan', 'East Azerbaijan': 'Tabriz', 'West Azerbaijan': 'Urmia',
    'Ardabil': 'Ardabil', 'Zanjan': 'Zanjan', 'Kurdistan': 'Sanandaj', 'Kermanshah': 'Kermanshah', 'Ilam': 'Ilam',
    'Hamadan': 'Hamadan', 'Lorestan': 'Khorramabad', 'Tehran': 'Tehran', 'Alborz': 'Karaj', 'Qazvin': 'Qazvin',
    'Markazi': 'Arak', 'Qom': 'Qom', 'Isfahan': 'Isfahan', 'Semnan': 'Semnan', 'Yazd': 'Yazd', 'Khuzestan': 'Ahvaz',
    'Bushehr': 'Bushehr', 'Fars': 'Shiraz', 'Hormozgan': 'Bandar Abbas', 'Kohgiluyeh and Boyer-Ahmad': 'Yasuj',
    'Chaharmahal and Bakhtiari': 'Shahrekord', 'North Khorasan': 'Bojnurd', 'Razavi Khorasan': 'Mashhad',
    'South Khorasan': 'Birjand', 'Kerman': 'Kerman', 'Sistan and Baluchestan': 'Zahedan',
  },
  desc: {
    'Gilan': 'The greenest province of the Caspian coast: rice paddies, misty forests and the stepped village of Masuleh. Rasht is a UNESCO Creative City of Gastronomy.',
    'Mazandaran': 'Between the Caspian Sea and the Alborz range: Hyrcanian forests, rice fields and Mount Damavand, the highest peak in Iran.',
    'Golestan': 'Where the Hyrcanian forests meet the Turkmen Sahra plains; the Gonbad-e Qabus tower and Golestan National Park are its landmarks.',
    'East Azerbaijan': 'Its capital Tabriz is one of Iran’s oldest trading cities; the Tabriz Bazaar is a World Heritage Site and the cliff village of Kandovan is famous worldwide.',
    'West Azerbaijan': 'On the western shore of Lake Urmia, bordering Turkey and Iraq; Takht-e Soleyman and the Armenian monasteries are World Heritage Sites.',
    'Ardabil': 'A mountain province on the slopes of Sabalan with the hot springs of Sarein; the Sheikh Safi al-Din shrine is a World Heritage Site.',
    'Zanjan': 'Between Tehran and Tabriz; the Dome of Soltaniyeh is one of the largest brick domes in the world, and Zanjan is known for its colourful hills and its knives.',
    'Kurdistan': 'A mountainous Zagros province with its capital at Sanandaj; the cultural landscape of Hawraman, with its terraced villages, is a UNESCO site.',
    'Kermanshah': 'Iran’s western gateway in the Zagros; the Bisotun inscription (World Heritage) and the Sasanian reliefs of Taq-e Bostan are here.',
    'Ilam': 'A border province with Iraq in the southern Zagros; its oak forests, Kabir Kuh and its gorges and caves are rarely seen.',
    'Hamadan': 'Ancient Ecbatana, capital of the Medes; the tombs of Avicenna and Baba Taher, Ali-Sadr Cave and Mount Alvand are its landmarks.',
    'Lorestan': 'A mountainous Zagros province with its capital at Khorramabad; Falak-ol-Aflak castle, Bisheh waterfall and Lake Gahar are its highlights.',
    'Tehran': 'Iran’s most populous province and its capital, on the southern slopes of the Alborz; Golestan Palace (World Heritage), Milad Tower and Tochal are its symbols.',
    'Alborz': 'A young province, split from Tehran in 2010, with its capital at Karaj; the Chalus road and mountain villages such as Shahrestanak draw visitors.',
    'Qazvin': 'The Safavid capital before Isfahan; the Alamut valley with its castles and Lake Ovan, and the caravanserais of Qazvin, are its sights.',
    'Markazi': 'With its capital at Arak, one of Iran’s industrial hubs; Farahan is the birthplace of Amir Kabir and Qa’em-Maqam Farahani.',
    'Qom': 'A pilgrimage city with the Shrine of Fatima Masumeh and its seminaries, on the edge of the central desert near the salt lake.',
    'Isfahan': 'The Safavid capital; Naqsh-e Jahan Square and the Jameh Mosque (World Heritage), Si-o-se-pol and the Zayandeh River are its masterpieces.',
    'Semnan': 'Stretching between the Alborz and the Dasht-e Kavir desert; Touran National Park is one of the last homes of the Asiatic cheetah.',
    'Yazd': 'The historic city of Yazd, with its windcatchers, qanats and mud-brick lanes, is a UNESCO site and a centre of Iran’s Zoroastrians.',
    'Khuzestan': 'Land of the Karun, Karkheh and Dez rivers; Chogha Zanbil, Susa and the Shushtar water system are its three World Heritage Sites.',
    'Bushehr': 'An old port on the Persian Gulf with a historic quarter and latticed balconies; birthplace of Rais Ali Delvari and of southern Iranian music.',
    'Fars': 'Its capital Shiraz is the city of Hafez and Saadi; Persepolis, Pasargadae and Eram Garden are World Heritage Sites.',
    'Hormozgan': 'Home to the islands of Qeshm, Kish and Hormuz in the Persian Gulf, and to Bandar Abbas, Iran’s main commercial port.',
    'Kohgiluyeh and Boyer-Ahmad': 'A mountainous Zagros province with its capital at Yasuj; oak forests, waterfalls and Mount Dena are its highlights.',
    'Chaharmahal and Bakhtiari': 'The roof of Iran, with snowy winters; the Zayandeh and Karun rivers rise in its Zardkuh mountains.',
    'North Khorasan': 'With its capital at Bojnurd on the Turkmenistan border; a province of Kurds, Turks, Turkmen and Persians, and of green mountains.',
    'Razavi Khorasan': 'With its capital at Mashhad and the Shrine of Imam Reza; the tomb of Ferdowsi at Tus and Khorasan saffron are its symbols.',
    'South Khorasan': 'With its capital at Birjand on the Afghan border; Akbarieh Garden (World Heritage), the village of Makhunik, barberries and saffron are its fame.',
    'Kerman': 'Bam Citadel, Shazdeh Garden in Mahan and the kaluts of Shahdad in the Lut Desert (World Heritage) are Kerman’s sights.',
    'Sistan and Baluchestan': 'A vast south-eastern province with the port of Chabahar on the Gulf of Oman; the Burnt City and the Martian Mountains are its sights.',
  },
  places: {
    'gilan': 'Rice paddies of Fuman', 'gilan-2': 'Green mountains of Masal', 'gilan-3': 'Municipality Square, Rasht',
    'mazandaran': 'Lake and forest of Lafur', 'mazandaran-2': 'The northern railway in the Mazandaran mountains', 'mazandaran-3': 'Fields and forest of Daryasar',
    'golestan': 'Above the clouds, Derazno', 'golestan-2': 'Forest road, Gorgan', 'golestan-3': 'Winter forest, Gorgan',
    'east-azerbaijan': 'Cliff village of Kandovan', 'east-azerbaijan-2': 'Blue Mosque, Tabriz', 'east-azerbaijan-3': 'El Goli pavilion, Tabriz',
    'west-azerbaijan': 'Kazem Dashi rock, Lake Urmia', 'west-azerbaijan-2': 'A bridge over the water, Urmia', 'west-azerbaijan-3': 'A lone tree on the shore, Urmia',
    'ardabil': 'Plains of Ardabil and Sabalan', 'ardabil-2': 'Historic domed building, Ardabil', 'ardabil-3': 'Lake Shourabil in winter',
    'zanjan': 'Colourful mountains of Zanjan', 'zanjan-2': 'Sunrise over the Zanjan hills', 'zanjan-3': 'Zanjan landscape',
    'kurdistan': 'Terraced village of Hawraman', 'kurdistan-2': 'View over Sanandaj', 'kurdistan-3': 'Sunset over the Sanandaj mountains',
    'kermanshah': 'Taq-e Bostan, Kermanshah', 'kermanshah-2': 'Reliefs of Taq-e Bostan', 'kermanshah-3': 'The village of Nowdesheh',
    'ilam': 'Zingan Cave, Ilam', 'ilam-2': 'Mountains and plains of Ilam', 'ilam-3': 'Green plains of Ilam',
    'hamadan': 'Tomb of Baba Taher, Hamadan', 'hamadan-2': 'Ali-Sadr Cave', 'hamadan-3': 'A train in the Hamadan mountains',
    'lorestan': 'Falak-ol-Aflak castle, Khorramabad', 'lorestan-2': 'Mountains of Khorramabad', 'lorestan-3': 'Makhmal Kuh National Park',
    'tehran': 'Milad Tower at night', 'tehran-2': 'Azadi Tower', 'tehran-3': 'Tehran skyline at sunset',
    'alborz': 'The village of Shahrestanak', 'alborz-2': 'Autumn in Shahrestanak', 'alborz-3': 'An old house in Shahrestanak',
    'qazvin': 'Lake Ovan, Alamut', 'qazvin-2': 'The Qazvin mountains from above', 'qazvin-3': 'Historic building, Qazvin',
    'markazi': 'Cityscape, Markazi province', 'markazi-2': 'A lone tree on the Mahallat plain', 'markazi-3': 'Jameh Mosque of Saveh',
    'qom': 'Golden domes of Qom', 'qom-2': 'Tiled ceiling of the Qom shrine', 'qom-3': 'A minaret in Qom',
    'isfahan': 'Si-o-se-pol and the Zayandeh River', 'isfahan-2': 'Khaju Bridge at night', 'isfahan-3': 'Sheikh Lotfollah dome, Naqsh-e Jahan Square',
    'semnan': 'Green valleys of Semnan', 'semnan-2': 'Rocks of Semnan', 'semnan-3': 'Tilework of Bastam',
    'yazd': 'Amir Chakhmaq Square, Yazd', 'yazd-2': 'Windcatchers of Yazd', 'yazd-3': 'Historic Yazd',
    'khuzestan': 'The Dez river, Dezful', 'khuzestan-2': 'White Bridge and the Karun, Ahvaz', 'khuzestan-3': 'Ghadir Bridge at night, Ahvaz',
    'bushehr': 'Historic quarter of Bushehr', 'bushehr-2': 'Sunset on the Persian Gulf, Bushehr', 'bushehr-3': 'Old lanes of Bushehr',
    'fars': 'Nasir-ol-Molk Mosque, Shiraz', 'fars-2': 'Tomb of Hafez', 'fars-3': 'Tomb of Saadi',
    'hormozgan': 'Red beach of Hormuz Island', 'hormozgan-2': 'Mangrove forests, Qeshm', 'hormozgan-3': 'Majara residence, Hormuz',
    'kohgiluyeh-and-boyer-ahmad': 'Oak forests of Yasuj', 'kohgiluyeh-and-boyer-ahmad-2': 'Green plains of Yasuj', 'kohgiluyeh-and-boyer-ahmad-3': 'Mount Dena',
    'chaharmahal-and-bakhtiari': 'Winter in Shahrekord', 'chaharmahal-and-bakhtiari-2': 'A lone tree in the Shahrekord snow', 'chaharmahal-and-bakhtiari-3': 'University of Shahrekord',
    'north-khorasan': 'Esfarayen and its hills', 'north-khorasan-2': 'Mofakham Mirror House, Bojnurd', 'north-khorasan-3': 'Timurid mausoleum, Shirvan',
    'razavi-khorasan': 'Shrine of Imam Reza, Mashhad', 'razavi-khorasan-2': 'Mountains of Razavi Khorasan', 'razavi-khorasan-3': 'A lake on the road to Kalat',
    'south-khorasan': 'Plain and water, South Khorasan', 'south-khorasan-2': 'Forg Castle', 'south-khorasan-3': 'Landscape of Forg',
    'kerman': 'Kaluts of Shahdad', 'kerman-2': 'Historic building in Kerman at night', 'kerman-3': 'Jabalieh Dome, Kerman',
    'sistan-and-baluchestan': 'Martian Mountains, Chabahar', 'sistan-and-baluchestan-2': 'Rocky beach of Darya Bozorg, Chabahar', 'sistan-and-baluchestan-3': 'Sea cliffs of Chabahar',
  },
  grid: ['Rice paddies of Fuman, Gilan', 'Kazem Dashi rock, Lake Urmia', 'Mangrove forests, Qeshm Island', 'Red beach of Hormuz Island', 'Si-o-se-pol and the Zayandeh River, Isfahan', 'Kaluts of Shahdad, Kerman'],
};

/* switch: the same page with ?lang=en, or without it for Persian */
const FLAGS = {
  fa: '<img src="assets/flag-ir.svg" alt="" width="21" height="15" decoding="async">',   // official flag (Wikimedia Commons, public domain)
  en: '<svg viewBox="0 0 21 15"><rect width="21" height="15" fill="#fff"/><g fill="#b22234"><rect width="21" height="1.154"/><rect y="2.308" width="21" height="1.154"/><rect y="4.615" width="21" height="1.154"/><rect y="6.923" width="21" height="1.154"/><rect y="9.231" width="21" height="1.154"/><rect y="11.538" width="21" height="1.154"/><rect y="13.846" width="21" height="1.154"/></g><rect width="9" height="8.077" fill="#3c3b6e"/></svg>',
};
function setLang(code) {
  const u = new URL(location.href);
  if (code === 'en') u.searchParams.set('lang', 'en'); else u.searchParams.delete('lang');
  location.href = u.toString();
}
