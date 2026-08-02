export type LangCode =
  | "en" | "ur" | "ar" | "bn" | "id" | "tr" | "fr" | "ru" | "es" | "hi" | "ta" | "ml" | "fa";

export type Language = {
  code: LangCode;
  label: string;
  native: string;
  quranEdition: string;
  tafsirSlug: string;
  hadithPrefix: string;
  /** BCP-47 tag used for speech synthesis / recognition */
  speech: string;
  rtl?: boolean;
};

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", native: "English", quranEdition: "en.sahih", tafsirSlug: "en-tafisr-ibn-kathir", hadithPrefix: "eng", speech: "en-US" },
  { code: "ur", label: "Urdu", native: "اردو", quranEdition: "ur.jalandhry", tafsirSlug: "ur-tafseer-ibn-e-kaseer", hadithPrefix: "urd", speech: "ur-PK", rtl: true },
  { code: "ar", label: "Arabic", native: "العربية", quranEdition: "ar.muyassar", tafsirSlug: "ar-tafsir-ibn-kathir", hadithPrefix: "ara", speech: "ar-SA", rtl: true },
  { code: "bn", label: "Bengali", native: "বাংলা", quranEdition: "bn.bengali", tafsirSlug: "bn-tafseer-ibn-e-kaseer", hadithPrefix: "ben", speech: "bn-BD" },
  { code: "id", label: "Indonesian", native: "Indonesia", quranEdition: "id.indonesian", tafsirSlug: "indonesian-mokhtasar", hadithPrefix: "ind", speech: "id-ID" },
  { code: "tr", label: "Turkish", native: "Türkçe", quranEdition: "tr.diyanet", tafsirSlug: "tr-tafsir-ibne-kathir", hadithPrefix: "tur", speech: "tr-TR" },
  { code: "fr", label: "French", native: "Français", quranEdition: "fr.hamidullah", tafsirSlug: "french-mokhtasar", hadithPrefix: "fra", speech: "fr-FR" },
  { code: "ru", label: "Russian", native: "Русский", quranEdition: "ru.kuliev", tafsirSlug: "ru-tafsir-ibne-kahtir", hadithPrefix: "rus", speech: "ru-RU" },
  { code: "es", label: "Spanish", native: "Español", quranEdition: "es.cortes", tafsirSlug: "spanish-mokhtasar", hadithPrefix: "eng", speech: "es-ES" },
  { code: "hi", label: "Hindi", native: "हिन्दी", quranEdition: "hi.hindi", tafsirSlug: "hindi-mokhtasar", hadithPrefix: "eng", speech: "hi-IN" },
  { code: "ta", label: "Tamil", native: "தமிழ்", quranEdition: "ta.tamil", tafsirSlug: "tamil-mokhtasar", hadithPrefix: "tam", speech: "ta-IN" },
  { code: "ml", label: "Malayalam", native: "മലയാളം", quranEdition: "ml.abdulhameed", tafsirSlug: "malayalam-mokhtasar", hadithPrefix: "eng", speech: "ml-IN" },
  { code: "fa", label: "Persian", native: "فارسی", quranEdition: "fa.ansarian", tafsirSlug: "persian-mokhtasar", hadithPrefix: "ara", speech: "fa-IR", rtl: true },
];

export const LANG_NAMES: Record<string, string> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l.label]),
);

export const getLanguage = (code: string): Language =>
  LANGUAGES.find((l) => l.code === code) ?? (LANGUAGES[0] as Language);

/**
 * Every reciter below is verified against the islamic.network ayah-audio CDN,
 * including the exact bitrate folder the recitation is published in — this is
 * why switching reciters now always plays.
 */
export type Reciter = { id: string; name: string; style: string; bitrate: 32 | 64 | 128 | 192 };

export const RECITERS: Reciter[] = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy", style: "Murattal", bitrate: 128 },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary", style: "Murattal", bitrate: 128 },
  { id: "ar.husarymujawwad", name: "Al-Husary", style: "Mujawwad", bitrate: 128 },
  { id: "ar.minshawi", name: "Mohamed Siddiq Al-Minshawi", style: "Murattal", bitrate: 128 },
  { id: "ar.minshawimujawwad", name: "Al-Minshawi", style: "Mujawwad", bitrate: 64 },
  { id: "ar.mahermuaiqly", name: "Maher Al Muaiqly", style: "Murattal", bitrate: 128 },
  { id: "ar.hudhaify", name: "Ali Al-Hudhaify", style: "Murattal", bitrate: 128 },
  { id: "ar.shaatree", name: "Abu Bakr Ash-Shaatree", style: "Murattal", bitrate: 128 },
  { id: "ar.ahmedajamy", name: "Ahmed ibn Ali Al-Ajamy", style: "Murattal", bitrate: 128 },
  { id: "ar.muhammadayyoub", name: "Muhammad Ayyoub", style: "Murattal", bitrate: 128 },
  { id: "ar.muhammadjibreel", name: "Muhammad Jibreel", style: "Murattal", bitrate: 128 },
  { id: "ar.abdurrahmaansudais", name: "Abdul Rahman As-Sudais", style: "Murattal", bitrate: 64 },
  { id: "ar.abdulbasitmurattal", name: "Abdul Basit Abdus-Samad", style: "Murattal", bitrate: 64 },
  { id: "ar.abdulsamad", name: "Abdul Basit", style: "Mujawwad", bitrate: 64 },
  { id: "ar.saoodshuraym", name: "Saud Ash-Shuraim", style: "Murattal", bitrate: 64 },
  { id: "ar.hanirifai", name: "Hani Ar-Rifai", style: "Murattal", bitrate: 64 },
  { id: "ar.abdullahbasfar", name: "Abdullah Basfar", style: "Murattal", bitrate: 64 },
  { id: "ar.aymanswoaid", name: "Ayman Suwaid", style: "Tajweed teaching", bitrate: 64 },
];

export const getReciter = (id: string): Reciter =>
  RECITERS.find((r) => r.id === id) ?? (RECITERS[0] as Reciter);

/** Hadith collections with the exact language editions the open API publishes. */
export type HadithBook = {
  id: string;
  name: string;
  arabic: string;
  count: string;
  langs: LangCode[];
};

export const HADITH_BOOKS: HadithBook[] = [
  { id: "bukhari", name: "Sahih al-Bukhari", arabic: "صحيح البخاري", count: "7,563", langs: ["ar", "en", "ur", "bn", "id", "tr", "fr", "ru", "ta"] },
  { id: "muslim", name: "Sahih Muslim", arabic: "صحيح مسلم", count: "7,470", langs: ["ar", "en", "ur", "bn", "id", "tr", "fr", "ru", "ta"] },
  { id: "abudawud", name: "Sunan Abu Dawud", arabic: "سنن أبي داود", count: "5,274", langs: ["ar", "en", "ur", "bn", "id", "tr", "fr", "ru"] },
  { id: "tirmidhi", name: "Jami' at-Tirmidhi", arabic: "جامع الترمذي", count: "3,956", langs: ["ar", "en", "ur", "bn", "id", "tr"] },
  { id: "nasai", name: "Sunan an-Nasa'i", arabic: "سنن النسائي", count: "5,761", langs: ["ar", "en", "ur", "bn", "id", "tr", "fr"] },
  { id: "ibnmajah", name: "Sunan Ibn Majah", arabic: "سنن ابن ماجه", count: "4,341", langs: ["ar", "en", "ur", "bn", "id", "tr", "fr"] },
  { id: "malik", name: "Muwatta Imam Malik", arabic: "موطأ مالك", count: "1,858", langs: ["ar", "en", "ur", "bn", "id", "tr", "fr"] },
  { id: "nawawi", name: "Forty Hadith an-Nawawi", arabic: "الأربعون النووية", count: "42", langs: ["ar", "en", "bn", "tr", "fr"] },
  { id: "qudsi", name: "Forty Hadith Qudsi", arabic: "الأربعون القدسية", count: "40", langs: ["ar", "en", "fr"] },
  { id: "dehlawi", name: "Forty Hadith Shah Waliullah", arabic: "الأربعون الدهلوي", count: "40", langs: ["ar", "en", "fr"] },
];

