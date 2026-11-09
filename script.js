/* =====================================================================
   7. CONTENT (Persian)
   ===================================================================== */
const CONFIG = {
  frame: { w: 1440, h: 810 },
  grid: { small: 'assets/grid-sm.webp', large: 'assets/grid.webp', fallback: 'assets/grid.jpg', cols: 3, rows: 2, gutter: 12, w: 5064, h: 2252 },
  video: null,                 // e.g. 'assets/grid.mp4' — a 4s 3×2 loop. Unset: stills are used.
  mobileQuery: '(max-width: 760px), (orientation: portrait) and (max-width: 1100px)',
};

const UNSPLASH = 'Unsplash License';
const PHOTOS = [ // grid cells, index = cell (top row then bottom row, left to right in the image)
  { place: 'شالیزارهای فومن، گیلان', by: 'Sajad Baharvandi', lic: UNSPLASH, url: 'https://unsplash.com/photos/T_1Fc04PehQ' },
  { place: 'صخره کاظم‌داشی، دریاچه ارومیه', by: 'Hamed Sadighi', lic: UNSPLASH, url: 'https://unsplash.com/photos/8E0xSqkwQvo' },
  { place: 'جنگل‌های حرا، جزیره قشم', by: 'hiva sharifi', lic: UNSPLASH, url: 'https://unsplash.com/photos/XJgsrqtMng8' },
  { place: 'ساحل سرخ جزیره هرمز', by: 'Reza Ghazali', lic: UNSPLASH, url: 'https://unsplash.com/photos/ueEGnLSeUFM' },
  { place: 'سی‌وسه‌پل و زاینده‌رود، اصفهان', by: 'Mehdi Najafi', lic: UNSPLASH, url: 'https://unsplash.com/photos/twV0iyStgus' },
  { place: 'کلوت‌های شهداد، کرمان', by: 'TheVesperStar', lic: UNSPLASH, url: 'https://unsplash.com/photos/DKyhxD04AoY' },
];

const REGIONS = [
  {
    id: 'caspian', name: 'کرانه خزر', city: 'ساری', color: 'var(--c-caspian)', tone: 'dark',
    mapCell: 0, storyCell: 0,
  },
  {
    id: 'northwest', name: 'شمال‌غرب و غرب', city: 'تبریز', color: 'var(--c-northwest)', tone: 'dark',
    mapCell: 1, storyCell: 1,
  },
  {
    id: 'central', name: 'فلات مرکزی', city: 'اصفهان', color: 'var(--c-central)', tone: 'dark',
    mapCell: 4, storyCell: 4,
  },
  {
    id: 'south', name: 'جنوب و خلیج فارس', city: 'بوشهر', color: 'var(--c-south)', tone: 'dark',
    mapCell: 3, storyCell: 2,
  },
  {
    id: 'east', name: 'شرق و شمال‌شرق', city: 'زاهدان', color: 'var(--c-east)', tone: 'light',
    mapCell: 5, storyCell: 5,
  },
];

