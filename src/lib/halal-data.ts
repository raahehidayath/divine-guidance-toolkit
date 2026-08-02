/** Halal / Haram reference used by the /halal section.
 *  Rulings follow the majority (jumhur) position of the four Sunni schools.
 *  "mushbooh" means doubtful — the source decides the ruling, so it must be verified. */

export type Ruling = "halal" | "haram" | "mushbooh";

export type HalalItem = {
  id: string;
  name: string;
  category: string;
  ruling: Ruling;
  /** Short reason a normal shopper can act on. */
  why: string;
  /** Quran / hadith / fiqh reference where one applies. */
  evidence?: string;
  /** Other names the item hides behind on labels. */
  aka?: string[];
};

export const HALAL_CATEGORIES = [
  "Meat & poultry",
  "Seafood",
  "Food additives (E-numbers)",
  "Ingredients",
  "Drinks",
  "Sweets & snacks",
  "Medicine & cosmetics",
  "Money & work",
  "Daily life",
] as const;

export const RULING_LABEL: Record<Ruling, string> = {
  halal: "Halal",
  haram: "Haram",
  mushbooh: "Doubtful (mushbooh)",
};

export const HALAL_ITEMS: HalalItem[] = [
  /* ---- Meat & poultry ---- */
  { id: "zabiha-beef", name: "Zabiha beef, lamb, goat, camel", category: "Meat & poultry", ruling: "halal", why: "Slaughtered by a Muslim (or a Jew/Christian) with the name of Allah, throat cut, blood drained.", evidence: "Qur'an 5:3–5" },
  { id: "pork", name: "Pork, bacon, ham, lard", category: "Meat & poultry", ruling: "haram", why: "Swine flesh is explicitly forbidden in every form, including fat and derivatives.", evidence: "Qur'an 2:173, 5:3", aka: ["lard", "bacon fat", "pork gelatine"] },
  { id: "non-zabiha", name: "Non-zabiha / machine-slaughtered chicken", category: "Meat & poultry", ruling: "mushbooh", why: "Depends on whether the name of Allah was pronounced and the bird was alive at slaughter. Verify the certifier.", evidence: "Qur'an 6:121" },
  { id: "carrion", name: "Dead animal (carrion), roadkill", category: "Meat & poultry", ruling: "haram", why: "An animal that died without valid slaughter is maytah.", evidence: "Qur'an 5:3" },
  { id: "blood", name: "Blood, blood sausage, black pudding", category: "Meat & poultry", ruling: "haram", why: "Flowing blood is forbidden.", evidence: "Qur'an 6:145" },
  { id: "donkey", name: "Domestic donkey and mule", category: "Meat & poultry", ruling: "haram", why: "Prohibited on the day of Khaybar.", evidence: "Bukhari 4199, Muslim 1936" },
  { id: "predator", name: "Predators with fangs (lion, dog, cat), birds of prey", category: "Meat & poultry", ruling: "haram", why: "Fanged beasts and taloned birds are forbidden.", evidence: "Muslim 1932–1934" },
  { id: "horse", name: "Horse meat", category: "Meat & poultry", ruling: "halal", why: "Permitted by the majority (Hanafis consider it disliked).", evidence: "Bukhari 5520" },
  { id: "rabbit", name: "Rabbit", category: "Meat & poultry", ruling: "halal", why: "The Prophet ﷺ was given rabbit meat and it was accepted.", evidence: "Bukhari 5535" },
  { id: "kosher-meat", name: "Kosher meat", category: "Meat & poultry", ruling: "mushbooh", why: "Slaughter of the People of the Book is permitted in principle, but stunning and the missing tasmiyah make many scholars require caution.", evidence: "Qur'an 5:5" },

  /* ---- Seafood ---- */
  { id: "fish", name: "All fish with scales", category: "Seafood", ruling: "halal", why: "Sea game and its food are made lawful for you.", evidence: "Qur'an 5:96" },
  { id: "prawn", name: "Prawn, shrimp", category: "Seafood", ruling: "halal", why: "Halal by the majority; some Hanafis restrict sea food to fish only." },
  { id: "crab", name: "Crab, lobster, octopus, squid", category: "Seafood", ruling: "mushbooh", why: "Halal for Maliki/Shafi'i/Hanbali schools, not for the Hanafi school. Follow your madhhab." },
  { id: "frog", name: "Frog", category: "Seafood", ruling: "haram", why: "Killing frogs was forbidden, so eating them is not allowed.", evidence: "Abu Dawud 3871" },

  /* ---- Food additives ---- */
  { id: "e120", name: "E120 Carmine / cochineal", category: "Food additives (E-numbers)", ruling: "haram", why: "Red colour made from crushed insects; impermissible for the majority.", aka: ["carminic acid", "natural red 4"] },
  { id: "e441", name: "E441 Gelatine", category: "Food additives (E-numbers)", ruling: "mushbooh", why: "Halal only when made from fish or zabiha beef. Most commercial gelatine is porcine.", aka: ["gelatin", "gelatine"] },
  { id: "e471", name: "E471 Mono- and diglycerides of fatty acids", category: "Food additives (E-numbers)", ruling: "mushbooh", why: "Halal if plant-derived, haram if from pork fat or non-zabiha tallow." },
  { id: "e472", name: "E472 a–f Esters of fatty acids", category: "Food additives (E-numbers)", ruling: "mushbooh", why: "Same source problem as E471 — confirm the fat is vegetable." },
  { id: "e422", name: "E422 Glycerol / glycerine", category: "Food additives (E-numbers)", ruling: "mushbooh", why: "Vegetable glycerine is halal; animal glycerine may be from pork.", aka: ["glycerin"] },
  { id: "e631", name: "E631 Disodium inosinate", category: "Food additives (E-numbers)", ruling: "mushbooh", why: "Often produced from sardines (halal) but sometimes from pork.", },
  { id: "e904", name: "E904 Shellac", category: "Food additives (E-numbers)", ruling: "mushbooh", why: "Resin secreted by the lac insect; scholars differ, widely avoided." },
  { id: "e920", name: "E920 L-cysteine", category: "Food additives (E-numbers)", ruling: "mushbooh", why: "Dough conditioner sometimes derived from human hair or duck feathers; synthetic is halal." },
  { id: "e100", name: "E100 Curcumin, E160a carotene, E300 vitamin C", category: "Food additives (E-numbers)", ruling: "halal", why: "Plant or synthetic origin." },
  { id: "e153", name: "E153 Carbon black (vegetable carbon)", category: "Food additives (E-numbers)", ruling: "mushbooh", why: "Halal from plants, doubtful when made from bone char." },

  /* ---- Ingredients ---- */
  { id: "rennet", name: "Animal rennet in cheese", category: "Ingredients", ruling: "mushbooh", why: "Halal when from a zabiha calf or microbial; doubtful otherwise. Look for microbial/vegetarian rennet." },
  { id: "whey", name: "Whey / whey powder", category: "Ingredients", ruling: "mushbooh", why: "Depends on the rennet used to make the cheese it came from." },
  { id: "vanilla-extract", name: "Vanilla extract", category: "Ingredients", ruling: "mushbooh", why: "Standard extract is 35% ethanol. Many scholars permit the trace amount left in baked food; alcohol-free extract removes the doubt." },
  { id: "lecithin", name: "Soy lecithin (E322)", category: "Ingredients", ruling: "halal", why: "Plant-derived emulsifier." },
  { id: "tallow", name: "Tallow, animal shortening", category: "Ingredients", ruling: "mushbooh", why: "Beef tallow is halal only from zabiha animals; often mixed with pork fat." },
  { id: "enzymes", name: "Unspecified 'enzymes'", category: "Ingredients", ruling: "mushbooh", why: "Could be microbial (halal) or animal (verify)." },
  { id: "honey", name: "Honey", category: "Ingredients", ruling: "halal", why: "Explicitly praised as a healing for people.", evidence: "Qur'an 16:69" },
  { id: "vinegar", name: "Vinegar (including wine vinegar)", category: "Ingredients", ruling: "halal", why: "Once wine fully turns to vinegar it is no longer intoxicating; the Prophet ﷺ praised vinegar.", evidence: "Muslim 2051" },

  /* ---- Drinks ---- */
  { id: "khamr", name: "Wine, beer, spirits, any intoxicant", category: "Drinks", ruling: "haram", why: "Every intoxicant is khamr and every khamr is haram — even a small amount.", evidence: "Qur'an 5:90, Muslim 2003" },
  { id: "non-alc-beer", name: "0.0% 'non-alcoholic' beer", category: "Drinks", ruling: "mushbooh", why: "Halal if truly free of intoxicant and not imitating drinking culture; many brands still carry up to 0.5% alcohol." },
  { id: "kombucha", name: "Kombucha", category: "Drinks", ruling: "mushbooh", why: "Fermentation can push alcohol above trace levels — check the batch." },
  { id: "energy-drinks", name: "Energy drinks with taurine", category: "Drinks", ruling: "mushbooh", why: "Synthetic taurine is halal; animal-sourced taurine is not. Most major brands use synthetic." },
  { id: "coffee", name: "Coffee, tea, soft drinks", category: "Drinks", ruling: "halal", why: "No intoxicant and no forbidden ingredient." },

  /* ---- Sweets & snacks ---- */
  { id: "marshmallow", name: "Marshmallows, gummy sweets", category: "Sweets & snacks", ruling: "mushbooh", why: "Almost always contain gelatine — only halal-certified or fish/beef gelatine versions are safe." },
  { id: "choc-liqueur", name: "Chocolate with liqueur filling", category: "Sweets & snacks", ruling: "haram", why: "Contains added alcohol as an intoxicant." },
  { id: "crisps", name: "Flavoured crisps / chips", category: "Sweets & snacks", ruling: "mushbooh", why: "Flavourings may use pork enzymes, non-zabiha chicken fat or E631." },
  { id: "icecream", name: "Ice cream", category: "Sweets & snacks", ruling: "mushbooh", why: "Check for gelatine, E471 and alcohol-based flavours." },

  /* ---- Medicine & cosmetics ---- */
  { id: "gel-capsule", name: "Gelatine capsules in medicine", category: "Medicine & cosmetics", ruling: "mushbooh", why: "Ask for a halal-certified or vegetarian capsule; if no alternative exists, necessity (darura) permits it.", evidence: "Qur'an 2:173" },
  { id: "insulin", name: "Porcine insulin / porcine heparin", category: "Medicine & cosmetics", ruling: "mushbooh", why: "Forbidden in principle, permitted under medical necessity when no alternative exists." },
  { id: "vaccine", name: "Vaccines", category: "Medicine & cosmetics", ruling: "halal", why: "Major fatwa councils permit vaccination; any porcine trace is transformed and covered by necessity." },
  { id: "alcohol-sanitiser", name: "Alcohol hand sanitiser and perfume", category: "Medicine & cosmetics", ruling: "halal", why: "Isopropyl/ethanol used externally is not the drinking khamr and is permitted by the majority for cleaning and scent." },
  { id: "collagen", name: "Collagen supplements", category: "Medicine & cosmetics", ruling: "mushbooh", why: "Usually bovine or porcine; marine collagen is safe." },
  { id: "lipstick", name: "Lipstick and cosmetics with carmine/tallow", category: "Medicine & cosmetics", ruling: "mushbooh", why: "Check for carmine (E120), tallow and pork-derived stearic acid." },

  /* ---- Money & work ---- */
  { id: "riba", name: "Interest (riba) on loans and savings", category: "Money & work", ruling: "haram", why: "Allah has permitted trade and forbidden interest.", evidence: "Qur'an 2:275" },
  { id: "conventional-mortgage", name: "Conventional interest mortgage", category: "Money & work", ruling: "haram", why: "Interest-based debt; use ijara/murabaha home finance instead." },
  { id: "islamic-finance", name: "Murabaha / ijara / musharaka finance", category: "Money & work", ruling: "halal", why: "Profit comes from a real asset and shared risk, not from lending money." },
  { id: "insurance", name: "Conventional insurance", category: "Money & work", ruling: "mushbooh", why: "Contains gharar and riba for many scholars; takaful is the agreed alternative. Compulsory cover is excused." },
  { id: "gambling", name: "Gambling, lottery, betting apps", category: "Money & work", ruling: "haram", why: "Maysir is named alongside khamr as filth of Satan's handiwork.", evidence: "Qur'an 5:90" },
  { id: "crypto-trading", name: "Cryptocurrency trading", category: "Money & work", ruling: "mushbooh", why: "Scholars differ; leveraged and speculative trading is closer to maysir. Avoid margin and interest-bearing staking." },
  { id: "stocks", name: "Shares in a halal business", category: "Money & work", ruling: "halal", why: "Permitted when the company's core activity and debt ratios pass shariah screening." },
  { id: "bribery", name: "Bribery, cheating in trade", category: "Money & work", ruling: "haram", why: "Curse of Allah is upon the one who bribes and the one bribed.", evidence: "Abu Dawud 3580" },
  { id: "selling-alcohol", name: "Working in a job selling alcohol or pork", category: "Money & work", ruling: "haram", why: "Assisting in what is forbidden is itself forbidden.", evidence: "Muslim 1598" },

  /* ---- Daily life ---- */
  { id: "music", name: "Instrumental music", category: "Daily life", ruling: "mushbooh", why: "Majority hold instruments impermissible; a minority permit music free of sin. Vocal nasheed and the daff are agreed upon." },
  { id: "silk-men", name: "Silk and gold for men", category: "Daily life", ruling: "haram", why: "Forbidden for the men of this ummah, permitted for the women.", evidence: "Tirmidhi 1720" },
  { id: "tattoo", name: "Permanent tattoos", category: "Daily life", ruling: "haram", why: "The one who tattoos and the one tattooed are cursed.", evidence: "Bukhari 5937" },
  { id: "smoking", name: "Smoking and vaping", category: "Daily life", ruling: "haram", why: "Proven self-harm; contemporary councils rule it forbidden.", evidence: "Qur'an 2:195" },
  { id: "images", name: "Photography of living beings", category: "Daily life", ruling: "halal", why: "Contemporary majority permit photographs for need and identification; three-dimensional idols remain forbidden." },
  { id: "dogs", name: "Keeping a dog", category: "Daily life", ruling: "mushbooh", why: "Permitted for guarding, farming and hunting; keeping one purely as a house pet reduces reward.", evidence: "Bukhari 5480" },
  { id: "chess", name: "Chess and video games", category: "Daily life", ruling: "mushbooh", why: "Permitted when free of gambling, images of shirk and neglect of salah; disliked or forbidden when they cause either." },
  { id: "free-mixing", name: "Free mixing and khalwa", category: "Daily life", ruling: "haram", why: "Being alone with a non-mahram is forbidden.", evidence: "Bukhari 5233" },
  { id: "backbiting", name: "Backbiting (gheebah)", category: "Daily life", ruling: "haram", why: "Compared in the Qur'an to eating the flesh of your dead brother.", evidence: "Qur'an 49:12" },
  { id: "organ-donation", name: "Organ donation", category: "Daily life", ruling: "mushbooh", why: "Permitted by most contemporary councils to save a life, with conditions; a minority prohibit it." },
];

export const RULING_ORDER: Ruling[] = ["halal", "mushbooh", "haram"];