/** Collections with no free open API yet — shown with an honest note. */
export const HADITH_PENDING = [
  "Musnad Ahmad", "Mishkat al-Masabih", "As-Silsila as-Sahiha", "Al-Mustadrak al-Hakim",
  "Sunan ad-Darimi", "Majma' az-Zawa'id", "Sahih Ibn Khuzaymah", "Sahih Ibn Hibban",
  "Musannaf Ibn Abi Shaybah", "Sunan al-Bayhaqi",
];

export const TAJWEED_RULES = [
  { title: "Noon Saakin & Tanween", rules: ["Izhaar — clear pronunciation before throat letters ء ه ع ح غ خ", "Idghaam — merging into ي ر م ل و ن", "Iqlaab — noon becomes meem before ب", "Ikhfaa — hidden nasal sound before the remaining 15 letters"] },
  { title: "Meem Saakin", rules: ["Ikhfaa Shafawi — before ب", "Idghaam Shafawi — before م", "Izhaar Shafawi — before all other letters"] },
  { title: "Madd (Elongation)", rules: ["Madd Asli — 2 counts", "Madd Muttasil — 4-5 counts", "Madd Munfasil — 2-5 counts", "Madd Laazim — 6 counts", "Madd Aaridh lis-Sukoon — 2, 4 or 6 counts when stopping"] },
  { title: "Waqf — Rules of Stopping", rules: ["مـ Laazim — compulsory stop", "ط Mutlaq — absolute stop", "ج Jaaiz — permissible stop", "قلى — stopping is better", "صلى — continuing is better", "لا — do not stop", "∴ ∴ Mu'anaqah — stop at one of the two only"] },
  { title: "Qalqalah (Echo)", rules: ["Letters: ق ط ب ج د", "Sughra — echo in the middle of a word", "Kubra — stronger echo when stopping"] },
  { title: "Makharij — Points of Articulation", rules: ["Al-Jawf — the empty space (madd letters ا و ي)", "Al-Halq — the throat (ء ه ع ح غ خ)", "Al-Lisan — the tongue, 18 letters", "Ash-Shafatan — the two lips (ف ب م و)", "Al-Khayshoom — the nasal passage (ghunnah)"] },
];

/** Complete rak'ah table — farz, sunnah mu'akkadah, ghayr mu'akkadah, witr and nafl. */
export const RAKAH_TABLE = [
  { prayer: "Fajr", sunnahBefore: "2 Sunnah Mu'akkadah", farz: "2 Farz", sunnahAfter: "—", extra: "Praying the 2 sunnah of Fajr is emphasised above all other nawafil" },
  { prayer: "Zuhr", sunnahBefore: "4 Sunnah Mu'akkadah", farz: "4 Farz", sunnahAfter: "2 Sunnah Mu'akkadah + 2 Nafl", extra: "On Friday, Zuhr is replaced by Jumu'ah for men attending the masjid" },
  { prayer: "Asr", sunnahBefore: "4 Sunnah Ghayr Mu'akkadah", farz: "4 Farz", sunnahAfter: "—", extra: "No nafl after Asr until Maghrib" },
  { prayer: "Maghrib", sunnahBefore: "—", farz: "3 Farz", sunnahAfter: "2 Sunnah Mu'akkadah + 2 Nafl", extra: "Salatul Awwabeen — 6 rak'ah nafl after Maghrib" },
  { prayer: "Isha", sunnahBefore: "4 Sunnah Ghayr Mu'akkadah", farz: "4 Farz", sunnahAfter: "2 Sunnah Mu'akkadah + 2 Nafl", extra: "Then 3 Witr Wajib, then 2 Nafl" },
  { prayer: "Witr", sunnahBefore: "—", farz: "3 Wajib (Hanafi) / Sunnah Mu'akkadah (Shafi'i)", sunnahAfter: "—", extra: "Dua-e-Qunoot is read in the third rak'ah" },
  { prayer: "Jumu'ah", sunnahBefore: "4 Sunnah Mu'akkadah", farz: "2 Farz with khutbah", sunnahAfter: "4 Sunnah Mu'akkadah + 2 Sunnah + 2 Nafl", extra: "Ghusl, miswak, clean clothes, early attendance and Surah al-Kahf are sunnah" },
  { prayer: "Eid ul-Fitr / Eid ul-Adha", sunnahBefore: "—", farz: "2 Wajib with 6 extra takbeers", sunnahAfter: "Khutbah after the salah", extra: "No adhan and no iqamah for Eid" },
  { prayer: "Taraweeh", sunnahBefore: "—", farz: "20 rak'ah Sunnah Mu'akkadah", sunnahAfter: "Witr after Taraweeh", extra: "Prayed in Ramadan after Isha in sets of two" },
  { prayer: "Tahajjud", sunnahBefore: "—", farz: "2 to 12 rak'ah Nafl", sunnahAfter: "—", extra: "The most beloved nafl prayer, in the last third of the night" },
  { prayer: "Ishraq / Duha / Chasht", sunnahBefore: "—", farz: "2 to 12 rak'ah Nafl", sunnahAfter: "—", extra: "After sunrise (Ishraq) and mid-morning (Duha)" },
  { prayer: "Salatul Janazah", sunnahBefore: "—", farz: "Farz Kifayah — 4 takbeers, no ruku or sujood", sunnahAfter: "—", extra: "Performed standing, in congregation" },
  { prayer: "Salatul Musafir", sunnahBefore: "Sunnah may be left", farz: "Zuhr, Asr, Isha shortened to 2 Farz", sunnahAfter: "—", extra: "For a journey of about 78 km or more" },
  { prayer: "Salatul Istikhara / Hajah / Tawbah", sunnahBefore: "—", farz: "2 rak'ah Nafl each", sunnahAfter: "—", extra: "Followed by the specific dua of that prayer" },
  { prayer: "Salatul Kusoof / Khusoof", sunnahBefore: "—", farz: "2 rak'ah Sunnah Mu'akkadah", sunnahAfter: "—", extra: "At a solar or lunar eclipse" },
  { prayer: "Salatul Istisqa", sunnahBefore: "—", farz: "2 rak'ah Sunnah", sunnahAfter: "Khutbah and dua", extra: "Prayer seeking rain" },
  { prayer: "Qaza (missed prayers)", sunnahBefore: "—", farz: "Same farz count as the missed prayer", sunnahAfter: "—", extra: "Made up as soon as one remembers; only Fajr sunnah is made up with it before Zawal" },
];