/* one story per province: photo (nature or city, no people), capital and a short editorial line */
const PROVINCE_STORIES = {
  'Gilan': { capital: 'رشت', img: 'gilan', place: 'شالیزارهای فومن', by: 'Sajad Baharvandi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/T_1Fc04PehQ',
    desc: 'سرسبزترین استان کرانه خزر با شالیزارهای برنج، جنگل‌های مه‌گرفته و روستای پلکانی ماسوله؛ رشت شهر خلاق خوراک یونسکو است.' },
  'Mazandaran': { capital: 'ساری', img: 'mazandaran', place: 'دریاچه و جنگل لفور', by: 'Ali Ahmadi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/QEDJLcXHsbs',
    desc: 'میان دریای خزر و رشته‌کوه البرز؛ سرزمین جنگل‌های هیرکانی، شالیزارها و قله دماوند، بلندترین کوه ایران.' },
  'Golestan': { capital: 'گرگان', img: 'golestan', place: 'بالای ابرها، درازنو', by: 'Niloufar Sharifi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/W_Ol6hi5588',
    desc: 'جایی که جنگل‌های هیرکانی به دشت ترکمن‌صحرا می‌رسند؛ برج گنبد قابوس و پارک ملی گلستان از نشانه‌های این استان‌اند.' },
  'East Azerbaijan': { capital: 'تبریز', img: 'east-azerbaijan', place: 'روستای صخره‌ای کندوان', by: 'Soroush Bahramian', lic: 'Unsplash License', url: 'https://unsplash.com/photos/-23vnRcG0Mg',
    desc: 'با مرکز تبریز، از کهن‌ترین شهرهای تجاری ایران؛ بازار تاریخی تبریز میراث جهانی است و روستای صخره‌ای کندوان شهرتی جهانی دارد.' },
  'West Azerbaijan': { capital: 'ارومیه', img: 'west-azerbaijan', place: 'صخره کاظم‌داشی، دریاچه ارومیه', by: 'Hamed Sadighi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/8E0xSqkwQvo',
    desc: 'در کرانه غربی دریاچه ارومیه و مرز ترکیه و عراق؛ تخت سلیمان و قره‌کلیسا دو میراث جهانی این استان‌اند.' },
  'Ardabil': { capital: 'اردبیل', img: 'ardabil', place: 'دشت‌های اردبیل و سبلان', by: 'Benyamin shamis', lic: 'Unsplash License', url: 'https://unsplash.com/photos/RnPzH9stAH4',
    desc: 'استانی کوهستانی در دامنه سبلان با چشمه‌های آب گرم سرعین؛ بقعه شیخ صفی‌الدین اردبیلی در فهرست میراث جهانی است.' },
  'Zanjan': { capital: 'زنجان', img: 'zanjan', place: 'کوه‌های رنگی زنجان', by: 'Hasan Amirzadeh', lic: 'Unsplash License', url: 'https://unsplash.com/photos/ARGefDxbOD0',
    desc: 'میان تهران و تبریز؛ گنبد سلطانیه از بزرگ‌ترین گنبدهای آجری جهان است و کوه‌های رنگی و چاقوهای زنجان شهرت دارند.' },
  'Kurdistan': { capital: 'سنندج', img: 'kurdistan', place: 'روستای پلکانی اورامان', by: 'Farzad Mohsenvand', lic: 'Unsplash License', url: 'https://unsplash.com/photos/JG1xsJx145U',
    desc: 'استانی کوهستانی در زاگرس با مرکز سنندج؛ منظر فرهنگی اورامان با روستاهای پلکانی‌اش میراث جهانی یونسکو است.' },
  'Kermanshah': { capital: 'کرمانشاه', img: 'kermanshah', place: 'طاق‌بستان، کرمانشاه', by: 'PaaZ PG', lic: 'Unsplash License', url: 'https://unsplash.com/photos/LCnHjxjTwqk',
    desc: 'دروازه غربی ایران در دل زاگرس؛ کتیبه بیستون (میراث جهانی) و نقش‌برجسته‌های ساسانی طاق‌بستان در این استان‌اند.' },
  'Ilam': { capital: 'ایلام', img: 'ilam', place: 'غار زینگان، ایلام', by: 'Mahdieh Mahix', lic: 'Unsplash License', url: 'https://unsplash.com/photos/0TteIg5Fqvo',
    desc: 'استانی مرزی با عراق در جنوب زاگرس؛ جنگل‌های بلوط، کبیرکوه و تنگه‌ها و غارهایش طبیعتی کمتر دیده‌شده دارند.' },
  'Hamadan': { capital: 'همدان', img: 'hamadan', place: 'آرامگاه باباطاهر، همدان', by: 'sara rahmani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/mjGLFF_f8N8',
    desc: 'هگمتانه، پایتخت مادها؛ آرامگاه بوعلی‌سینا و باباطاهر، غار علیصدر و کوه الوند از نشانه‌های همدان‌اند.' },
  'Lorestan': { capital: 'خرم‌آباد', img: 'lorestan', place: 'قلعه فلک‌الافلاک، خرم‌آباد', by: 'David Mohseni', lic: 'Unsplash License', url: 'https://unsplash.com/photos/e0qrN6v0i44',
    desc: 'استانی کوهستانی در زاگرس با مرکز خرم‌آباد؛ قلعه فلک‌الافلاک، آبشار بیشه و دریاچه گهر از جاذبه‌های آن‌اند.' },
  'Tehran': { capital: 'تهران', img: 'tehran', place: 'برج میلاد در شب', by: 'Hossein Moradi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/THtlQ6BHH9U', pos: '50% 0%',
    desc: 'پرجمعیت‌ترین استان و پایتخت ایران در دامنه جنوبی البرز؛ کاخ گلستان (میراث جهانی)، برج میلاد و توچال از نمادهای آن‌اند.' },
  'Alborz': { capital: 'کرج', img: 'alborz', place: 'روستای شهرستانک', by: 'Vahid Moeini Jazani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/sz1aaFjDH6s',
    desc: 'استانی جوان که در سال ۱۳۸۹ از تهران جدا شد، با مرکز کرج؛ جاده چالوس و روستاهای کوهستانی مثل شهرستانک از جاذبه‌های آن‌اند.' },
  'Qazvin': { capital: 'قزوین', img: 'qazvin', place: 'دریاچه اوان، الموت', by: 'Azin Javadzadeh', lic: 'Unsplash License', url: 'https://unsplash.com/photos/n17q1FOlTaI',
    desc: 'پایتخت صفویان پیش از اصفهان؛ دره الموت با قلعه‌های تاریخی و دریاچه اوان، و کاروانسراهای قزوین از دیدنی‌های این استان‌اند.' },
  'Markazi': { capital: 'اراک', img: 'markazi', place: 'چشم‌انداز شهری، استان مرکزی', by: 'Javad Esmaeili', lic: 'Unsplash License', url: 'https://unsplash.com/photos/CT1PDyr5k_w',
    desc: 'با مرکز اراک، یکی از قطب‌های صنعتی ایران؛ فراهان زادگاه امیرکبیر و قائم‌مقام فراهانی است.' },
  'Qom': { capital: 'قم', img: 'qom', place: 'گنبدهای طلایی قم', by: 'mostafa meraji', lic: 'Unsplash License', url: 'https://unsplash.com/photos/ENFNEe7v1Ps',
    desc: 'شهری زیارتی با حرم حضرت معصومه و حوزه علمیه، در لبه کویر مرکزی و نزدیک دریاچه نمک.' },
  'Isfahan': { capital: 'اصفهان', img: 'isfahan', place: 'سی‌وسه‌پل و زاینده‌رود', by: 'Mehdi Najafi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/twV0iyStgus',
    desc: 'پایتخت صفویان؛ میدان نقش جهان و مسجد جامع (میراث جهانی)، سی‌وسه‌پل و زاینده‌رود از شاهکارهای اصفهان‌اند.' },
  'Semnan': { capital: 'سمنان', img: 'semnan', place: 'دره‌های سبز سمنان', by: 'Alireza Najd', lic: 'Unsplash License', url: 'https://unsplash.com/photos/kc3yprdi9Dg',
    desc: 'پهنه‌ای میان البرز و دشت کویر؛ پارک ملی توران از آخرین زیستگاه‌های یوزپلنگ آسیایی است.' },
  'Yazd': { capital: 'یزد', img: 'yazd', place: 'میدان امیرچخماق، یزد', by: 'Mahbod Akhzami', lic: 'Unsplash License', url: 'https://unsplash.com/photos/I244QVbmq80',
    desc: 'شهر تاریخی یزد با بادگیرها، قنات‌ها و کوچه‌های خشتی‌اش میراث جهانی یونسکو است و از مراکز مهم زرتشتیان ایران.' },
  'Khuzestan': { capital: 'اهواز', img: 'khuzestan', place: 'رودخانه دز، دزفول', by: 'Noushin Ghelichkhan', lic: 'Unsplash License', url: 'https://unsplash.com/photos/wVZZWam9jfI',
    desc: 'سرزمین رودهای کارون، کرخه و دز؛ چغازنبیل، شوش و سازه‌های آبی شوشتر سه میراث جهانی این استان‌اند.' },
  'Bushehr': { capital: 'بوشهر', img: 'bushehr', place: 'بافت تاریخی بوشهر', by: 'Ali Haghighi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/e0dABb--1YI',
    desc: 'بندری کهن در کرانه خلیج فارس با بافت تاریخی و خانه‌های شناشیل‌دار؛ زادگاه رئیسعلی دلواری و موسیقی جنوبی.' },
  'Fars': { capital: 'شیراز', img: 'fars', place: 'مسجد نصیرالملک، شیراز', by: 'muaz semih güven', lic: 'Unsplash License', url: 'https://unsplash.com/photos/JtQ22b1prf0',
    desc: 'با مرکز شیراز، شهر حافظ و سعدی؛ تخت جمشید، پاسارگاد و باغ ارم از میراث جهانی این استان‌اند.' },
  'Hormozgan': { capital: 'بندرعباس', img: 'hormozgan', place: 'ساحل سرخ جزیره هرمز', by: 'Reza Ghazali', lic: 'Unsplash License', url: 'https://unsplash.com/photos/ueEGnLSeUFM',
    desc: 'جزیره‌های قشم، کیش و هرمز در خلیج فارس و بندرعباس، مهم‌ترین بندر تجاری ایران، در این استان‌اند.' },
  'Kohgiluyeh and Boyer-Ahmad': { capital: 'یاسوج', img: 'kohgiluyeh-and-boyer-ahmad', place: 'جنگل‌های بلوط یاسوج', by: 'Hasan Almasi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/AvdafVbjmi0',
    desc: 'استانی کوهستانی در زاگرس با مرکز یاسوج؛ جنگل‌های بلوط، آبشارها و قله دنا از جلوه‌های آن‌اند.' },
  'Chaharmahal and Bakhtiari': { capital: 'شهرکرد', img: 'chaharmahal-and-bakhtiari', place: 'زمستان شهرکرد', by: 'Ali Arjmandi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/f6RgTAymx0M',
    desc: 'بام ایران با زمستان‌های برفی؛ زاینده‌رود و کارون از کوه‌های زردکوه این استان سرچشمه می‌گیرند.' },
  'North Khorasan': { capital: 'بجنورد', img: 'north-khorasan', place: 'اسفراین و تپه‌های اطراف', by: 'Alireza ktn', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Esfarayen.jpg',
    desc: 'با مرکز بجنورد در مرز ترکمنستان؛ استانی با تنوع قومی کرد، ترک، ترکمن و فارس و کوهستان‌های سرسبز.' },
  'Razavi Khorasan': { capital: 'مشهد', img: 'razavi-khorasan', place: 'حرم امام رضا، مشهد', by: 'Kamran Ch', lic: 'Unsplash License', url: 'https://unsplash.com/photos/5KZm72I6xvo',
    desc: 'با مرکز مشهد و حرم امام رضا؛ آرامگاه فردوسی در توس و زعفران خراسان از نمادهای این استان‌اند.' },
  'South Khorasan': { capital: 'بیرجند', img: 'south-khorasan', place: 'دشت و آب، خراسان جنوبی', by: 'Mehran Mesbahzadeh', lic: 'Unsplash License', url: 'https://unsplash.com/photos/ctBTbNO2h3E',
    desc: 'با مرکز بیرجند در مرز افغانستان؛ باغ اکبریه (میراث جهانی)، روستای ماخونیک و زرشک و زعفرانش شناخته‌شده‌اند.' },
  'Kerman': { capital: 'کرمان', img: 'kerman', place: 'کلوت‌های شهداد', by: 'TheVesperStar', lic: 'Unsplash License', url: 'https://unsplash.com/photos/DKyhxD04AoY',
    desc: 'ارگ بم، باغ شازده ماهان و کلوت‌های شهداد در دشت لوت (میراث جهانی) از جاذبه‌های کرمان‌اند.' },
  'Sistan and Baluchestan': { capital: 'زاهدان', img: 'sistan-and-baluchestan', place: 'کوه‌های مریخی چابهار', by: 'Reihaneh Sadat-Shokouhi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/n7v2xgPTmgA',
    desc: 'استانی پهناور در جنوب‌شرق با بندر چابهار در کرانه دریای عمان؛ شهر سوخته و کوه‌های مریخی از دیدنی‌های آن‌اند.' },
};

/* population (2023 estimate) and area in km² — source: Wikipedia, "Provinces of Iran" */
const PROVINCE_STATS = {
  'Alborz': [2730000, 5833], 'Ardabil': [1284000, 17800], 'Bushehr': [1174000, 22743],
  'Chaharmahal and Bakhtiari': [973000, 16332], 'East Azerbaijan': [3925000, 45650], 'Fars': [4904000, 122608],
  'Gilan': [2546000, 14042], 'Golestan': [1893000, 20195], 'Hamadan': [1756000, 19368],
  'Hormozgan': [1806000, 70669], 'Ilam': [591000, 20133], 'Isfahan': [5136000, 107029],
  'Kerman': [3184000, 183285], 'Kermanshah': [2003000, 24998], 'Khuzestan': [4725000, 64055],
  'Kohgiluyeh and Boyer-Ahmad': [728000, 15504], 'Kurdistan': [1614000, 29137], 'Lorestan': [1784000, 28294],
  'Markazi': [1436000, 29130], 'Mazandaran': [3302000, 23701], 'North Khorasan': [868000, 28434],
  'Qazvin': [1284000, 15549], 'Qom': [1300000, 11526], 'Razavi Khorasan': [6444000, 118884],
  'Semnan': [715000, 97491], 'Sistan and Baluchestan': [2777000, 180726], 'South Khorasan': [786000, 151913],
  'Tehran': [13323000, 18814], 'West Azerbaijan': [3278000, 37437], 'Yazd': [1156000, 76469],
  'Zanjan': [1103000, 21773],
};
const faNum = (n, d = 0) => n.toLocaleString(IS_FA ? 'fa-IR' : 'en-US', { maximumFractionDigits: d });
const placeOf = ph => (IS_FA ? ph.place : EN.places[ph.img] || ph.place);
const photoCredit = ph => `${T('photo')}: ${placeOf(ph)} · ${ph.by} · ${ph.lic}`;
const popText = n => n >= 1e6 ? `${faNum(n / 1e6, n >= 1e7 ? 1 : 2)} ${T('million')}` : `${faNum(Math.round(n / 1000))} ${T('thousand')}`;

