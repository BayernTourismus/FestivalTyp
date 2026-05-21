export type BayernTypeId = "franken" | "oberbayern" | "ostbayern" | "allgaeu-bayerisch-schwaben";

export type ResultMeta = {
  id: BayernTypeId;
  title: string;
  region: string;
  vibe: string;
  description: string;
  cta: string;
  guideLabel: string;
  guideUrl: string;
  color: string;
  accent: string;
  backdrop: string;
};

export type Answer = {
  option: "A" | "B" | "C" | "D";
  label: string;
  resultId: BayernTypeId;
};

export type Question = {
  id: string;
  prompt: string;
  answers: Answer[];
};

export const resultOrder: BayernTypeId[] = ["franken", "oberbayern", "ostbayern", "allgaeu-bayerisch-schwaben"];

export const results: Record<BayernTypeId, ResultMeta> = {
  "franken": {
    id: "franken",
    title: "Der Kultur-Genießer",
    region: "Franken",
    vibe: "Stilvoll. Intensiv. Charakterstark.",
    description:
      "Du feierst am liebsten da, wo Geschichte auf moderne Beats trifft. Zwischen Weinbergen, historischen Mauern und kreativen Bühnen fühlst du dich zuhause. Für dich ist Musik mehr als Sound - sie ist echte Atmosphäre. Genau dieses Gefühl erwartet dich in Franken! Hier verbindet sich Indie- und Jazz-Kultur mit urbanem Altstadt-Flair und regionaler Kulinarik. Tagsüber durch charmante Gassen schlendern, abends mit einem Glas Silvaner bei einem Open-Air im Schlossgraben tanzen. Entdecke ein Bayern, das kreativ, genussvoll und einzigartig ist. Dein Bayern klingt nach Charakter.",
    cta: "Jetzt Franken entdecken",
    guideLabel: "Digitaler Reiseführer zur Urlaubsregion Franken",
    guideUrl: "https://www.erlebe.bayern/regionen/franken/",
    color: "#8a3f6f",
    accent: "#f0b84a",
    backdrop:
      "linear-gradient(135deg, rgba(138, 63, 111, 0.95), rgba(184, 74, 83, 0.82)), radial-gradient(circle at 74% 16%, rgba(240, 184, 74, 0.72), transparent 31%)",
  },
  "oberbayern": {
    id: "oberbayern",
    title: "Der Panorama-Performer",
    region: "Oberbayern",
    vibe: "Emotional. Gesellig. Grenzenlos.",
    description:
      "Du liebst große Gefühle - am liebsten mit See- oder Bergblick. Musik ist für dich Gemeinschaft: mitsingen, mittanzen, mitfühlen. In Oberbayern findest du genau diese Energie. Hier trifft moderne Brass-Musik auf DJ-Beats, und gelebte Tradition wird zur fetten Party. Erst Gipfelglück oder Stand-Up-Paddling auf dem See, danach mit der Crew in den Biergarten oder aufs nächste große Open-Air. Dein Bayern feiert das Leben, die Freundschaft und die perfekte Kulisse.",
    cta: "Jetzt Oberbayern erleben",
    guideLabel: "Digitaler Reiseführer zur Urlaubsregion Oberbayern",
    guideUrl: "https://www.erlebe.bayern/regionen/oberbayern/",
    color: "#0050a0",
    accent: "#6ec1e4",
    backdrop:
      "linear-gradient(135deg, rgba(0, 80, 160, 0.94), rgba(30, 132, 165, 0.82)), radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.66), transparent 28%)",
  },
  "ostbayern": {
    id: "ostbayern",
    title: "Der Natur-Freigeist",
    region: "Ostbayern",
    vibe: "Echt. Geerdet. Frei.",
    description:
      "Du feierst am liebsten unter freiem Himmel - wo Musik und Natur eins werden. Ostbayern ist genau dein Ding: Wälder, Flüsse, echte Begegnungen. Kleine Bühnen, große Emotionen. Zwischen dem Nationalpark Bayerischer Wald und wilden Flusslandschaften gibt es kleine, entschleunigte Festivals und kulturelle Geheimtipps zu entdecken. Tagsüber radelst du durch tiefe Wälder, abends sitzt du bei Akustik-Sounds und guten Gesprächen unterm Sternenhimmel. Dein Bayern ist ein Ort zum Durchatmen.",
    cta: "Jetzt Ostbayern erleben",
    guideLabel: "Digitaler Reiseführer zur Urlaubsregion Ostbayern",
    guideUrl: "https://www.erlebe.bayern/regionen/ostbayern/",
    color: "#25664d",
    accent: "#91c46c",
    backdrop:
      "linear-gradient(135deg, rgba(37, 102, 77, 0.95), rgba(33, 83, 103, 0.86)), radial-gradient(circle at 78% 18%, rgba(145, 196, 108, 0.68), transparent 30%)",
  },
  "allgaeu-bayerisch-schwaben": {
    id: "allgaeu-bayerisch-schwaben",
    title: "Der Gipfel-Stürmer",
    region: "Allgäu / Bayerisch Schwaben",
    vibe: "Laut. Organisiert. Energiegeladen.",
    description:
      "Du brauchst treibende Beats im Bauch und den perfekten Flow! Langes Rumstehen ist nichts für dich - du navigierst clever durchs Leben und bleibst immer in Bewegung. Willkommen im Allgäu und Bayerisch Schwaben! Hier verschmelzen Outdoor-Action, Rad- und Flusslandschaften und junge Event-Kultur. Ob Extremsport-Festival oder Open-Airs im Tal - hier pusht dich die Natur ans Limit. Dein Bayern ist sportlich, smart und voller Drive!",
    cta: "Jetzt Allgäu/Bayerisch Schwaben erleben",
    guideLabel: "Die Urlaubsregion Allgäu/Bayerisch-Schwaben",
    guideUrl: "https://www.erlebe.bayern/regionen/allgaeu-bayerisch-schwaben/",
    color: "#c04e24",
    accent: "#ffc857",
    backdrop:
      "linear-gradient(135deg, rgba(192, 78, 36, 0.96), rgba(130, 66, 143, 0.78)), radial-gradient(circle at 78% 18%, rgba(255, 200, 87, 0.68), transparent 29%)",
  },
};