export const IBADAAT_SECTIONS = [
  {
    id: "taharah",
    title: "Taharah — Purification",
    summary: "Wudu, Ghusl, Tayammum, Istinja, najasat and the rulings of menstruation.",
    items: [
      { h: "Wudu — step by step", b: "1) Niyyah and Bismillah. 2) Wash both hands to the wrists three times. 3) Rinse the mouth three times (miswak is sunnah). 4) Sniff water into the nose and blow out three times. 5) Wash the whole face three times. 6) Wash the right arm to the elbow three times, then the left. 7) Wipe the whole head once (masah), then the ears with the same wetness. 8) Wash the right foot to the ankle three times, then the left. Dua after wudu: أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ" },
      { h: "Fard of Wudu", b: "Four: washing the face, washing both arms including the elbows, wiping one quarter of the head, washing both feet including the ankles." },
      { h: "What breaks Wudu", b: "Anything leaving the front or back passage, flowing blood or pus, vomiting a mouthful, deep sleep lying down, loss of consciousness, and laughing aloud inside salah." },
      { h: "Ghusl — the full bath", b: "Fard acts: rinsing the mouth, sniffing water into the nose, and pouring water over the entire body so no hair root stays dry. Sunnah method: niyyah, wash hands, wash the private parts, remove impurity, perform a full wudu, pour water over the head three times, then the right side, then the left, and rub the body." },
      { h: "When Ghusl is obligatory", b: "After janabah (marital relations or discharge with desire), after the end of menstruation (hayd) and post-natal bleeding (nifas), and for a deceased Muslim. Ghusl is sunnah for Jumu'ah, the two Eids, ihram and after washing a body." },
      { h: "Tayammum — dry purification", b: "When water is unavailable, out of reach, or harmful due to illness: make intention, strike both palms on clean earth/dust/stone, wipe the whole face, strike again and wipe the right arm to the elbow, then the left. It is broken by whatever breaks wudu and by water becoming available." },
      { h: "Istinja & cleanliness", b: "Cleaning after relieving oneself with water, or with an odd number of dry cleansing materials. Entering the toilet with the left foot and leaving with the right, and reciting اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِث before entering." },
      { h: "Hayd, Nifas & Istihadah", b: "Hayd: 3–10 days (Hanafi). Nifas: up to 40 days. During both, salah is not performed and not made up, fasting is left and made up later, and tawaf and touching the mushaf are avoided. Istihadah (irregular bleeding) is an excuse — one performs wudu for each prayer time and prays normally." },
      { h: "Masah on socks (Khuffain)", b: "A resident may wipe over leather socks for 24 hours, a traveller for 72 hours, starting from the first breaking of wudu after wearing them on complete purity." },
    ],
  },
  {
    id: "salah",
    title: "Salah (Namaz)",
    summary: "Conditions, complete method, every rak'ah count, adhan, jama'ah, sajda sahw and qaza.",
    items: [
      { h: "Conditions before Salah", b: "Purity of body, clothing and place; covering the awrah (navel to knee for men, whole body except face, hands and feet for women); facing the Qiblah; the time of that prayer having entered; and intention (niyyah)." },
      { h: "Complete method", b: "Takbeer Tahrimah (Allahu Akbar with hands raised) → Thana (Subhanakallahumma…) → Ta'awwudh and Tasmiyah → Surah al-Fatiha → any surah → Ruku with Subhana Rabbiyal Adheem ×3 → Qawmah (Sami' Allahu liman hamidah / Rabbana lakal hamd) → Sujood with Subhana Rabbiyal A'la ×3 → Jalsah → second Sujood → next rak'ah → Tashahhud → Durood Ibrahim → Dua Masura → Salaam right then left." },
      { h: "Fard acts inside Salah", b: "Takbeer Tahrimah, Qiyam (standing), Qira'ah (recitation), Ruku, both Sujood, and the final Qa'dah for the length of Tashahhud." },
      { h: "Wajib acts & Sajda Sahw", b: "Reciting al-Fatiha, adding a surah in the first two rak'ah of farz, sitting for the first Qa'dah, Tashahhud, and Salaam are wajib. Leaving a wajib forgetfully requires Sajda Sahw: two extra sujood after the final Tashahhud followed by Tashahhud, Durood and Salaam." },
      { h: "Things that break Salah", b: "Speaking, eating or drinking, excessive movement, laughing aloud, turning the chest away from the Qiblah, losing wudu, and reciting with a meaning-changing mistake." },
      { h: "Adhan & Iqamah", b: "The adhan is called before every farz prayer, answered word by word by the listener, followed by Durood and the Dua after Adhan. The iqamah is the same words said faster with قَدْ قَامَتِ الصَّلَاة twice." },
      { h: "Praying in Jama'ah", b: "Congregation multiplies the reward by 27. Straighten the rows, stand shoulder to shoulder, follow the imam and never precede him. A latecomer (masbooq) joins immediately and completes the missed rak'ah after the imam's salaam." },
      { h: "Dua-e-Qunoot (Witr)", b: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ… recited in the third rak'ah of Witr after raising the hands and saying takbeer." },
    ],
  },
  {
    id: "sawm",
    title: "Sawm (Fasting)",
    summary: "Ramadan, its rulings, what breaks the fast, Sehri, Iftar, I'tikaf and Zakat ul-Fitr.",
    items: [
      { h: "Definition", b: "Abstaining from food, drink and marital relations from true dawn (Subh Sadiq) until sunset, with the intention of worship." },
      { h: "Sehri & Iftar duas", b: "Sehri: وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَان — Iftar: اللَّهُمَّ إِنِّى لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ" },
      { h: "What breaks the fast", b: "Intentional eating or drinking, marital relations, deliberate vomiting a mouthful, smoking, and the onset of menstruation. Eating out of forgetfulness does not break the fast." },
      { h: "What does not break the fast", b: "Unintentional swallowing of saliva or dust, using miswak, applying oil or kohl, taking a bath, injections that are not nutritional, and bleeding." },
      { h: "Fidyah & Kaffarah", b: "Fidyah: feeding one poor person for each missed fast when permanently unable to fast. Kaffarah: sixty consecutive fasts, or feeding sixty poor people, for deliberately breaking a Ramadan fast without a valid excuse." },
      { h: "I'tikaf & Laylatul Qadr", b: "Seclusion in the masjid during the last ten nights of Ramadan, seeking the Night of Decree, which is better than a thousand months. Its dua: اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي" },
      { h: "Zakat ul-Fitr", b: "Given by every Muslim who owns the nisab, on behalf of himself and his dependants, before the Eid prayer — approximately 2.25 kg of wheat or its value." },
      { h: "Voluntary fasts", b: "Mondays and Thursdays, the three white days (13, 14, 15 of each lunar month), Ashura with the 9th of Muharram, Arafah for non-pilgrims, and six days of Shawwal." },
    ],
  },
  {
    id: "hajj",
    title: "Hajj",
    summary: "Day-by-day rites, pillars, wajibaat, types of Hajj and common mistakes.",
    items: [
      { h: "Types of Hajj", b: "Ifrad — Hajj only. Tamattu' — Umrah then Hajj with a new ihram, requiring a sacrifice. Qiran — Umrah and Hajj in one ihram, also requiring a sacrifice." },
      { h: "8 Dhul Hijjah — Yawm at-Tarwiyah", b: "Enter ihram, recite the Talbiyah, proceed to Mina and pray Zuhr, Asr, Maghrib, Isha and Fajr there, each in its own time and shortened." },
      { h: "9 Dhul Hijjah — Arafah", b: "Stay in Arafah from Zawal to sunset — the greatest pillar of Hajj. Combine Zuhr and Asr, make dua until sunset, then move to Muzdalifah for Maghrib and Isha combined and stay the night." },
      { h: "10 Dhul Hijjah — Yawm an-Nahr", b: "Rami of Jamarat al-Aqabah with seven pebbles, then Qurbani, then shaving or trimming, then Tawaf al-Ifadah and Sa'i." },
      { h: "11–13 Dhul Hijjah — Tashreeq", b: "Stone all three Jamarat each day after Zawal, then perform Tawaf al-Wida' before leaving Makkah." },
      { h: "Pillars (Arkan)", b: "Ihram, standing at Arafah, Tawaf al-Ifadah, and Sa'i between Safa and Marwah. Missing a pillar invalidates the Hajj." },
      { h: "Ihram restrictions", b: "No cutting hair or nails, no perfume, no stitched clothing for men, no covering the head for men or the face for women, no hunting, no marriage contract and no marital relations." },
    ],
  },
  {
    id: "umrah",
    title: "Umrah",
    summary: "The lesser pilgrimage — step by step.",
    items: [
      { h: "1. Ihram", b: "Ghusl, two white unstitched sheets for men, two rak'ah, intention and Talbiyah from the Miqat: لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ" },
      { h: "2. Tawaf", b: "Seven circuits of the Ka'bah beginning and ending at the Black Stone, with Idtiba and Raml for men in the first three circuits, then two rak'ah behind Maqam Ibrahim." },
      { h: "3. Sa'i", b: "Seven trips between Safa and Marwah, starting at Safa and ending at Marwah, with dua at each rise." },
      { h: "4. Halq or Taqsir", b: "Shaving the head or trimming the hair — the Umrah is complete and the ihram restrictions are lifted." },
      { h: "Visiting Madinah", b: "Not a rite of Umrah, but visiting Masjid an-Nabawi, sending salaam upon the Prophet ﷺ and praying in Riyadul Jannah is a great virtue." },
    ],
  },
  {
    id: "janazah",
    title: "Namaz-e-Janazah & Burial",
    summary: "Ghusl of the deceased, kafan, the funeral prayer, burial and ta'ziyah.",
    items: [
      { h: "Method of the prayer", b: "Four takbeers with no ruku or sujood. First takbeer: Thana. Second: Durood Ibrahim. Third: the dua for the deceased. Fourth: salaam to both sides. The imam stands at the chest of a man and the middle of a woman." },
      { h: "Dua for an adult", b: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا وَصَغِيرِنَا وَكَبِيرِنَا وَذَكَرِنَا وَأُنْثَانَا" },
      { h: "Dua for a child", b: "اللَّهُمَّ اجْعَلْهُ لَنَا فَرَطًا وَاجْعَلْهُ لَنَا أَجْرًا وَذُخْرًا وَاجْعَلْهُ لَنَا شَافِعًا وَمُشَفَّعًا" },
      { h: "Ghusl & Kafan", b: "The body is washed an odd number of times beginning with the right and the places of wudu, then shrouded in three white sheets for a man and five for a woman, perfumed without alcohol." },
      { h: "Burial", b: "The body is laid on its right side facing the Qiblah while reciting بِسْمِ اللَّهِ وَعَلَى مِلَّةِ رَسُولِ اللَّهِ. Three handfuls of earth are placed, and dua for steadfastness is made at the grave." },
      { h: "Ta'ziyah & mourning", b: "Consoling the family for three days is sunnah; wailing, tearing clothes and building over graves are forbidden. A widow observes iddah of four months and ten days." },
    ],
  },
  {
    id: "zakat",
    title: "Zakat & Charity",
    summary: "Nisab, calculation, the eight categories, sadaqah and qurbani.",
    items: [
      { h: "Nisab", b: "87.48 g of gold or 612.36 g of silver (or their cash value), owned in excess of one's needs for one full lunar year." },
      { h: "Rate", b: "2.5% of qualifying wealth: cash, bank balances, gold, silver, trade goods, shares and receivable loans." },
      { h: "Eight recipients", b: "The poor, the needy, those employed to collect it, those whose hearts are to be reconciled, freeing captives, the debt-ridden, in the path of Allah, and the stranded traveller." },
      { h: "Who may not be given Zakat", b: "Parents, grandparents, children, grandchildren, one's spouse, the wealthy, and the descendants of the Prophet ﷺ (Banu Hashim)." },
      { h: "Qurbani / Udhiyah", b: "Wajib upon every sane adult Muslim owning the nisab on the days of Eid ul-Adha: one goat or sheep, or one seventh of a cow or camel, slaughtered after the Eid prayer." },
    ],
  },
  {
    id: "aqeedah",
    title: "Iman & Aqeedah",
    summary: "The six articles of faith, five pillars, and the beautiful character of a Muslim.",
    items: [
      { h: "Five pillars of Islam", b: "Shahadah, Salah, Zakat, Sawm of Ramadan, and Hajj for whoever is able." },
      { h: "Six articles of Iman", b: "Belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree — both its good and its apparent evil." },
      { h: "Iman-e-Mufassal", b: "آمَنْتُ بِاللهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَالْقَدَرِ خَيْرِهِ وَشَرِّهِ مِنَ اللهِ تَعَالَى وَالْبَعْثِ بَعْدَ الْمَوْتِ" },
      { h: "Iman-e-Mujmal", b: "آمَنْتُ بِاللهِ كَمَا هُوَ بِأَسْمَائِهِ وَصِفَاتِهِ وَقَبِلْتُ جَمِيعَ أَحْكَامِهِ إِقْرَارٌ بِاللِّسَانِ وَتَصْدِيقٌ بِالْقَلْبِ" },
      { h: "Major sins to avoid", b: "Shirk, magic, killing a soul unjustly, consuming interest (riba), devouring an orphan's wealth, fleeing the battlefield, and slandering chaste believing women." },
      { h: "Rights over one another", b: "The rights of Allah, of parents, of the spouse, of children, of neighbours, of relatives, and of the general Muslim: greeting, visiting the sick, following the funeral, accepting invitations and giving sincere advice." },
    ],
  },
];

export const SHAHADAH = {
  arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ",
  transliteration: "Ash-hadu an lā ilāha illā Allāh, wa ash-hadu anna Muḥammadan rasūlu Allāh",
  english: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah.",
  urdu: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور محمد ﷺ اللہ کے رسول ہیں۔",
};

export const TASBEEH_PRESETS = [
  { name: "SubhanAllah", arabic: "سُبْحَانَ ٱللَّٰهِ", target: 33 },
  { name: "Alhamdulillah", arabic: "ٱلْحَمْدُ لِلَّٰهِ", target: 33 },
  { name: "Allahu Akbar", arabic: "ٱللَّٰهُ أَكْبَرُ", target: 34 },
  { name: "La ilaha illallah", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰه", target: 100 },
  { name: "Astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", target: 100 },
  { name: "Durood Shareef", arabic: "ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّد", target: 100 },
  { name: "SubhanAllahi wa bihamdihi", arabic: "سُبْحَانَ ٱللَّٰهِ وَبِحَمْدِهِ", target: 100 },
  { name: "La hawla wa la quwwata illa billah", arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ", target: 100 },
];

export type Dua = { cat: string; title: string; ar: string; tr: string; en: string };

export const DUAS: Dua[] = [
  { cat: "Daily", title: "Before eating", ar: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ", tr: "Bismillahi wa 'ala barakatillah", en: "In the name of Allah and with the blessings of Allah." },
  { cat: "Daily", title: "After eating", ar: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", tr: "Alhamdulillahil-ladhi at'amana wa saqana wa ja'alana muslimeen", en: "Praise be to Allah who fed us, gave us drink and made us Muslims." },
  { cat: "Daily", title: "Before sleeping", ar: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا", tr: "Allahumma bismika amootu wa ahya", en: "O Allah, in Your name I die and I live." },
  { cat: "Daily", title: "Waking up", ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", tr: "Alhamdulillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushoor", en: "Praise be to Allah who gave us life after death, and to Him is the resurrection." },
  { cat: "Daily", title: "Wearing new clothes", ar: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", tr: "Alhamdulillahil-ladhi kasani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah", en: "Praise be to Allah who clothed me with this and provided it for me with no power or might from myself." },
  { cat: "Daily", title: "Leaving the house", ar: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", tr: "Bismillahi tawakkaltu 'alallah wa la hawla wa la quwwata illa billah", en: "In the name of Allah, I place my trust in Allah, and there is no power nor might except with Allah." },
  { cat: "Daily", title: "Entering the toilet", ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", tr: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith", en: "O Allah, I seek refuge in You from all evil and evil beings." },
  { cat: "Daily", title: "Looking in the mirror", ar: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي", tr: "Allahumma kama hassanta khalqi fa hassin khuluqi", en: "O Allah, as You have made my form beautiful, make my character beautiful too." },
  { cat: "Salah", title: "Entering the masjid", ar: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", tr: "Allahummaftah li abwaba rahmatik", en: "O Allah, open for me the doors of Your mercy." },
  { cat: "Salah", title: "Leaving the masjid", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", tr: "Allahumma inni as'aluka min fadlik", en: "O Allah, I ask You from Your bounty." },
  { cat: "Salah", title: "After Adhan", ar: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ", tr: "Allahumma rabba hadhihid-da'watit-tammah was-salatil-qa'imah…", en: "O Allah, Lord of this perfect call and established prayer, grant Muhammad ﷺ the intercession and the highest rank." },
  { cat: "Salah", title: "After Salah", ar: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", tr: "Allahumma antas-Salam wa minkas-salam tabarakta ya Dhal-Jalali wal-Ikram", en: "O Allah, You are Peace and from You is peace. Blessed are You, O Owner of Majesty and Honour." },
  { cat: "Protection", title: "Ayat al-Kursi", ar: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ", tr: "Allahu la ilaha illa huwal-Hayyul-Qayyum, la ta'khudhuhu sinatun wa la nawm", en: "Allah — there is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness overtakes Him nor sleep." },
  { cat: "Protection", title: "Morning & evening protection", ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", tr: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem", en: "In the name of Allah, with whose name nothing on earth or in the heaven can cause harm, and He is the All-Hearing, All-Knowing." },
  { cat: "Protection", title: "Travel", ar: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ", tr: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrineen", en: "Glory to Him who subjected this to us, and we could never have it by our efforts; and to our Lord we shall return." },
  { cat: "Protection", title: "Entering a new place", ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", tr: "A'udhu bikalimatillahit-tammati min sharri ma khalaq", en: "I seek refuge in the perfect words of Allah from the evil of what He has created." },
  { cat: "Forgiveness", title: "Sayyidul Istighfar", ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ", tr: "Allahumma anta Rabbi la ilaha illa anta khalaqtani wa ana 'abduk…", en: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I keep Your covenant as much as I can." },
  { cat: "Forgiveness", title: "Istighfar", ar: "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ", tr: "Astaghfirullahal-ladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atubu ilayh", en: "I seek the forgiveness of Allah, besides whom there is no god, the Ever-Living, the Sustainer, and I turn to Him in repentance." },
  { cat: "Distress", title: "Dua of Yunus عليه السلام", ar: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ", tr: "La ilaha illa anta subhanaka inni kuntu minaz-zalimeen", en: "There is no god but You, glory be to You; indeed I was among the wrongdoers." },
  { cat: "Distress", title: "At times of anxiety", ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ", tr: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal", en: "O Allah, I seek refuge in You from anxiety and grief, from weakness and laziness." },
  { cat: "Distress", title: "Visiting the sick", ar: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ", tr: "La ba'sa tahurun in sha Allah", en: "No harm — may it be a purification, if Allah wills." },
  { cat: "Knowledge", title: "For increase in knowledge", ar: "رَبِّ زِدْنِي عِلْمًا", tr: "Rabbi zidni 'ilma", en: "My Lord, increase me in knowledge." },
  { cat: "Knowledge", title: "Before studying", ar: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي", tr: "Allahumman-fa'ni bima 'allamtani wa 'allimni ma yanfa'uni", en: "O Allah, benefit me by what You have taught me and teach me what benefits me." },
  { cat: "Family", title: "For righteous family", ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", tr: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun", en: "Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us leaders of the righteous." },
  { cat: "Family", title: "For parents", ar: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", tr: "Rabbir-hamhuma kama rabbayani sagheera", en: "My Lord, have mercy upon them as they raised me when I was small." },
  { cat: "Sustenance", title: "For halal provision", ar: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ", tr: "Allahumak-fini bihalalika 'an haramik wa aghnini bifadlika 'amman siwak", en: "O Allah, suffice me with what You have made lawful instead of what is unlawful, and enrich me by Your bounty over anyone besides You." },
  { cat: "Comprehensive", title: "Dua of the two worlds", ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", tr: "Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina 'adhaban-nar", en: "Our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire." },
  { cat: "Comprehensive", title: "Dua of Laylatul Qadr", ar: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي", tr: "Allahumma innaka 'Afuwwun tuhibbul-'afwa fa'fu 'anni", en: "O Allah, You are Most Forgiving and love forgiveness, so forgive me." },
  { cat: "Comprehensive", title: "Dua Qunoot (Witr)", ar: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ", tr: "Allahumma inna nasta'inuka wa nastaghfiruka wa nu'minu bika wa natawakkalu 'alayk", en: "O Allah, we seek Your help and Your forgiveness, we believe in You and we rely upon You." },
  { cat: "Comprehensive", title: "Durood Ibrahim", ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ", tr: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad…", en: "O Allah, send blessings upon Muhammad and the family of Muhammad as You sent blessings upon Ibrahim and the family of Ibrahim; indeed You are Praiseworthy, Glorious." },
];

/** Full Noorani Qaida — lesson by lesson. */
export const QAIDA_LESSONS = [
  { n: 1, title: "Huroof-e-Mufradat — Individual Letters", note: "The 29 Arabic letters, read slowly from right to left.", letters: "ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن و ه ء ي".split(" ") },
  { n: 2, title: "Huroof-e-Murakkabat — Joined Letters", note: "The same letters joined at the beginning, middle and end of a word.", letters: "بب بت بث تج تح تخ سد سذ سر شز شس صش ضص طض ظط عظ غع فغ قف كق لك مل نم هن ءو يء".split(" ") },
  { n: 3, title: "Muqatta'at — The Broken Letters", note: "The letters that open certain surahs.", letters: "الم المص الر المر كهيعص طه طسم يس ص حم عسق ق ن".split(" ") },
  { n: 4, title: "Harakaat — Zabar, Zer, Pesh", note: "Fatha, Kasra and Damma on every letter.", letters: "بَ بِ بُ تَ تِ تُ ثَ ثِ ثُ جَ جِ جُ حَ حِ حُ خَ خِ خُ".split(" ") },
  { n: 5, title: "Tanween — Do Zabar, Do Zer, Do Pesh", note: "The doubled vowel signs, always pronounced with an 'n' sound.", letters: "بً بٍ بٌ تً تٍ تٌ ثً ثٍ ثٌ جً جٍ جٌ".split(" ") },
  { n: 6, title: "Khari Zabar, Khari Zer, Ulta Pesh", note: "Standing fatha, standing kasra and inverted damma — always elongated.", letters: "بٰ بٖ بٗ سٰ نٰ رٰ هٰ ذٰ".split(" ") },
  { n: 7, title: "Huroof-e-Maddah — Alif, Waw, Ya", note: "The three letters of elongation, stretched for two counts.", letters: "با بو بي تا تو تي نا نو ني".split(" ") },
  { n: 8, title: "Huroof-e-Leen", note: "Waw and Ya with sukoon after a fatha — a soft sound.", letters: "بَوْ بَيْ خَوْف بَيْت قَوْم".split(" ") },
  { n: 9, title: "Jazm / Sukoon", note: "A letter with no vowel — stopped upon.", letters: "اَبْ اَتْ اَثْ اَجْ اَحْ اَخْ اَدْ اَذْ".split(" ") },
  { n: 10, title: "Tashdeed — Doubling", note: "The letter is pronounced twice with force.", letters: "بَّ تَّ ثَّ جَّ حَّ رَّ سَّ لَّ".split(" ") },
  { n: 11, title: "Tashdeed with Sukoon & Tanween", note: "Combining shaddah with jazm and tanween.", letters: "اَبَّتْ رَبَّهُ حَقًّا مُسَمًّى إِنَّهُ".split(" ") },
  { n: 12, title: "Noon & Meem Mushaddad — Ghunnah", note: "Held in the nose for two counts.", letters: "اِنَّ ثُمَّ عَمَّ اَمَّا مِنَّا جَنَّة".split(" ") },
  { n: 13, title: "Noon Saakin & Tanween Rules", note: "Izhaar, Idghaam, Iqlaab and Ikhfaa.", letters: "مَنْ اٰمَنَ مِنْ رَّبِّهِمْ مِنْۢ بَعْدِ اَنْتُمْ عَنْهُ".split(" ") },
  { n: 14, title: "Qalqalah — The Echoing Letters", note: "ق ط ب ج د echo when they carry sukoon.", letters: "اَقْ اَطْ اَبْ اَجْ اَدْ يَقْطَعُ اَبْتَغِى".split(" ") },
  { n: 15, title: "Waqf — Stopping", note: "How the last letter changes when you stop on a word.", letters: "اَحَدْ الصَّمَدْ يُوْلَدْ نَسْتَعِيْنْ".split(" ") },
  { n: 16, title: "Reading Practice — Surah al-Fatiha", note: "Now read a complete surah applying every rule.", letters: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ الْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ".split(" ") },
];

export const SEERAH_TIMELINE = [
  { year: "570 CE", title: "Birth in Makkah", text: "Born on 12 Rabi' al-Awwal in the Year of the Elephant to Abdullah ibn Abdul Muttalib and Aminah bint Wahb, of the noble tribe of Quraysh, clan of Banu Hashim." },
  { year: "570–574 CE", title: "Nursed by Halimah as-Sa'diyyah", text: "Raised in the desert of Banu Sa'd, where his chest was opened and purified by the angels." },
  { year: "576 CE", title: "Death of his mother", text: "Aminah passes away at Abwa when he is six; he is raised by his grandfather Abdul Muttalib, and after two years by his uncle Abu Talib." },
  { year: "583 CE", title: "Journey to Syria", text: "Travels with Abu Talib; the monk Bahira recognises the signs of prophethood in him." },
  { year: "595 CE", title: "Marriage to Khadijah رضي الله عنها", text: "At the age of 25 he marries Khadijah bint Khuwaylid, then aged 40, after trading honestly on her behalf." },
  { year: "605 CE", title: "Rebuilding the Ka'bah", text: "He resolves the dispute over the Black Stone by placing it on a cloth for all clans to carry together — he is known as Al-Ameen, the Trustworthy." },
  { year: "610 CE", title: "The First Revelation", text: "In the cave of Hira, Jibreel عليه السلام brings the first five verses of Surah al-Alaq: اِقْرَأْ بِاسْمِ رَبِّكَ." },
  { year: "613 CE", title: "Public call to Islam", text: "He calls the Quraysh openly from Mount Safa; persecution of the weak believers such as Bilal and the family of Yasir begins." },
  { year: "615 CE", title: "Migration to Abyssinia", text: "Companions migrate to the just Christian king An-Najashi to escape persecution; Ja'far ibn Abi Talib recites Surah Maryam to him." },
  { year: "616–619 CE", title: "The Boycott of Shi'b Abi Talib", text: "Banu Hashim are besieged for three years in the valley until the unjust document is eaten away by termites." },
  { year: "619 CE", title: "The Year of Sorrow", text: "Both Abu Talib and Khadijah رضي الله عنها pass away; he then travels to Ta'if and is driven out with stones, yet prays for its people." },
  { year: "621 CE", title: "Isra & Mi'raj", text: "The night journey to Masjid al-Aqsa and the ascension through the seven heavens; the five daily prayers are ordained." },
  { year: "622 CE", title: "Hijrah to Madinah", text: "Migration with Abu Bakr as-Siddiq رضي الله عنه via the cave of Thawr; the Islamic Hijri calendar begins from this year." },
  { year: "622 CE", title: "Brotherhood & the Charter of Madinah", text: "Masjid an-Nabawi is built, the Muhajirun and Ansar are paired in brotherhood, and a written constitution governs the city." },
  { year: "624 CE", title: "Battle of Badr", text: "313 Muslims are granted a decisive victory over about 1,000 Quraysh on 17 Ramadan." },
  { year: "625 CE", title: "Battle of Uhud", text: "A severe test after the archers left their post; Hamza ibn Abdul Muttalib and seventy companions are martyred." },
  { year: "627 CE", title: "Battle of the Trench (Khandaq)", text: "Madinah is defended by a trench dug on the advice of Salman al-Farsi رضي الله عنه; the confederates withdraw." },
  { year: "628 CE", title: "Treaty of Hudaybiyyah", text: "A ten-year truce that opens the doors of da'wah — the Qur'an calls it a clear victory (Fath Mubin)." },
  { year: "629 CE", title: "Letters to the kings & Umrah al-Qada", text: "Letters are sent to Heraclius, Khosrow, the Negus and Muqawqis; the compensatory Umrah is performed." },
  { year: "630 CE", title: "Conquest of Makkah", text: "Makkah is entered peacefully with 10,000 companions; the Ka'bah is cleansed of 360 idols and a general amnesty is declared." },
  { year: "630 CE", title: "Hunayn & Tabuk", text: "Victory at Hunayn after an initial retreat, and the expedition to Tabuk against the Byzantine frontier." },
  { year: "632 CE", title: "Farewell Hajj & Passing", text: "The Farewell Sermon at Arafah before 124,000 companions, then he passes away on 12 Rabi' al-Awwal in Madinah at the age of 63, in the room of Aisha رضي الله عنها." },
];

/** Selected blessed names and titles of the Prophet ﷺ. */
export const PROPHET_NAMES = [
  { ar: "مُحَمَّد", tr: "Muhammad", en: "The one who is repeatedly praised" },
  { ar: "أَحْمَد", tr: "Ahmad", en: "The most praiseworthy of those who praise Allah" },
  { ar: "الْمَاحِي", tr: "Al-Mahi", en: "The eraser — through whom Allah erases disbelief" },
  { ar: "الْحَاشِر", tr: "Al-Hashir", en: "The gatherer — people are gathered at his feet" },
  { ar: "الْعَاقِب", tr: "Al-Aqib", en: "The last — no prophet comes after him" },
  { ar: "الْمُصْطَفَى", tr: "Al-Mustafa", en: "The chosen one" },
  { ar: "الْأَمِين", tr: "Al-Ameen", en: "The trustworthy" },
  { ar: "الصَّادِق", tr: "As-Sadiq", en: "The truthful" },
  { ar: "الْحَبِيب", tr: "Al-Habib", en: "The beloved of Allah" },
  { ar: "رَحْمَةٌ لِلْعَالَمِين", tr: "Rahmatun lil-'Alamin", en: "A mercy to all the worlds" },
  { ar: "خَاتَمُ النَّبِيِّين", tr: "Khatamun-Nabiyyin", en: "The seal of the prophets" },
  { ar: "الشَّفِيع", tr: "Ash-Shafi'", en: "The intercessor on the Day of Judgement" },
  { ar: "الْبَشِير", tr: "Al-Bashir", en: "The bearer of glad tidings" },
  { ar: "النَّذِير", tr: "An-Nadhir", en: "The warner" },
  { ar: "السِّرَاجُ الْمُنِير", tr: "As-Sirajul-Munir", en: "The illuminating lamp" },
  { ar: "طه", tr: "Ta-Ha", en: "A name by which Allah addressed him in the Qur'an" },
  { ar: "يس", tr: "Ya-Sin", en: "A name by which Allah addressed him in the Qur'an" },
  { ar: "الْمُزَّمِّل", tr: "Al-Muzzammil", en: "The one wrapped in garments" },
  { ar: "الْمُدَّثِّر", tr: "Al-Muddaththir", en: "The one covered in a cloak" },
  { ar: "أَبُو الْقَاسِم", tr: "Abul-Qasim", en: "Father of Qasim — his kunyah" },
];

export type FamilyMember = { name: string; role: string; life: string; age: number };

export const SEERAH_FAMILY: FamilyMember[] = [
  { name: "Prophet Muhammad ﷺ", role: "The Messenger of Allah", life: "570–632 CE", age: 63 },
  { name: "Abdullah ibn Abdul Muttalib", role: "Father — passed away before his birth", life: "546–570 CE", age: 24 },
  { name: "Aminah bint Wahb", role: "Mother", life: "549–576 CE", age: 27 },
  { name: "Abdul Muttalib", role: "Grandfather and first guardian", life: "497–578 CE", age: 81 },
  { name: "Abu Talib", role: "Uncle and protector in Makkah", life: "539–619 CE", age: 80 },
  { name: "Hamza ibn Abdul Muttalib", role: "Uncle — the Lion of Allah, martyred at Uhud", life: "568–625 CE", age: 57 },
  { name: "Khadijah bint Khuwaylid", role: "Wife — the first believer", life: "555–619 CE", age: 64 },
  { name: "Sawdah bint Zam'ah", role: "Wife — the first he married after Khadijah", life: "580–674 CE", age: 94 },
  { name: "Aishah bint Abu Bakr as-Siddiq", role: "Wife — narrator of 2,210 hadith", life: "613–678 CE", age: 65 },
  { name: "Hafsah bint Umar ibn al-Khattab", role: "Wife — keeper of the first mushaf", life: "605–665 CE", age: 60 },
  { name: "Zaynab bint Khuzaymah", role: "Wife — Umm al-Masakin, the mother of the poor", life: "595–625 CE", age: 30 },
  { name: "Zaynab bint Jahsh", role: "Wife — cousin of the Prophet ﷺ", life: "590–641 CE", age: 51 },
  { name: "Juwayriyyah bint al-Harith", role: "Wife — of Banu Mustaliq", life: "608–676 CE", age: 68 },
  { name: "Umm Habibah Ramlah bint Abi Sufyan", role: "Wife — migrated to Abyssinia", life: "589–665 CE", age: 76 },
  { name: "Safiyyah bint Huyayy", role: "Wife — of the lineage of Harun عليه السلام", life: "610–670 CE", age: 60 },
  { name: "Maymunah bint al-Harith", role: "Wife — the last he married", life: "594–681 CE", age: 87 },
  { name: "Maria al-Qibtiyyah", role: "Mother of his son Ibrahim", life: "governess of Egypt, d. 637 CE", age: 40 },
  { name: "Umm Salamah Hind bint Abi Umayyah", role: "Wife — the wise counsellor at Hudaybiyyah", life: "596–680 CE", age: 84 },
  { name: "Fatimah az-Zahra bint Muhammad ﷺ", role: "Daughter — leader of the women of Paradise", life: "605–632 CE", age: 27 },
  { name: "Zaynab bint Muhammad ﷺ", role: "Daughter — the eldest", life: "600–629 CE", age: 29 },
  { name: "Ruqayyah bint Muhammad ﷺ", role: "Daughter — wife of Uthman", life: "601–624 CE", age: 23 },
  { name: "Umm Kulthum bint Muhammad ﷺ", role: "Daughter — wife of Uthman after Ruqayyah", life: "603–630 CE", age: 27 },
  { name: "Qasim ibn Muhammad ﷺ", role: "Son — the eldest, passed away in infancy", life: "598–600 CE", age: 2 },
  { name: "Abdullah ibn Muhammad ﷺ", role: "Son — also called at-Tayyib and at-Tahir", life: "611–613 CE", age: 2 },
  { name: "Ibrahim ibn Muhammad ﷺ", role: "Son — passed away in infancy", life: "630–632 CE", age: 2 },
  { name: "Hasan ibn Ali ibn Abi Talib", role: "Grandson — 5th Caliph", life: "625–670 CE", age: 45 },
  { name: "Husayn ibn Ali ibn Abi Talib", role: "Grandson — martyred at Karbala", life: "626–680 CE", age: 54 },
];

/** The four rightly guided caliphs — Khulafa ar-Rashidun. */
export const KHULAFA = [
  { name: "Abu Bakr as-Siddiq رضي الله عنه", role: "1st Caliph — the closest companion", life: "573–634 CE", age: 61, rule: "632–634 CE" },
  { name: "Umar ibn al-Khattab رضي الله عنه", role: "2nd Caliph — Al-Farooq", life: "584–644 CE", age: 60, rule: "634–644 CE" },
  { name: "Uthman ibn Affan رضي الله عنه", role: "3rd Caliph — compiler of the mushaf", life: "576–656 CE", age: 80, rule: "644–656 CE" },
  { name: "Ali ibn Abi Talib رضي الله عنه", role: "4th Caliph — cousin and son-in-law", life: "601–661 CE", age: 60, rule: "656–661 CE" },
];

export const CREATORS = [
  "Syed Basharath Ali",
  "Syed Ahmed Ali",
  "Mohd Sufyaan Sayeed",
  "Syed Atif Ammar",
];

export const ASMA_FALLBACK_NOTE =
  "99 Names of Allah — Asma ul Husna, with meaning in your chosen language.";
/* ------------------------------------------------------------------ */
/* Preferred translation editions (alquran.cloud) — grouped by language */
/* ------------------------------------------------------------------ */
export type TranslationEdition = { id: string; name: string; lang: LangCode };

export const TRANSLATIONS: TranslationEdition[] = [
  { id: "en.sahih", name: "Saheeh International", lang: "en" },
  { id: "en.pickthall", name: "Marmaduke Pickthall", lang: "en" },
  { id: "en.yusufali", name: "Abdullah Yusuf Ali", lang: "en" },
  { id: "en.hilali", name: "Hilali & Khan", lang: "en" },
  { id: "en.asad", name: "Muhammad Asad", lang: "en" },
  { id: "en.maududi", name: "Abul Ala Maududi", lang: "en" },
  { id: "ur.jalandhry", name: "Fateh Muhammad Jalandhry", lang: "ur" },
  { id: "ur.ahmedali", name: "Ahmed Ali", lang: "ur" },
  { id: "ur.junagarhi", name: "Muhammad Junagarhi", lang: "ur" },
  { id: "ur.kanzuliman", name: "Ahmed Raza Khan — Kanz ul Iman", lang: "ur" },
  { id: "ur.maududi", name: "Abul Ala Maududi — Tafheem", lang: "ur" },
  { id: "ar.muyassar", name: "التفسير الميسر", lang: "ar" },
  { id: "ar.jalalayn", name: "تفسير الجلالين", lang: "ar" },
  { id: "hi.hindi", name: "Suhel Farooq Khan", lang: "hi" },
  { id: "bn.bengali", name: "Muhiuddin Khan", lang: "bn" },
  { id: "id.indonesian", name: "Bahasa Indonesia", lang: "id" },
  { id: "tr.diyanet", name: "Diyanet İşleri", lang: "tr" },
  { id: "fr.hamidullah", name: "Muhammad Hamidullah", lang: "fr" },
  { id: "ru.kuliev", name: "Elmir Kuliev", lang: "ru" },
  { id: "es.cortes", name: "Julio Cortes", lang: "es" },
  { id: "ta.tamil", name: "Jan Turst Foundation", lang: "ta" },
  { id: "ml.abdulhameed", name: "Abdul Hameed & Kunhi", lang: "ml" },
  { id: "fa.ansarian", name: "Hussain Ansarian", lang: "fa" },
];

/** The edition actually used: the user's preference, else the language default. */
export function resolveTranslation(langCode: string, preference: string) {
  if (preference && preference !== "auto" && TRANSLATIONS.some((t) => t.id === preference)) {
    return preference;
  }
  return getLanguage(langCode).quranEdition;
}

/* ---- Preferred tafsir (spa5k tafsir_api slugs) ---- */
export type TafsirOption = { slug: string; name: string; lang: LangCode };

export const TAFSIRS: TafsirOption[] = [
  { slug: "en-tafisr-ibn-kathir", name: "Ibn Kathir (abridged)", lang: "en" },
  { slug: "en-tafsir-maarif-ul-quran", name: "Maarif ul Quran", lang: "en" },
  { slug: "en-tazkirul-quran", name: "Tazkirul Quran", lang: "en" },
  { slug: "en-al-jalalayn", name: "Al-Jalalayn", lang: "en" },
  { slug: "ur-tafseer-ibn-e-kaseer", name: "تفسیر ابن کثیر", lang: "ur" },
  { slug: "ur-tafsir-bayan-ul-quran", name: "بیان القرآن", lang: "ur" },
  { slug: "ur-tazkirul-quran", name: "تذکیر القرآن", lang: "ur" },
  { slug: "ar-tafsir-ibn-kathir", name: "تفسير ابن كثير", lang: "ar" },
  { slug: "ar-tafsir-muyassar", name: "التفسير الميسر", lang: "ar" },
  { slug: "ar-tafsir-al-tabari", name: "تفسير الطبري", lang: "ar" },
  { slug: "bn-tafseer-ibn-e-kaseer", name: "তাফসীর ইবনে কাসীর", lang: "bn" },
  { slug: "indonesian-mokhtasar", name: "Al-Mukhtasar", lang: "id" },
  { slug: "tr-tafsir-ibne-kathir", name: "İbn Kesir Tefsiri", lang: "tr" },
  { slug: "french-mokhtasar", name: "Al-Mukhtasar", lang: "fr" },
  { slug: "ru-tafsir-ibne-kahtir", name: "Ибн Касир", lang: "ru" },
  { slug: "hindi-mokhtasar", name: "अल-मुख़्तसर", lang: "hi" },
  { slug: "tamil-mokhtasar", name: "அல்-முக்தசர்", lang: "ta" },
];

export function resolveTafsir(langCode: string, preference: string) {
  if (preference && preference !== "auto" && TAFSIRS.some((t) => t.slug === preference)) {
    return preference;
  }
  return getLanguage(langCode).tafsirSlug;
}

/** Ayah-by-ayah translation recitations published on the same audio CDN. */
export const TRANSLATION_RECITERS: Reciter[] = [
  { id: "ur.khan", name: "Shamshad Ali Khan — Urdu translation", style: "Urdu", bitrate: 64 },
  { id: "en.walk", name: "Ibrahim Walk — English translation", style: "English", bitrate: 64 },
];

export const AUDIO_QUALITIES = [
  { value: 32, label: "Low — 32 kbps (saves data)" },
  { value: 64, label: "Standard — 64 kbps" },
  { value: 128, label: "High — 128 kbps" },
  { value: 192, label: "Highest available — 192 kbps" },
] as const;

/**
 * Recorded bayan / dars of Shaykh-ul-Hadith Hazrat Moulana Peer Zulfiqar Ahmad
 * Naqshbandi (damat barakatuhum) and other scholars, streamed from the public
 * Internet Archive. These are real recordings of the shaykh's own voice — used
 * for tafseer and explanation listening in the app.
 */
export type ScholarTalk = { id: string; title: string; archiveId: string; lang: "ur" | "en" };

export const SCHOLAR_TALKS: ScholarTalk[] = [
  { id: "ishq", title: "Ishq-e-Elahi", archiveId: "IshqEElahiByShaykhZulfiqarAhmadNaqshbandi", lang: "ur" },
  { id: "sunnat", title: "Sunnat-e-Nabvi ﷺ aur Jadeed Science", archiveId: "SunnatENabvisallallahuAlaihiWasallamAurJadeedScienceyInkishafaatShaykhZulfiqarAhmadNaqshbandi", lang: "ur" },
  { id: "kalima", title: "Kalima ki Ahmiyat", archiveId: "KalimaKiAhmiyatShaykhZulfiqarAhmad", lang: "ur" },
  { id: "dil", title: "Dil ki Maut", archiveId: "DilKiMautShaykhZulfiqarAhmad176x144H263.3gp", lang: "ur" },
  { id: "majlis", title: "Majlis-e-Zikr — Waqiaat", archiveId: "DillHilaDanyWalyMoatKWaqiaatMajliszikr_201510", lang: "ur" },
];

export const SCHOLAR_NAME = "Hazrat Moulana Peer Zulfiqar Ahmad Naqshbandi (db)";

/* ---- Voice profiles used for translation / tafseer / explanation audio ---- */
export type VoiceProfile = {
  id: string;
  label: string;
  /** preferred substrings when picking an installed system voice */
  match: string[];
  rate: number;
  pitch: number;
};

export const VOICE_PROFILES: VoiceProfile[] = [
  { id: "scholar", label: "Scholar — deep male, measured (recommended)", match: ["male", "ahmad", "asad", "rishi", "hemant", "daniel", "google"], rate: 0.9, pitch: 0.85 },
  { id: "khateeb", label: "Khateeb — strong male, projecting", match: ["male", "daniel", "google", "microsoft"], rate: 0.95, pitch: 0.75 },
  { id: "ustad", label: "Ustad — calm teaching voice", match: ["male", "google", "microsoft"], rate: 0.8, pitch: 0.95 },
  { id: "default", label: "Device default", match: [], rate: 0.95, pitch: 1 },
];

/** Tajweed colour legend used by the mushaf reader. */
export const TAJWEED_COLORS = [
  { key: "ghunnah", label: "Ghunnah", color: "#16a34a" },
  { key: "ikhfa", label: "Ikhfaa", color: "#c026d3" },
  { key: "idgham", label: "Idghaam", color: "#2563eb" },
  { key: "qalqalah", label: "Qalqalah", color: "#dc2626" },
  { key: "madd", label: "Madd", color: "#ea580c" },
];