/* card colour per province, taken from what each one is known for; 'light' cards get dark text */
const PROVINCE_COLORS = {
  'Gilan': ['#3E7D3A', 'dark'],                    // rice paddies
  'Mazandaran': ['#1F4D32', 'dark'],               // Hyrcanian forest
  'Golestan': ['#5C6B2E', 'dark'],                 // forest meets steppe
  'East Azerbaijan': ['#1F4E8C', 'dark'],          // Blue Mosque of Tabriz
  'West Azerbaijan': ['#B5566A', 'dark'],          // pink salt of Lake Urmia
  'Ardabil': ['#8E2A2A', 'dark'],                  // Ardabil carpet red
  'Zanjan': ['#B5532F', 'dark'],                   // rainbow mountains
  'Kurdistan': ['#4F6B4A', 'dark'],                // Uraman terraces
  'Kermanshah': ['#7A6A58', 'dark'],               // Bisotun stone
  'Ilam': ['#556B2F', 'dark'],                     // Zagros oaks
  'Hamadan': ['#1E5A6B', 'dark'],                  // Ali-Sadr cave water
  'Lorestan': ['#8A6A44', 'dark'],                 // Falak-ol-Aflak stone
  'Tehran': ['#1E2533', 'dark'],                   // Milad Tower at night
  'Alborz': ['#4A5D73', 'dark'],                   // Alborz slate
  'Qazvin': ['#3D6E7A', 'dark'],                   // Ovan lake, Alamut
  'Markazi': ['#5A6068', 'dark'],                  // industry, steel
  'Qom': ['#C9A227', 'light'],                     // golden dome
  'Isfahan': ['#167E7E', 'dark'],                  // turquoise tiles
  'Semnan': ['#C2A26B', 'light'],                  // desert sand
  'Yazd': ['#9D663E', 'dark'],                     // adobe
  'Khuzestan': ['#2F6E99', 'dark'],                // Karun river
  'Bushehr': ['#27789F', 'dark'],                  // Persian Gulf
  'Fars': ['#A33B5E', 'dark'],                     // Nasir-ol-Molk glass, Shiraz roses
  'Hormozgan': ['#B8382E', 'dark'],                // red soil of Hormuz
  'Kohgiluyeh and Boyer-Ahmad': ['#2F5A36', 'dark'], // oak forests
  'Chaharmahal and Bakhtiari': ['#8FA9BF', 'light'], // snow, roof of Iran
  'North Khorasan': ['#6D7D42', 'dark'],           // green hills
  'Razavi Khorasan': ['#6A3D7A', 'dark'],          // saffron flower
  'South Khorasan': ['#9C1F2E', 'dark'],           // barberry
  'Kerman': ['#B15A26', 'dark'],                   // Lut desert
  'Sistan and Baluchestan': ['#A76455', 'dark'],   // Martian mountains
};