export const questions: Question[] = [
  {
    id: "festival-spot",
    prompt: "Dein perfekter Festival-Spot sieht so aus ...",
    answers: [
      { option: "A", label: "Bühne zwischen historischen Mauern oder Weinbergen", resultId: "franken" },
      { option: "B", label: "Vor der Bühne mit Seepanorama", resultId: "oberbayern" },
      { option: "C", label: "Lichtung im Wald oder am Fluss", resultId: "ostbayern" },
      { option: "D", label: "Open-Air vor Alpenkulisse", resultId: "allgaeu-bayerisch-schwaben" },
    ],
  },
  {
    id: "crew-role",
    prompt: "Wenn du mit deiner Crew auf dem Festival unterwegs bist - welche Rolle übernimmst du?",
    answers: [
      {
        option: "A",
        label: "Der/Die Organisator:in: Du hast das Line-up studiert und kennst die ästhetischsten Bühnen und besten Food-Spots",
        resultId: "franken",
      },
      {
        option: "B",
        label: "Der/Die Stimmungsmacher:in: Du bringst alle zusammen, besorgst die nächste Runde und startest den Gesang",
        resultId: "oberbayern",
      },
      {
        option: "C",
        label: "Der/Die Entspannte: Du sorgst dafür, dass alle zwischendurch mal runterkommen und einen Platz im Schatten finden",
        resultId: "ostbayern",
      },
      {
        option: "D",
        label:
          "Die treibende Kraft: Du kennst jeden Shortcut, teilst dir deine Energie perfekt ein und ziehst durch, wenn andere schon schlappmachen",
        resultId: "allgaeu-bayerisch-schwaben",
      },
    ],
  },
  {
    id: "sound",
    prompt: "Welcher Sound bringt dich sofort in Bewegung?",
    answers: [
      { option: "A", label: "Indie, Jazz, kreative Crossover-Sounds", resultId: "franken" },
      { option: "B", label: "Brass, Pop, oder 90s Throwbacks", resultId: "oberbayern" },
      { option: "C", label: "Deep & Atmospheric", resultId: "ostbayern" },
      { option: "D", label: "Electro, Rock, treibende Beats", resultId: "allgaeu-bayerisch-schwaben" },
    ],
  },
  {
    id: "dance",
    prompt: "Tanzen bedeutet für dich ...",
    answers: [
      {
        option: "A",
        label: "Lebensgefühl - du saugst die Kultur des Ortes auf und lebst den Rhythmus",
        resultId: "franken",
      },
      {
        option: "B",
        label: "Gemeinschaft - Arm in Arm mit Freunden mitsingen, bis die Stimme weg ist",
        resultId: "oberbayern",
      },
      {
        option: "C",
        label: "Freiheit - Augen zu, barfuß im Gras, einfach im Moment treiben lassen",
        resultId: "ostbayern",
      },
      {
        option: "D",
        label: "Power - Bass im Bauch, springen, schwitzen, alles geben",
        resultId: "allgaeu-bayerisch-schwaben",
      },
    ],
  },
  {
    id: "afterglow",
    prompt: "Der Festival-Afterglow: Dein perfekter Urlaubs-Moment nach dem Festival ...",
    answers: [
      {
        option: "A",
        label: "Altstadt-Flair genießen, Streetfood probieren und mit einem Glas Wein auf den Sonnenuntergang anstoßen",
        resultId: "franken",
      },
      {
        option: "B",
        label: "Morgens ab in den See, nachmittags auf die Alm und abends in den Biergarten",
        resultId: "oberbayern",
      },
      {
        option: "C",
        label: "Raus aus dem Trubel: Yoga im Grünen oder Spaziergang im Wald",
        resultId: "ostbayern",
      },
      {
        option: "D",
        label: "Früh raus, auf den Gipfel hiken, Paragliding oder den nächsten steilen Bike-Trail shredden",
        resultId: "allgaeu-bayerisch-schwaben",
      },
    ],
  },
];