/* extra photos per province (the story photo above is always slide 1) */
const PROVINCE_GALLERY = {
  'Gilan': [
    { img: 'gilan-2', place: 'کوه‌های سرسبز ماسال', by: 'Abbas Tehrani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/g5PA32vZ0SI' },
    { img: 'gilan-3', place: 'میدان شهرداری رشت', by: 'Siamak', lic: 'Unsplash License', url: 'https://unsplash.com/photos/9vWkadIHH5U' },
  ],
  'Mazandaran': [
    { img: 'mazandaran-2', place: 'راه‌آهن شمال در کوهستان مازندران', by: 'Alireza heidarpour', lic: 'Unsplash License', url: 'https://unsplash.com/photos/IuGFskgozfw' },
    { img: 'mazandaran-3', place: 'دشت و جنگل دریاسر', by: 'Morteza FarkhondePour', lic: 'Unsplash License', url: 'https://unsplash.com/photos/wPL9ZvNKY-U' },
  ],
  'Golestan': [
    { img: 'golestan-2', place: 'جاده جنگلی گرگان', by: 'Asal Lotfi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/LSmqekuoetQ' },
    { img: 'golestan-3', place: 'جنگل زمستانی گرگان', by: 'Asal Lotfi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/KI13EtEtS14' },
  ],
  'East Azerbaijan': [
    { img: 'east-azerbaijan-2', place: 'مسجد کبود تبریز', by: 'Mota Ehdaei', lic: 'Unsplash License', url: 'https://unsplash.com/photos/Bq9eZPLILnw' },
    { img: 'east-azerbaijan-3', place: 'عمارت ائل‌گلی تبریز', by: 'Mohammad Mohammadpour', lic: 'Unsplash License', url: 'https://unsplash.com/photos/R4RflhzPtwA' },
  ],
  'West Azerbaijan': [
    { img: 'west-azerbaijan-2', place: 'پلی بر آب، ارومیه', by: 'naeim jafari', lic: 'Unsplash License', url: 'https://unsplash.com/photos/OtU4-pu3AHg' },
    { img: 'west-azerbaijan-3', place: 'درختی تنها در کرانه، ارومیه', by: 'Pouya Mousighichi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/7hsa-dmQOMk' },
  ],
  'Ardabil': [
    { img: 'ardabil-2', place: 'بنای تاریخی گنبددار، اردبیل', by: 'Mohammadreza Charkhgard', lic: 'Unsplash License', url: 'https://unsplash.com/photos/JDOua7n77LU' },
    { img: 'ardabil-3', place: 'دریاچه شورابیل در زمستان', by: 'Habib Eskandari', lic: 'Unsplash License', url: 'https://unsplash.com/photos/EFyxwTaGtuU' },
  ],
  'Zanjan': [
    { img: 'zanjan-2', place: 'طلوع بر کوه‌های زنجان', by: 'Raziyeh Ramezanikarimi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/AO2L1eVAGKc' },
    { img: 'zanjan-3', place: 'چشم‌انداز زنجان', by: 'razi pouri', lic: 'Unsplash License', url: 'https://unsplash.com/photos/pKJ3P948DSQ' },
  ],
  'Kurdistan': [
    { img: 'kurdistan-2', place: 'نمای شهر سنندج', by: 'Nasim Keshmiri', lic: 'Unsplash License', url: 'https://unsplash.com/photos/x5Nv5XDN2tA' },
    { img: 'kurdistan-3', place: 'غروب بر کوه‌های سنندج', by: 'Omid Armin', lic: 'Unsplash License', url: 'https://unsplash.com/photos/JKBwvka9ocs' },
  ],
  'Kermanshah': [
    { img: 'kermanshah-2', place: 'نقش‌برجسته‌های طاق‌بستان', by: 'Amir Vafa', lic: 'Unsplash License', url: 'https://unsplash.com/photos/K3ch3chnLZM' },
    { img: 'kermanshah-3', place: 'روستای نودشه', by: 'Payman Sleimani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/4BFFfg7g7hs' },
  ],
  'Ilam': [
    { img: 'ilam-2', place: 'کوه و دشت ایلام', by: 'Sajad Rostami', lic: 'Unsplash License', url: 'https://unsplash.com/photos/dd7ybEVm6j8' },
    { img: 'ilam-3', place: 'دشت سرسبز ایلام', by: 'ati karezani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/_hC4ftl0ANQ' },
  ],
  'Hamadan': [
    { img: 'hamadan-2', place: 'غار علیصدر', by: 'Sina Morovat', lic: 'Unsplash License', url: 'https://unsplash.com/photos/D2MosPa3SfQ' },
    { img: 'hamadan-3', place: 'قطار در کوهستان همدان', by: 'lens zone', lic: 'Unsplash License', url: 'https://unsplash.com/photos/KCQ3lQhTkPM' },
  ],
  'Lorestan': [
    { img: 'lorestan-2', place: 'کوه‌های خرم‌آباد', by: 'Shahriyar Payvar', lic: 'Unsplash License', url: 'https://unsplash.com/photos/jrK6aU6XpHA' },
    { img: 'lorestan-3', place: 'پارک ملی مخملکوه', by: 'Shayan Kebriti', lic: 'Unsplash License', url: 'https://unsplash.com/photos/CocD0GYvjcY' },
  ],
  'Tehran': [
    { img: 'tehran-2', place: 'برج آزادی', by: 'fatemeh momtaz', lic: 'Unsplash License', url: 'https://unsplash.com/photos/1o7to4wXLUc' },
    { img: 'tehran-3', place: 'افق تهران هنگام غروب', by: 'hosein charbaghi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/zQ5IehmIGhw' },
  ],
  'Alborz': [
    { img: 'alborz-2', place: 'پاییز در شهرستانک', by: 'Shima Abedinzade', lic: 'Unsplash License', url: 'https://unsplash.com/photos/Pa55Qmy_JwY' },
    { img: 'alborz-3', place: 'خانه‌ای قدیمی در شهرستانک', by: 'Shima Abedinzade', lic: 'Unsplash License', url: 'https://unsplash.com/photos/dH0YD5QBLfc' },
  ],
  'Qazvin': [
    { img: 'qazvin-2', place: 'کوه‌های قزوین از بالا', by: 'Erfan Akbari', lic: 'Unsplash License', url: 'https://unsplash.com/photos/U7D-stvK9H0' },
    { img: 'qazvin-3', place: 'بنای تاریخی قزوین', by: 'Reza Delkhosh', lic: 'Unsplash License', url: 'https://unsplash.com/photos/XJNw42BLt1Y' },
  ],
  'Markazi': [
    { img: 'markazi-2', place: 'درختی تنها در دشت محلات', by: 'hosein solimani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/YghlJwHCZv8' },
    { img: 'markazi-3', place: 'مسجد جامع ساوه', by: 'Amir Shiri', lic: 'Unsplash License', url: 'https://unsplash.com/photos/ASsDwXKk3lE' },
  ],
  'Qom': [
    { img: 'qom-2', place: 'کاشی‌کاری سقف حرم قم', by: 'Mohamad Yaser Akbari', lic: 'Unsplash License', url: 'https://unsplash.com/photos/hXFDinuEo10' },
    { img: 'qom-3', place: 'مناره‌ای در قم', by: 'mostafa meraji', lic: 'Unsplash License', url: 'https://unsplash.com/photos/wcG-SssOPVc' },
  ],
  'Isfahan': [
    { img: 'isfahan-2', place: 'پل خواجو در شب', by: 'mohammad nasr', lic: 'Unsplash License', url: 'https://unsplash.com/photos/DUWnANsBhGo' },
    { img: 'isfahan-3', place: 'گنبد شیخ لطف‌الله، میدان نقش جهان', by: 'Sana Karimi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/4oOnx7vaM20' },
  ],
  'Semnan': [
    { img: 'semnan-2', place: 'صخره‌های سمنان', by: 'Mohsen Mahdavi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/mAjawTilCUQ' },
    { img: 'semnan-3', place: 'کاشی‌کاری بسطام', by: 'Niloofar Kanani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/rbL5mBYcHpU' },
  ],
  'Yazd': [
    { img: 'yazd-2', place: 'بادگیرهای یزد', by: 'Amirhassan Emami', lic: 'Unsplash License', url: 'https://unsplash.com/photos/oqDiiSKMQNU' },
    { img: 'yazd-3', place: 'بافت تاریخی یزد', by: 'Hasan Almasi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/Jp3OEDO4Q-8' },
  ],
  'Khuzestan': [
    { img: 'khuzestan-2', place: 'پل سفید و رود کارون، اهواز', by: 'Ashkan Forouzani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/S7xfAkiepBE' },
    { img: 'khuzestan-3', place: 'پل غدیر اهواز در شب', by: 'Ashkan Forouzani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/rvFaGeJ4JMI' },
  ],
  'Bushehr': [
    { img: 'bushehr-2', place: 'غروب خلیج فارس در بوشهر', by: 'Mohammad Pourcheriki', lic: 'Unsplash License', url: 'https://unsplash.com/photos/ZTCIk-0ye7A' },
    { img: 'bushehr-3', place: 'کوچه‌های قدیمی بوشهر', by: 'Ali Jahandideh', lic: 'Unsplash License', url: 'https://unsplash.com/photos/ui8SdNlWvew' },
  ],
  'Fars': [
    { img: 'fars-2', place: 'آرامگاه حافظ', by: 'Poriya Zolghadr', lic: 'Unsplash License', url: 'https://unsplash.com/photos/Qg4s5tfvT8w' },
    { img: 'fars-3', place: 'آرامگاه سعدی', by: 'Mohammad Javad Rakhshani', lic: 'Unsplash License', url: 'https://unsplash.com/photos/yEiHt-CNRE4' },
  ],
  'Hormozgan': [
    { img: 'hormozgan-2', place: 'جنگل‌های حرا، قشم', by: 'hiva sharifi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/XJgsrqtMng8' },
    { img: 'hormozgan-3', place: 'اقامتگاه مجارا، هرمز', by: 'Mohammadreza Azali', lic: 'Unsplash License', url: 'https://unsplash.com/photos/Kvza4IPXsKE' },
  ],
  'Kohgiluyeh and Boyer-Ahmad': [
    { img: 'kohgiluyeh-and-boyer-ahmad-2', place: 'دشت‌های سرسبز یاسوج', by: 'Mohsen Taheri', lic: 'Unsplash License', url: 'https://unsplash.com/photos/AnnxNDoup8I' },
    { img: 'kohgiluyeh-and-boyer-ahmad-3', place: 'کوه دنا', by: 'Eh kia', lic: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Dena_Mountain-Iran-Mar2012.JPG' },
  ],
  'Chaharmahal and Bakhtiari': [
    { img: 'chaharmahal-and-bakhtiari-2', place: 'درختی تنها در برف شهرکرد', by: 'Ali Arjmandi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/pb6FAHe0V8Y' },
    { img: 'chaharmahal-and-bakhtiari-3', place: 'دانشگاه شهرکرد', by: 'Mahdi Salimian', lic: 'Unsplash License', url: 'https://unsplash.com/photos/ByvS8s5p3H0' },
  ],
  'Razavi Khorasan': [
    { img: 'razavi-khorasan-2', place: 'کوهستان خراسان رضوی', by: 'Mohammad Alizade', lic: 'Unsplash License', url: 'https://unsplash.com/photos/izAYpdsUWxQ' },
    { img: 'razavi-khorasan-3', place: 'دریاچه‌ای در راه کلات', by: 'Amirreza Taqavi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/DLX-79Cu8OI' },
  ],
  'South Khorasan': [
    { img: 'south-khorasan-2', place: 'قلعه فورگ', by: 'Noor Design', lic: 'Unsplash License', url: 'https://unsplash.com/photos/iGxxHYW8OQs' },
    { img: 'south-khorasan-3', place: 'چشم‌انداز فورگ', by: 'Noor Design', lic: 'Unsplash License', url: 'https://unsplash.com/photos/nPIMwrWLxNU' },
  ],
  'Kerman': [
    { img: 'kerman-2', place: 'بنای تاریخی کرمان در شب', by: 'Mehrnoosh Farrokhi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/lwQk-pb8Ric' },
    { img: 'kerman-3', place: 'گنبد جبلیه، کرمان', by: 'Asal Mdm', lic: 'Unsplash License', url: 'https://unsplash.com/photos/NkbGGG0weFI' },
  ],
  'Sistan and Baluchestan': [
    { img: 'sistan-and-baluchestan-2', place: 'ساحل صخره‌ای دریابزرگ، چابهار', by: 'Ali Ahmadi', lic: 'Unsplash License', url: 'https://unsplash.com/photos/R82AeU0CgRs' },
    { img: 'sistan-and-baluchestan-3', place: 'صخره‌های ساحلی چابهار', by: 'Youness Ahrari', lic: 'Unsplash License', url: 'https://unsplash.com/photos/3itiSKBNrsE' },
  ],
  'North Khorasan': [
    { img: 'north-khorasan-2', place: 'عمارت آینه‌خانه مفخم، بجنورد', by: 'Ahmad Bozorgmehr', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Sard%C3%A4r_Mofaxam_Mirror_House.jpg' },
    { img: 'north-khorasan-3', place: 'آرامگاه تیموری شیروان', by: 'Amiroo kh', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Timurid_mausoleum_of_Shirvan_(Ziarat).jpg' },
  ],
};

const MAP_LABELS = {
  countries: [['turkey', 'ترکیه'], ['iraq', 'عراق'], ['armenia', 'ارمنستان'], ['azerbaijan', 'جمهوری آذربایجان'], ['turkmenistan', 'ترکمنستان'], ['afghanistan', 'افغانستان'], ['pakistan', 'پاکستان']],
  caspian: 'دریای خزر', gulf: 'خلیج فارس', oman: 'دریای عمان', hormuz: 'تنگه هرمز',
  iran: 'ایران', zagros: 'رشته‌کوه زاگرس', tehran: 'تهران',
  cities: { caspian: 'ساری', northwest: 'تبریز', central: 'اصفهان', south: 'بوشهر', east: 'زاهدان' },
  ring: 'معرفی استان‌ها',
};
if (!IS_FA) {   // English map labels, same keys
  Object.assign(MAP_LABELS, EN.map, { countries: MAP_LABELS.countries.map(([k]) => [k, EN.map.countries[k]]) });
}
const pName = p => (IS_FA ? p.fa : p.name);
const rName = r => (IS_FA ? r.name : EN.regions[r.id]);

/* =====================================================================
   8. HELPERS
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const SVGNS = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs = {}, parent) => {
  const el = document.createElementNS(SVGNS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
};
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOutExpo = t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const mobileMQ = matchMedia(CONFIG.mobileQuery);
const fa = v => (IS_FA ? String(v).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : String(v));   // Persian digits in Persian only
const pad2 = n => String(n).padStart(2, '0');
const dms = (v, pos, neg) => {
  const a = Math.abs(v), d = Math.floor(a), m = Math.round((a - d) * 60);
  return `<bdi class="ltr">${fa(d)}°${fa(pad2(m === 60 ? 0 : m))}′</bdi> ${v >= 0 ? pos : neg}`;
};
const coord = ([lon, lat]) => `${dms(lat, T('N'), T('S'))}&nbsp; ${dms(lon, T('E'), T('W'))}`;

const MAP = JSON.parse($('#map-data').textContent);

/* =====================================================================
   9. PHOTOGRAPHY — one source (video or still grid) → many canvases
   ===================================================================== */
const Media = (() => {
  let still = new Image();
  still.decoding = 'async';
  const video = $('#grid-video');
  let videoReady = false;
  const targets = new Set();

  function source() {
    if (videoReady && video.readyState >= 2) return { el: video, w: video.videoWidth, h: video.videoHeight };
    if (still.complete && still.naturalWidth) return { el: still, w: still.naturalWidth, h: still.naturalHeight };
    return null;
  }

  function cellRect(i, w, h) {
    const g = CONFIG.grid, gx = g.gutter * (w / g.w), gy = g.gutter * (h / g.h);
    const cw = (w - gx * (g.cols - 1)) / g.cols, ch = (h - gy * (g.rows - 1)) / g.rows;
    return [(i % g.cols) * (cw + gx), Math.floor(i / g.cols) * (ch + gy), cw, ch];
  }

  // cover-crop: fill the canvas with the cell, cropping the overflowing axis
  function draw(t) {
    const src = source(); if (!src) return;
    const { canvas, cell, fx = .5, fy = .5 } = t, ctx = canvas.getContext('2d');
    const [sx, sy, sw, sh] = cellRect(cell, src.w, src.h);
    const cw = canvas.width, ch = canvas.height; if (!cw || !ch) return;
    if (t.own && t.own.complete && t.own.naturalWidth) {
      // the province's own photo, cover-cropped to the province box
      const iw = t.own.naturalWidth, ih = t.own.naturalHeight, k = Math.max(cw / iw, ch / ih);
      ctx.drawImage(t.own, (iw - cw / k) / 2, (ih - ch / k) / 2, cw / k, ch / k, 0, 0, cw, ch);
      return;
    }
    if (t.frame) {
      // cover-crop the cell into a larger frame (the whole zone), then show only this canvas's part of it
      const [ox, oy, fw, fh] = t.frame(cw, ch);
      const s = Math.max(fw / sw, fh / sh), vw = fw / s, vh = fh / s;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(src.el, sx + (sw - vw) * fx, sy + (sh - vh) * fy, vw, vh, ox, oy, fw, fh);
      return;
    }
    const s = Math.max(cw / sw, ch / sh), vw = cw / s, vh = ch / s;
    ctx.drawImage(src.el, sx + (sw - vw) * fx, sy + (sh - vh) * fy, vw, vh, 0, 0, cw, ch);
  }

  function register(canvas, cell, fx, fy) { const t = { canvas, cell, fx, fy }; targets.add(t); draw(t); return t; }
  function sizeCanvas(canvas, cssW, cssH, scale) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(cssW * scale * dpr)), h = Math.max(1, Math.round(cssH * scale * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; return true; }
    return false;
  }
  const redrawAll = () => targets.forEach(draw);

  function frameLoop() {
    if (!videoReady) return;
    targets.forEach(t => { if (t.visible !== false) draw(t); });
    if (video.requestVideoFrameCallback) video.requestVideoFrameCallback(frameLoop);
    else requestAnimationFrame(frameLoop);
  }

  function init() {
    // 1) a small WebP (~270 KB) paints the photos quickly;
    // 2) on large or high-DPI screens the full WebP replaces it once the page is idle;
    // 3) the JPG is only used if WebP fails to decode.
    const g = CONFIG.grid;
    still.onload = redrawAll;
    still.onerror = () => { still.onerror = null; still.src = g.fallback; };
    still.src = g.small;
    const wantsLarge = !mobileMQ.matches && window.innerWidth * (window.devicePixelRatio || 1) > 1600;   // phones keep the small file
    if (wantsLarge) {
      const upgrade = () => {
        const big = new Image();
        big.decoding = 'async';
        big.onload = () => { still = big; redrawAll(); };   // swap the source, then repaint every canvas
        big.src = g.large;
      };
      (window.requestIdleCallback || (f => setTimeout(f, 1200)))(upgrade);
    }
    if (CONFIG.video && !reduceMotion.matches) {
      video.src = CONFIG.video;
      video.preload = 'auto';
      video.addEventListener('loadeddata', () => { videoReady = true; video.play().then(frameLoop).catch(() => { videoReady = false; }); }, { once: true });
      video.addEventListener('error', () => { videoReady = false; redrawAll(); }, { once: true });
    }
  }
  return { init, register, sizeCanvas, draw, redrawAll };
})();

/* =====================================================================
   10. MAP — layers, viewport fitting, zones, markers, labels
   ===================================================================== */
const stage = $('#stage'), base = $('#map-base'), top_ = $('#map-top'), photoLayer = $('#photo-layer'), ui = $('#ui');
const zonePhotos = [];
let view = { x: 0, y: 0, w: 1440, h: 810, s: 1 };

function buildMap() {
  // stagger the line drawing: neighbours first, then provinces, zones, outline
  const groups = [['.ink-n', 0, .5], ['.ink-lake', .3, .2], ['.ink-prov', .25, .55], ['.ink-zone', .45, .4], ['.ink-iran', .1, .6]];
  for (const [sel, start, spread] of groups) {
    const paths = top_.querySelectorAll(sel + ' path');
    paths.forEach((p, i) => p.style.setProperty('--d', (start + spread * (i / Math.max(1, paths.length - 1))).toFixed(3) + 's'));
  }

  // photo canvases: one per province (31), each clipped to its province.
  // A province shows its slice of the zone photo, so a whole zone still reads as one image.
  MAP.provinces.forEach((p, i) => {
    const c = document.createElement('canvas');
    c.className = 'zone-photo';
    c.dataset.prov = i; c.dataset.zone = p.zone;
    const [x, y, w, h] = p.bbox, z = MAP.zones[p.zone].bbox;
    Object.assign(c.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', clipPath: `url(#clip-prov-${i})` });
    photoLayer.appendChild(c);
    const t = Media.register(c, REGIONS[p.zone].mapCell, .5, p.zone === 0 ? .32 : .5);
    t.frame = (cw, ch) => { const k = cw / w; return [(z[0] - x) * k, (z[1] - y) * k, z[2] * k, z[3] * k]; };
    Media.draw(t);
    zonePhotos.push({ canvas: c, prov: p, t });
  });

  // interactive areas: every province on its own
  const hits = $('#hits');
  MAP.provinces.forEach((p, i) => svg('use', { href: `#def-prov-${i}`, class: 'hit', 'data-zone': p.zone, 'data-prov': i, 'aria-hidden': 'true' }, hits));
  // outline of the hovered province + its name
  svg('use', { id: 'prov-hl', class: 'prov-hl', href: '#def-prov-0' }, hits);
  const pl = svg('text', { id: 'prov-label', class: 'lbl prov-label' }, hits);

  // labels — SVG text in RTL: anchor "start" = right edge, "end" = left edge
  const L = MAP.labels, g = $('#labels'), T = MAP_LABELS;
  const text = (xy, str, cls, extra = {}) => { const t = svg('text', { x: xy[0], y: xy[1], class: cls, ...extra }, g); t.textContent = str; return t; };
  T.countries.forEach(([k, s]) => text(L[k], s, 'lbl'));
  text(L.caspian, T.caspian, 'lbl lbl-water');
  const gulf = svg('g', { transform: `translate(${L.gulf[0]} ${L.gulf[1] + 6}) rotate(31)` }, g);
  svg('text', { class: 'lbl lbl-water', x: 0, y: 0 }, gulf).textContent = T.gulf;
  text(L.oman, T.oman, 'lbl lbl-water');
  text(L.hormuz, T.hormuz, 'lbl lbl-water lbl-small');
  text([L.iran[0], L.iran[1] + 8], T.iran, 'lbl lbl-iran');
  svg('path', { id: 'zagros-path', d: MAP.zagrosD, fill: 'none' }, g);
  const zt = svg('text', { class: 'lbl lbl-mtn', dy: -4 }, g);
  svg('textPath', { href: '#zagros-path', startOffset: '50%', 'text-anchor': 'middle' }, zt).textContent = T.zagros;
  svg('circle', { cx: MAP.tehran[0], cy: MAP.tehran[1], r: 2.6, fill: 'var(--ink)' }, g);
  text([MAP.tehran[0] - 7, MAP.tehran[1] + 4], T.tehran, 'lbl lbl-city', { style: `text-anchor:${IS_FA ? 'start' : 'end'}` });

  // markers
  const mg = $('#markers');
  MAP.zones.forEach((z, i) => {
    const [x, y] = z.city.xy;
    const m = svg('g', { class: 'marker', 'data-zone': i, transform: `translate(${x} ${y})`, 'aria-hidden': 'true' }, mg);
    const inner = svg('g', { class: 'marker-inner' }, m);
    svg('circle', { class: 'hit-dot', r: 22 }, inner);
    svg('circle', { class: 'halo', r: 8 }, inner);
    svg('circle', { class: 'dot', r: 8 }, inner);
    svg('text', { class: 'lbl lbl-city mk-city', x: 14, y: 4, style: `text-anchor:${IS_FA ? 'end' : 'start'}` }, inner).textContent = T.cities[z.id];
    const disc = svg('g', { class: 'disc' }, inner);
    const ring = svg('g', { class: 'ring' }, disc);
    svg('circle', { class: 'ring-bg', r: 45 }, ring);
    const spin = svg('g', { class: 'ring-spin' }, ring);
    const rt = svg('text', { class: 'fit-ring', 'data-r': 45 }, spin);
    svg('textPath', { href: '#ring-path' }, rt).textContent = `${T.ring} · ${T.ring} · ${T.ring} · `;
    svg('circle', { class: 'disc-face', r: 31 }, disc);
    svg('path', { class: 'plus', d: 'M-7 0H7M0 -7V7' }, disc);
  });
}

/* Fit circular text to its circumference by font size (letter-spacing would break Persian joins) */
function fitRings() {
  document.querySelectorAll('.fit-ring').forEach(t => {
    const r = +t.dataset.r, target = 2 * Math.PI * r - 4;
    t.style.fontSize = '';
    const fs = parseFloat(getComputedStyle(t).fontSize);
    const len = t.getComputedTextLength();
    if (len > 0) t.style.fontSize = (fs * target / len).toFixed(2) + 'px';
  });
}

/* fit the 1440×810 frame (desktop) or Iran's bounding box (mobile) to the stage */
function layout() {
  const isMobile = mobileMQ.matches;
  const W = stage.clientWidth, H = stage.clientHeight;
  if (!W || !H) return;
  let s, x, y;
  if (isMobile) {
    const [[x0, y0], [x1, y1]] = MAP.iranBBox, padX = 34, padY = 26;
    const bw = x1 - x0 + padX * 2, bh = y1 - y0 + padY * 2;
    s = Math.min(W / bw, H / bh);
    x = x0 - padX - (W / s - bw) / 2; y = y0 - padY - (H / s - bh) / 2;
  } else {
    s = Math.min(W / CONFIG.frame.w, H / CONFIG.frame.h);
    x = -(W / s - CONFIG.frame.w) / 2; y = -(H / s - CONFIG.frame.h) / 2;
  }
  // English mirrors the frame (intro left, list right): the map moves 48 frame-px right so it sits midway between them
  const mx = !isMobile && !IS_FA ? x - 48 : x;
  view = { x: mx, y, w: W / s, h: H / s, s };
  const vb = `${mx.toFixed(2)} ${y.toFixed(2)} ${view.w.toFixed(2)} ${view.h.toFixed(2)}`;
  base.setAttribute('viewBox', vb); top_.setAttribute('viewBox', vb);
  photoLayer.style.transform = `translate(${-mx * s}px, ${-y * s}px) scale(${s})`;

  // UI frame shares the same transform on desktop (it is a physical LTR box; content inside is RTL)
  ui.style.transform = isMobile ? '' : `translate(${-x * s}px, ${-y * s}px) scale(${s})`;
  document.documentElement.style.setProperty('--map-shift', isMobile ? '30vw' : (520 * s).toFixed(1) + 'px');

  const k = isMobile ? clamp(.62 / s, .6, 1.2) : 1;
  top_.querySelectorAll('.marker-inner').forEach(g => g.setAttribute('transform', `scale(${k.toFixed(3)})`));

  zonePhotos.forEach(zp => { const [, , w, h] = zp.prov.bbox; if (Media.sizeCanvas(zp.canvas, w, h, s)) Media.draw(zp.t); });
  Stories.layout();
}

/* =====================================================================
   11. STATE — active region, synchronised everywhere
   ===================================================================== */
const State = { active: -1, prov: -1, view: 'map' };
const regionButtons = [], chipButtons = [];

// provinces in list order: by region (so neighbours sit together), then by name
let PROV_ORDER = [];
function buildRegionUI() {
  const list = $('#region-list'), chips = $('#chips');
  PROV_ORDER = MAP.provinces.map((p, i) => i)
    .sort((a, b) => MAP.provinces[a].zone - MAP.provinces[b].zone || pName(MAP.provinces[a]).localeCompare(pName(MAP.provinces[b]), LANG));
  PROV_ORDER.forEach((pi, n) => {
    const p = MAP.provinces[pi], r = REGIONS[p.zone];
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.zone = p.zone; b.dataset.prov = pi;
    b.innerHTML = `<span class="num" aria-hidden="true">${fa(pad2(n + 1))}</span>${pName(p)}`;
    b.setAttribute('aria-label', `${pName(p)} — ${rName(r)}, ${T('intro_prov')}`);
    li.appendChild(b); list.appendChild(li); regionButtons[pi] = b;

    const c = document.createElement('button');
    c.type = 'button'; c.dataset.zone = p.zone; c.dataset.prov = pi; c.textContent = pName(p); c.setAttribute('role', 'tab');
    chips.appendChild(c); chipButtons[pi] = c;
  });
  list.addEventListener('scroll', placeRulerMark, { passive: true });
  $('#coord-tehran').innerHTML = coord([51.389, 35.6892]);
}

/* the terracotta mark on the ruler follows the active province, also while the list scrolls */
function placeRulerMark() {
  const list = $('#region-list'), b = regionButtons[State.prov], mark = $('#ruler-mark');
  if (!b) { mark.style.opacity = 0; return; }
  const y = b.offsetTop - list.scrollTop + b.offsetHeight / 2;
  const inside = y > 4 && y < list.clientHeight - 4;
  mark.style.opacity = inside ? 1 : 0;
  mark.style.setProperty('--y', Math.max(0, Math.min(list.clientHeight, y)) + 'px');
}

/* each region's marker city belongs to one province: Sari, Tabriz, Isfahan, Bushehr, Zahedan */
const CAPITAL = ['Mazandaran', 'East Azerbaijan', 'Isfahan', 'Bushehr', 'Sistan and Baluchestan'];
const capitalOf = zone => MAP.provinces.findIndex(p => p.name === CAPITAL[zone]);

function setActive(i, prov = -1) {
  if (prov < 0) prov = capitalOf(i);
  if (i === State.active && prov === State.prov) return;
  const zoneChanged = i !== State.active;
  State.active = i; State.prov = prov;
  const z = MAP.zones[i], p = prov >= 0 ? MAP.provinces[prov] : null;
  // photo: just the hovered province, or the whole zone when chosen from the list
  zonePhotos.forEach(zp => {
    const on = p ? zp.prov === p : zp.prov.zone === i;
    if (on && !zp.t.own) {                       // fetch the small province photo once, then repaint
      const im = new Image(); im.decoding = 'async';
      im.onload = () => Media.draw(zp.t);
      im.src = `assets/prov/${PROVINCE_STORIES[zp.prov.name].img}-sm.webp`;
      zp.t.own = im;
    }
    zp.canvas.classList.toggle('is-active', on);
  });
  const hl = $('#prov-hl'), pl = $('#prov-label');
  hl.classList.toggle('is-on', !!p); pl.classList.toggle('is-on', !!p);
  if (p) {
    hl.setAttribute('href', `#def-prov-${prov}`);
    pl.textContent = pName(p);
    pl.setAttribute('x', p.centroid[0]); pl.setAttribute('y', p.centroid[1] + 4);
  }
  $('#coord-label').textContent = p ? pName(p) : T('region');
  $('#coord-region').innerHTML = coord(p ? p.lonlat : z.lonlat);
  regionButtons.forEach((b, j) => b && b.setAttribute('aria-current', j === prov ? 'true' : 'false'));
  chipButtons.forEach((b, j) => { if (!b) return; b.setAttribute('aria-current', j === prov ? 'true' : 'false'); b.setAttribute('aria-selected', j === prov ? 'true' : 'false'); });
  // keep the active province in view inside the 10-row list (only when it came from the map)
  const list = $('#region-list'), btn = regionButtons[prov];
  if (btn && !list.matches(':hover')) {
    const top = btn.offsetTop, bottom = top + btn.offsetHeight;
    if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) list.scrollTop = top - list.clientHeight / 2 + btn.offsetHeight / 2;
  }
  placeRulerMark();
  if (mobileMQ.matches && chipButtons[prov]) chipButtons[prov].scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  if (!zoneChanged) return;
  top_.querySelectorAll('.marker').forEach(m => m.classList.toggle('is-active', +m.dataset.zone === i));
  const m = top_.querySelector(`.marker[data-zone="${i}"]`); m.parentNode.appendChild(m);   // active marker on top
}

function bindMapEvents() {
  const zoneFrom = e => { const el = e.target.closest('[data-zone]'); return el ? +el.dataset.zone : -1; };
  const provFrom = e => { const el = e.target.closest('[data-prov]'); return el ? +el.dataset.prov : -1; };
  const hover = e => { if (State.view !== 'map') return; const i = zoneFrom(e); if (i >= 0) setActive(i, provFrom(e)); };
  const open = e => { const i = zoneFrom(e); if (i >= 0) { setActive(i, provFrom(e)); openStory(State.prov, e.detail === 0); } };   // detail 0 = keyboard activation
  top_.addEventListener('pointerover', hover);
  top_.addEventListener('click', open);
  $('#region-list').addEventListener('pointerover', hover);
  $('#region-list').addEventListener('focusin', hover);
  $('#region-list').addEventListener('click', open);
  // chips: first tap selects, second tap opens (touch has no hover)
  $('#chips').addEventListener('click', e => { const i = zoneFrom(e), pr = provFrom(e); if (i < 0) return; if (pr === State.prov) openStory(pr); else setActive(i, pr); });
  $('#region-list').addEventListener('keydown', e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const k = PROV_ORDER.indexOf(State.prov), n = (k + (e.key === 'ArrowDown' ? 1 : -1) + PROV_ORDER.length) % PROV_ORDER.length;
    regionButtons[PROV_ORDER[n]].focus();
  });
}

/* =====================================================================
   12. STORIES — slider with drag, momentum, rubber band and snapping
   Runs left → right: drag left (or press →) for the next story.
   pos = distance scrolled from the left edge.
   ===================================================================== */
const Stories = (() => {
  const viewEl = $('#story-view'), track = $('#track'), cursor = $('#drag-cursor');
  const items = [];
  let pos = 0, snaps = [], maxPos = 0, index = 0, anim = null;
  let drag = null, wheelTimer = null, lastDragMoved = false;

  function miniMap(prov) {
    const [[x0, y0], [x1, y1]] = MAP.iranBBox;
    return `<svg class="mini" viewBox="${x0 - 4} ${y0 - 4} ${x1 - x0 + 8} ${y1 - y0 + 8}" aria-hidden="true">
      <use href="#def-iran" class="mi-iran"/><use href="#def-prov-${prov}" class="mi-zone"/></svg>`;
  }
  const badge = () => `<div class="badge" aria-hidden="true"><svg viewBox="0 0 100 100">
      <g class="spin"><text class="fit-ring" data-r="38"><textPath href="#badge-path">${MAP_LABELS.ring} · ${MAP_LABELS.ring} · ${MAP_LABELS.ring} · </textPath></text></g>
      <circle class="face" cx="50" cy="50" r="24"/><path class="plus" d="M43 50H57M50 43V57"/></svg></div>`;

  // stories follow the province list order; story n shows province PROV_ORDER[n]
  function build() {
    const total = PROV_ORDER.length, n = fa(pad2(total));
    PROV_ORDER.forEach((pi, k) => {
      const p = MAP.provinces[pi], r = REGIONS[p.zone], st = PROVINCE_STORIES[p.name];
      const slides = [st, ...(PROVINCE_GALLERY[p.name] || [])];
      const el = document.createElement('article');
      el.className = 'story';
      el.dataset.prov = pi;
      el.setAttribute('role', 'group');
      el.setAttribute('aria-roledescription', T('slide'));
      el.setAttribute('aria-label', `${fa(k + 1)} ${T('of')} ${fa(total)}: ${pName(p)}`);
      el.innerHTML = `
        <figure class="story-photo">
          <div class="wipe"><div class="wipe-inner">${slides.map((ph, i) => `<img class="slide${i ? '' : ' is-on'}" data-src="assets/prov/${ph.img}.webp" alt="${placeOf(ph)}" decoding="async"${ph.pos ? ` style="object-position:${ph.pos}"` : ''}>`).join('')}</div></div>
          <figcaption>${placeOf(st)}</figcaption>
          ${slides.length > 1 ? `<div class="slide-ui">
            <button type="button" class="slide-step" data-step="-1" aria-label="${T('prev')}"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <div class="slide-dots" role="tablist" aria-label="${T('photos')} ${pName(p)}">${slides.map((ph, i) => `<button type="button" role="tab" data-slide="${i}" aria-selected="${!i}" aria-label="${T('photo')} ${fa(i + 1)} ${T('of')} ${fa(slides.length)}: ${placeOf(ph)}"></button>`).join('')}</div>
            <button type="button" class="slide-step" data-step="1" aria-label="${T('next')}"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>` : ''}
        </figure>
        <div class="card" style="--card:${PROVINCE_COLORS[p.name][0]}" data-tone="${PROVINCE_COLORS[p.name][1]}">
          <div class="card-top rise" style="--k:0">
            <span class="counter">${fa(pad2(k + 1))}<i></i>${n}</span>
            <dl class="stats">
              <div><dt>${T('pop')}</dt><dd>${popText(PROVINCE_STATS[p.name][0])} <small>${T('people')}</small></dd></div>
              <div><dt>${T('area')}</dt><dd>${faNum(PROVINCE_STATS[p.name][1])} <small>${T('km2')}</small></dd></div>
            </dl>
          </div>
          <div class="card-map rise" style="--k:1">${miniMap(pi)}</div>
          <div class="card-body">
            <div class="category rise" style="--k:2">${rName(r)} · ${T('capital')}: ${IS_FA ? st.capital : EN.capitals[p.name]}</div>
            <h2 class="city rise" style="--k:3">${pName(p)}</h2>
            <p class="desc rise" style="--k:4">${IS_FA ? st.desc : EN.desc[p.name]}</p>
          </div>
          <div class="card-foot rise" style="--k:5">
            ${badge()}
            <div class="credit"><span class="coord-line">${coord(p.lonlat)}</span><br><span class="photo-credit">${photoCredit(st)}</span></div>
          </div>
        </div>`;
      track.appendChild(el);
      const imgs = [...el.querySelectorAll('img.slide')];
      items.push({ el, prov: pi, photoBox: el.querySelector('.story-photo'), inner: el.querySelector('.wipe-inner'), img: imgs[0],
        slides: imgs, data: slides, cur: 0, cap: el.querySelector('figcaption'), credit: el.querySelector('.photo-credit'), dots: [...el.querySelectorAll('[data-slide]')] });
    });
  }

  // ---------- photo slideshow inside each story (crossfade, autoplay on the open story) ----------
  const SLIDE_MS = 5000;
  let slideTimer = 0;
  const loadImg = im => { if (im && !im.src) im.src = im.dataset.src; };
  function showSlide(it, n) {
    const len = it.slides.length; if (len < 2) return;
    n = (n + len) % len;
    loadImg(it.slides[n]); loadImg(it.slides[(n + 1) % len]);
    it.slides.forEach((im, j) => im.classList.toggle('is-on', j === n));
    it.dots.forEach((d, j) => d.setAttribute('aria-selected', j === n));
    it.cap.textContent = placeOf(it.data[n]);
    it.credit.textContent = photoCredit(it.data[n]);
    it.cur = n;
  }
  function autoplay() {
    clearTimeout(slideTimer);
    if (reduceMotion.matches) return;
    slideTimer = setTimeout(() => {
      const it = items[index];
      if (State.view === 'story' && it && !document.hidden) showSlide(it, it.cur + 1);
      autoplay();
    }, SLIDE_MS);
  }

  // photos load only around the current story
  function loadAround(i) {
    for (let j = i - 1; j <= i + 2; j++) {
      const it = items[j]; if (!it || it.img.src) continue;
      it.img.src = it.img.dataset.src;
    }
  }

  function layout() {
    if (!items.length) return;
    snaps = items.map(it => it.el.offsetLeft);
    maxPos = snaps[snaps.length - 1];
    pos = snaps[index] || 0;
    render();
  }

  const rubberDist = d => { const c = .55, dim = viewEl.clientWidth || 1000; return (1 - 1 / (d * c / dim + 1)) * dim; };
  const rubber = p => (p < 0 ? -rubberDist(-p) : p > maxPos ? maxPos + rubberDist(p - maxPos) : p);

  function render() {
    track.style.transform = `translate3d(${(-pos).toFixed(2)}px,0,0)`;
    const vw = viewEl.clientWidth;
    items.forEach((it, i) => {
      const start = snaps[i] - pos, w = it.photoBox.offsetWidth;   // distance from the viewport's left edge
      const visible = start < vw && start + w > -w;
      if (!visible || reduceMotion.matches) return;
      const p = clamp(start / vw, -1.5, 1.5);
      it.inner.style.transform = `translate3d(${(-p * w * .06).toFixed(2)}px,0,0)`;
    });
  }

  function nearest(p) {
    let best = 0; snaps.forEach((s, i) => { if (Math.abs(s - p) < Math.abs(snaps[best] - p)) best = i; });
    return best;
  }

  function setIndex(i) {
    index = i;
    loadAround(i);
    if (items[i]) loadImg(items[i].slides[1]);
    autoplay();
    items.forEach((it, j) => {
      if (j === i || j === i + 1) it.el.classList.add('is-in');
      it.el.setAttribute('aria-hidden', j === i ? 'false' : 'true');
    });
  }

  function animateTo(target, dur = 900) {
    cancelAnimationFrame(anim);
    if (reduceMotion.matches) dur = 1;
    const from = pos, t0 = performance.now();
    const step = now => {
      const t = clamp((now - t0) / dur, 0, 1);
      pos = from + (target - from) * easeOutExpo(t);
      render();
      if (t < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  function goTo(i, dur) { i = clamp(i, 0, items.length - 1); setIndex(i); animateTo(snaps[i], dur); }

  // ---------- pointer dragging (drag left → next story) ----------
  function onDown(e) {
    if (e.button !== 0 || State.view !== 'story' || e.target.closest('.slide-ui')) return;
    cancelAnimationFrame(anim);
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, start: pos, moved: false, axis: null, samples: [{ x: e.clientX, t: e.timeStamp }] };
    cursor.classList.add('is-down');
  }
  function onMove(e) {
    moveCursor(e);
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (drag.axis === 'y') { drag = null; cursor.classList.remove('is-down'); return; }   // let vertical gestures through
      viewEl.setPointerCapture(e.pointerId);
    }
    drag.moved = true;
    pos = rubber(drag.start - dx);
    drag.samples.push({ x: e.clientX, t: e.timeStamp });
    if (drag.samples.length > 6) drag.samples.shift();
    render();
  }
  function onUp(e) {
    cursor.classList.remove('is-down');
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    if (!d.moved) return;
    const a = d.samples[0], b = d.samples[d.samples.length - 1];
    const v = b.t > a.t ? -(b.x - a.x) / (b.t - a.t) : 0;     // px/ms in track direction
    const projected = pos + v * 260;                            // momentum
    let i = nearest(clamp(projected, 0, maxPos));
    if (i === index && Math.abs(pos - snaps[index]) > 50 && Math.abs(v) > .05) i = index + Math.sign(v);
    goTo(clamp(i, index - 2, index + 2));
  }

  function onWheel(e) {
    if (State.view !== 'story') return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!d) return;
    e.preventDefault();
    cancelAnimationFrame(anim);
    pos = rubber(clamp(pos + d, -200, maxPos + 200));
    render();
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => goTo(nearest(clamp(pos, 0, maxPos))), 140);
  }

  function moveCursor(e) {
    if (!finePointer.matches || e.pointerType !== 'mouse') return;
    cursor.style.setProperty('--x', e.clientX + 'px');
    cursor.style.setProperty('--y', e.clientY + 'px');
  }
  function bind() {
    viewEl.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', e => { lastDragMoved = !!(drag && drag.moved); onUp(e); setTimeout(() => (lastDragMoved = false), 0); });
    window.addEventListener('pointercancel', onUp);
    viewEl.addEventListener('click', e => { if (lastDragMoved) { e.stopPropagation(); e.preventDefault(); } }, true);
    viewEl.addEventListener('wheel', onWheel, { passive: false });
    viewEl.addEventListener('click', e => {
      const d = e.target.closest('[data-slide], [data-step]'); if (!d) return;
      const it = items.find(x => x.el === d.closest('.story')); if (!it) return;
      showSlide(it, d.dataset.step ? it.cur + +d.dataset.step : +d.dataset.slide); autoplay();
    });
    // over the photo controls the normal pointer comes back instead of the round "drag" cursor
    viewEl.addEventListener('pointerover', e => {
      if (!finePointer.matches || e.pointerType !== 'mouse' || State.view !== 'story') return;
      const onUi = !!e.target.closest('.slide-ui');
      cursor.classList.toggle('is-on', !onUi); viewEl.classList.toggle('cursor-hidden', !onUi);
    });
    viewEl.addEventListener('dragstart', e => e.preventDefault());
    viewEl.addEventListener('pointerenter', e => {
      if (!finePointer.matches || e.pointerType !== 'mouse' || State.view !== 'story') return;
      moveCursor(e); cursor.classList.add('is-on'); viewEl.classList.add('cursor-hidden');
    });
    viewEl.addEventListener('pointerleave', () => { cursor.classList.remove('is-on'); viewEl.classList.remove('cursor-hidden'); });
  }

  function enter(prov) {
    const i = Math.max(0, items.findIndex(it => it.prov === prov));
    index = i;
    loadAround(i);
    layout();
    items.forEach(it => it.el.classList.remove('is-in'));
    setTimeout(() => setIndex(i), reduceMotion.matches ? 0 : 450);
  }

  return { build, layout, bind, enter, goTo, get index() { return index; }, get prov() { return items[index] ? items[index].prov : -1; } };
})();

/* =====================================================================
   13. VIEW TRANSITIONS
   ===================================================================== */
const app = $('.app');
let lastFocus = null;

function openStory(i, viaKeyboard = false) {
  if (State.view === 'story') return;
  lastFocus = document.activeElement;
  State.view = 'story';
  Stories.enter(i);
  app.dataset.view = 'story';
  $('#story-view').setAttribute('aria-hidden', 'false');
  $('#map-view').setAttribute('aria-hidden', 'true');
  $('#map-view').inert = true;
  setTimeout(() => $('#back').focus({ preventScroll: true, focusVisible: viaKeyboard }), 60);   // no focus ring after a mouse click
}

function closeStory() {
  if (State.view !== 'story') return;
  State.view = 'map';
  app.dataset.view = 'map';
  $('#story-view').setAttribute('aria-hidden', 'true');
  $('#map-view').removeAttribute('aria-hidden');
  $('#map-view').inert = false;
  $('#drag-cursor').classList.remove('is-on');
  const sp = Stories.prov; setActive(MAP.provinces[sp].zone, sp);   // back on the province of the last story
  const target = mobileMQ.matches ? chipButtons[State.prov] : regionButtons[State.prov];
  (target || lastFocus)?.focus({ preventScroll: true });
}

function bindGlobal() {
  $('#back').addEventListener('click', closeStory);
  document.addEventListener('keydown', e => {
    if ($('#credits').open) return;
    if (State.view === 'story') {
      if (e.key === 'ArrowRight') { e.preventDefault(); Stories.goTo(Stories.index + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); Stories.goTo(Stories.index - 1); }
      else if (e.key === 'Escape') { e.preventDefault(); closeStory(); }
    }
  });

  const dlg = $('#credits'), list = $('#credits-list');
  const entries = [...Object.values(PROVINCE_STORIES), ...Object.values(PROVINCE_GALLERY).flat(), ...PHOTOS.map((ph, i) => ({ ...ph, place: IS_FA ? ph.place : EN.grid[i] }))];
  list.innerHTML = entries.map(p => `<li>${placeOf(p)} — <bdi>${p.by}</bdi>${IS_FA ? '،' : ','} <a href="${p.url}" target="_blank" rel="noopener"><bdi>${p.lic}</bdi></a></li>`).join('');
  $('#open-credits').addEventListener('click', () => dlg.showModal());
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.hasAttribute('data-close')) dlg.close(); });

  let raf = 0;
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { layout(); justifyHeadline(); }); });
  mobileMQ.addEventListener('change', layout);
}


/* The Star link is always shown. If the GitHub request works, the live count is added after it. */
function loadStars() {
  fetch('https://api.github.com/repos/HamzehGhoreyshi/interactive-iran-map')
    .then(r => (r.ok ? r.json() : Promise.reject()))
    .then(repo => {
      $('.star-count').textContent = `Star · ${repo.stargazers_count}`;   // live count once the repo is public
    })
    .catch(() => {});
}


/* Headline: two lines stretched to the same width.
   1) a kashida (ـ) at the hand-picked joins: استـان، سـراسر، ایـران
   2) more kashidas, round-robin over each line's joins, until the line reaches the widest line
   3) the last few pixels go into word-spacing, so all three lines end exactly flush */
const HEADLINE = [
  { parts: ['<em>سی‌ویک</em> است', 'ان'], base: [0], order: [0] },
  { parts: ['در س', 'راسر ای', 'ران'], base: [0, 1], order: [1, 0] },
];
const KASHIDA = '\u0640';
const MAX_KASHIDA = 4;
function justifyHeadline() {
  const spans = [...document.querySelectorAll('#headline .hl')];
  if (!spans.length) return;
  if (!IS_FA) { spans[0].innerHTML = '<em>31</em> provinces'; spans[1].innerHTML = 'across Iran'; return; }   // kashida is Persian-only
  const counts = HEADLINE.map(l => l.base.slice());
  const paint = i => {
    const l = HEADLINE[i];
    spans[i].innerHTML = l.parts.map((p, j) => p + (j < counts[i].length ? KASHIDA.repeat(counts[i][j]) : '')).join('');
    spans[i].style.wordSpacing = '';
  };
  HEADLINE.forEach((_, i) => paint(i));
  const width = i => spans[i].getBoundingClientRect().width;
  const target = Math.max(...spans.map((_, i) => width(i)));
  HEADLINE.forEach((l, i) => {
    for (let n = 0; n < 40 && width(i) < target - 0.5; n++) {
      const slot = l.order[n % l.order.length];
      if (counts[i][slot] >= MAX_KASHIDA) break;   // keep each stretch short; the rest goes to word-spacing
      counts[i][slot]++; paint(i);
      if (width(i) > target + 0.5) { counts[i][slot]--; paint(i); break; }
    }
    const spaces = (spans[i].textContent.match(/ /g) || []).length;
    const rest = target - width(i);
    if (spaces && rest > 0.5) spans[i].style.wordSpacing = (rest / spaces / (spans[i].getBoundingClientRect().width / spans[i].offsetWidth || 1)).toFixed(2) + 'px';
  });
}

/* =====================================================================
   14. BOOT
   ===================================================================== */
/* static page text in the current language */
function applyStatic() {
  const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  document.title = T('title');
  $('meta[name="description"]').setAttribute('content', T('metaDesc'));
  set('.brand b', T('brand')); set('.brand span', T('brandSub'));
  set('.eyebrow', T('eyebrow'));
  $('#headline').setAttribute('aria-label', T('headlineLabel'));
  set('.intro .lede', `${T('intro')}<span class="more">${T('introMore')}</span>`);
  set('#coord-label', T('region')); set('.coords .k-tehran', T('tehran'));
  set('.regions h2', T('pick'));
  ['.regions', '#chips'].forEach(s => $(s).setAttribute('aria-label', T('pick')));
  set('.hint', T('hint')); set('.foot span', T('footCount')); set('#open-credits', T('credits'));
  $('#story-view').setAttribute('aria-label', T('stories')); $('#story-view').setAttribute('aria-roledescription', T('slider'));
  set('#back .txt', T('back'));
  set('#drag-cursor', `<span>‹</span>${T('drag')}<span>›</span>`);
  $('#credits .close').setAttribute('aria-label', T('close'));
  set('#credits-title', T('credits')); set('#credits .credits-text', T('creditsText')); set('#credits .map-data', T('mapData'));
  $('#map-top').setAttribute('aria-label', T('mapLabel'));
  // language switch
  const box = $('#lang');
  $('#langFlag').innerHTML = FLAGS[LANG];
  $('#langBtn').setAttribute('aria-label', T('language'));
  box.querySelectorAll('.lang-item').forEach(b => {
    const code = b.dataset.lang;
    b.querySelector('.flag').innerHTML = FLAGS[code];
    b.querySelector('.ln').textContent = T('langNames')[code];
    b.classList.toggle('on', code === LANG);
  });
  $('#langBtn').addEventListener('click', e => { e.stopPropagation(); box.classList.toggle('open'); });
  box.querySelectorAll('.lang-item').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); if (b.dataset.lang !== LANG) setLang(b.dataset.lang); else box.classList.remove('open'); }));
  document.addEventListener('click', () => box.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') box.classList.remove('open'); });
}

function boot() {
  applyStatic();
  Media.init();
  buildMap();
  buildRegionUI();
  Stories.build();
  Stories.bind();
  bindMapEvents();
  bindGlobal();
  loadStars();
  layout();
  setActive(0);                                        // Caspian region, Mazandaran (Sari) by default
  fitRings();
  requestAnimationFrame(() => top_.classList.add('is-ready'));
  setTimeout(() => top_.classList.remove('is-drawing'), reduceMotion.matches ? 0 : 2900);
  justifyHeadline();
  if (document.fonts) document.fonts.ready.then(() => { layout(); fitRings(); justifyHeadline(); });
}
boot();
