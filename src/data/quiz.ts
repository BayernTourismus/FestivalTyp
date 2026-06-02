export type BayernTypeId = "franken" | "oberbayern" | "ostbayern" | "allgaeu-bayerisch-schwaben";

export type QuizLanguage = "de" | "en";

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

export type QuizCopy = {
  headerEyebrow: string;
  headerTitle: string;
  reset: string;
  attractEyebrow: string;
  attractTitle: string;
  attractButton: string;
  startEyebrow: string;
  startTitle: string;
  startDescription: string;
  startTagline: string;
  startButton: string;
  questionLabel: string;
  back: string;
  answerHint: string;
  calculating: string;
  resultEyebrow: string;
  resultVibeLabel: string;
  scanCopy: string;
  qrAriaLabel: string;
  homeButton: string;
};

export type QuizContent = {
  copy: QuizCopy;
  questions: Question[];
  results: Record<BayernTypeId, ResultMeta>;
};

export const defaultLanguage: QuizLanguage = "en";

export const languageLabels: Record<QuizLanguage, string> = {
  de: "Deutsch",
  en: "English",
};

export const resultOrder: BayernTypeId[] = ["franken", "oberbayern", "ostbayern", "allgaeu-bayerisch-schwaben"];

const resultStyles: Record<BayernTypeId, Pick<ResultMeta, "color" | "accent" | "backdrop" | "guideUrl">> = {
  franken: {
    guideUrl: "https://www.erlebe.bayern/regionen/franken/",
    color: "#8a3f6f",
    accent: "#f0b84a",
    backdrop:
      "linear-gradient(135deg, rgba(138, 63, 111, 0.95), rgba(184, 74, 83, 0.82)), radial-gradient(circle at 74% 16%, rgba(240, 184, 74, 0.72), transparent 31%)",
  },
  oberbayern: {
    guideUrl: "https://www.erlebe.bayern/regionen/oberbayern/",
    color: "#0050a0",
    accent: "#6ec1e4",
    backdrop:
      "linear-gradient(135deg, rgba(0, 80, 160, 0.94), rgba(30, 132, 165, 0.82)), radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.66), transparent 28%)",
  },
  ostbayern: {
    guideUrl: "https://www.erlebe.bayern/regionen/ostbayern/",
    color: "#25664d",
    accent: "#91c46c",
    backdrop:
      "linear-gradient(135deg, rgba(37, 102, 77, 0.95), rgba(33, 83, 103, 0.86)), radial-gradient(circle at 78% 18%, rgba(145, 196, 108, 0.68), transparent 30%)",
  },
  "allgaeu-bayerisch-schwaben": {
    guideUrl: "https://www.erlebe.bayern/regionen/allgaeu-bayerisch-schwaben/",
    color: "#c04e24",
    accent: "#ffc857",
    backdrop:
      "linear-gradient(135deg, rgba(192, 78, 36, 0.96), rgba(130, 66, 143, 0.78)), radial-gradient(circle at 78% 18%, rgba(255, 200, 87, 0.68), transparent 29%)",
  },
};

const withStyle = (result: Omit<ResultMeta, "color" | "accent" | "backdrop" | "guideUrl">): ResultMeta => ({
  ...resultStyles[result.id],
  ...result,
});

export const quizContent: Record<QuizLanguage, QuizContent> = {
  de: {
    copy: {
      headerEyebrow: "Servus Urlaub",
      headerTitle: "Welcher Bayern-Typ bist du?",
      reset: "Reset",
      attractEyebrow: "Bayern gehört erlebt",
      attractTitle: "Natürlich. Echt. Bayerisch.",
      attractButton: "Tippen zum Starten",
      startEyebrow: "60-Sekunden-Quiz",
      startTitle: "Reif für eine Auszeit - aber welche Region Bayerns passt wirklich zu dir?",
      startDescription: "Mach das 60-Sekunden-Quiz und finde heraus, welcher Bayern-Typ du bist!",
      startTagline: "Natürlich. Echt. Bayerisch.",
      startButton: "Start",
      questionLabel: "Frage",
      back: "Zurück",
      answerHint: "Antwort antippen, nächste Frage kommt automatisch.",
      calculating: "Dein Bayern-Typ wird ermittelt...",
      resultEyebrow: "Dein Bayern-Typ",
      resultVibeLabel: "Dein Vibe",
      scanCopy: "Scannen und deinen Bayern-Typ erleben!",
      qrAriaLabel: "QR-Code",
      homeButton: "Zur Startseite",
    },
    questions: [
      {
        id: "vacation-mood",
        prompt: "Welches Gefühl beschreibt deine perfekte Urlaubsstimmung?",
        answers: [
          {
            option: "A",
            label: "Inspirierend - wenn Geschichte, Kreativität und regionaler Genuss zu einem einzigartigen Erlebnis werden",
            resultId: "franken",
          },
          {
            option: "B",
            label: "Befreiend - wenn ich unter freiem Himmel bin und mich einfach im Moment treiben lassen kann",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "Verbindend - wenn ich mit anderen zusammen lache, feiere und das Leben in vollen Zügen genieße",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "Fordernd - wenn ich den Puls spüre und die Natur mich zu neuen Höchstleistungen antreibt",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
      {
        id: "vacation-activity",
        prompt: "Welche Aktivität macht dich im Urlaub wunschlos glücklich?",
        answers: [
          {
            option: "A",
            label: "Durch prunkvolle Residenzen schlendern und danach in einem Straßencafé die urbane Kultur aufsaugen",
            resultId: "franken",
          },
          {
            option: "B",
            label: "Eine Wanderung durch tiefe Wälder, bei der du stundenlang keinem anderen Menschen begegnest",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "Eine Bootstour auf dem See, gefolgt von einer geselligen Einkehr auf einer sonnigen Alm",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "Mountainbiken, Klettern oder eine anspruchsvolle Gipfeltour - Hauptsache, der Puls steigt",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
      {
        id: "vacation-home",
        prompt: "Dein perfektes Urlaubs-Zuhause sieht so aus ...",
        answers: [
          {
            option: "A",
            label: "Ein charmantes Boutique-Hotel in einer historischen Altstadt oder direkt in den Weinbergen",
            resultId: "franken",
          },
          {
            option: "B",
            label: "Eine Hütte auf einer Waldlichtung oder nah an einem Fluss",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "Ein gemütliches Chalet mit Seepanorama und Alpenblick",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "Ein sportliches Basecamp oder der Camper direkt vor der nächsten Bergkulisse",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
      {
        id: "travel-luggage",
        prompt: "Was darf in deinem Reisegepäck auf keinen Fall fehlen?",
        answers: [
          {
            option: "A",
            label: "Ein gutes Buch, ein schickes Outfit für abends und noch etwas Platz für regionale Souvenirs",
            resultId: "franken",
          },
          {
            option: "B",
            label: "Die Hängematte, bequeme Schuhe und komplett ausgestellte Benachrichtigungen am Handy",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "Die Badekleidung, eine Picknickdecke und ein Kartenspiel für die ganze Runde",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "Die Sportuhr, das Klettersteigset oder direkt das Bike auf dem Autodach",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
      {
        id: "travel-memory",
        prompt: "Der perfekte Abschlussmoment deiner Reise: Was nimmst du als Erinnerung mit nach Hause?",
        answers: [
          {
            option: "A",
            label: "Eine Flasche regionalen Wein und Inspiration durch gelebte Geschichte und Kultur",
            resultId: "franken",
          },
          {
            option: "B",
            label: "Völlige innere Ruhe, Entschleunigung und das Rauschen der unberührten Natur im Ohr",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "Unzählige Fotos mit deinen Liebsten vor Postkarten-Kulissen und die Vorfreude aufs nächste Mal",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "Muskelkater, ein strahlendes Gesicht und die getrackte Route deiner neuen Bestleistung",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
    ],
    results: {
      franken: withStyle({
        id: "franken",
        title: "Der Kultur-Genießer",
        region: "Franken",
        vibe: "Stilvoll. Entspannt. Neugierig.",
        description:
          "Du reist am liebsten dorthin, wo jahrhundertealte Geschichte auf modernen Lebensgenuss trifft. Zwischen Weinreben, historischen Prachtbauten und kreativen Städten fühlst du dich zuhause. Für dich ist Urlaub mehr als nur Sightseeing - es ist das Eintauchen in eine echte Atmosphäre. Genau dieses Gefühl erwartet dich in Franken! Hier verbindet sich hochkarätige Kultur mit urbanem Altstadt-Flair und herausragender Kulinarik. Tagsüber entdeckst du charmante Gassen und UNESCO-Welterbestätten, abends lässt du den Tag bei einem Glas Silvaner in einer traditionellen Heckenwirtschaft ausklingen. Entdecke ein Bayern, das kreativ, genussvoll und einzigartig ist. Dein Bayern: inspiriert, geschmackvoll und voller Charakter.",
        cta: "Jetzt Franken entdecken",
        guideLabel: "Digitaler Reiseführer zur Urlaubsregion Franken",
      }),
      oberbayern: withStyle({
        id: "oberbayern",
        title: "Der Panorama-Performer",
        region: "Oberbayern",
        vibe: "Emotional. Gesellig. Grenzenlos.",
        description:
          "Du liebst große Gefühle und beeindruckende Kulissen - am liebsten mit kristallklarem Seeblick und majestätischen Bergen. Urlaub ist für dich Gemeinschaft: zusammen lachen, erleben und genießen. In Oberbayern findest du genau diese Lebensfreude. Hier trifft bayerische Tradition auf moderne Leichtigkeit. Erst Erfrischung beim Schwimmen oder Stand-Up-Paddling auf dem See, danach eine entspannte Fahrt mit der Bergbahn oder mit der Crew in den gemütlichen Biergarten. Dein Bayern feiert das Leben, die Geselligkeit und bietet dir die perfekte Postkarten-Kulisse für unvergessliche Erinnerungen. Dein Bayern: aktiv, fröhlich und immer ein bisschen spektakulär.",
        cta: "Jetzt Oberbayern erleben",
        guideLabel: "Digitaler Reiseführer zur Urlaubsregion Oberbayern",
      }),
      ostbayern: withStyle({
        id: "ostbayern",
        title: "Der Natur-Freigeist",
        region: "Ostbayern",
        vibe: "Authentisch. Erdverbunden. Frei.",
        description:
          "Du suchst im Urlaub das Ursprüngliche - wo du den Alltag komplett hinter dir lassen kannst. Ostbayern ist genau dein Ding: endlose Wälder, wilde Flüsse und echte, herzliche Begegnungen. Weit weg vom Massentourismus findest du hier den perfekten Raum zur Entschleunigung. Zwischen dem Nationalpark Bayerischer Wald und sanften Hügellandschaften gibt es verborgene Pfade und kulturelle Geheimtipps zu entdecken. Tagsüber durchstreifst du tiefe Wälder oder gleitest mit dem Kanu übers Wasser, abends genießt du die Stille und den weiten Sternenhimmel. Dein Bayern ist ein Ort zum Durchatmen und Krafttanken. Dein Bayern: echt, ruhig und zum Durchatmen gemacht.",
        cta: "Jetzt Ostbayern erleben",
        guideLabel: "Digitaler Reiseführer zur Urlaubsregion Ostbayern",
      }),
      "allgaeu-bayerisch-schwaben": withStyle({
        id: "allgaeu-bayerisch-schwaben",
        title: "Der Gipfel-Stürmer",
        region: "Allgäu / Bayerisch Schwaben",
        vibe: "Dynamisch. Kreativ. Abenteuerlustig.",
        description:
          "Langes Rumliegen am Pool ist nichts für dich - du navigierst clever durchs Leben und bleibst auch im Urlaub immer in Bewegung. Willkommen im Allgäu und in Bayerisch-Schwaben! Hier verschmelzen spektakuläre Outdoor-Action, weite Rad- und Flusslandschaften und echte Alpinkultur zu deinem perfekten Aktivurlaub. Ob anspruchsvolles Bergsteigen, weite Gravel-Bike-Touren oder Wassersport - hier pusht dich die Natur ans Limit und belohnt dich mit atemberaubenden Aussichten. Dein Bayern ist sportlich, smart und voller Drive. Dein Bayern: sportlich, lebendig und voller Ideen.",
        cta: "Jetzt Allgäu/Bayerisch-Schwaben erleben",
        guideLabel: "Die Urlaubsregion Allgäu/Bayerisch-Schwaben",
      }),
    },
  },
  en: {
    copy: {
      headerEyebrow: "Servus Urlaub",
      headerTitle: "What Bavaria Type Are You?",
      reset: "Reset",
      attractEyebrow: "Bavaria is meant to be experienced",
      attractTitle: "Natural. Authentic. Bavarian.",
      attractButton: "Tap to start",
      startEyebrow: "60-second quiz",
      startTitle: "Ready for a getaway - but which region of Bavaria really suits you?",
      startDescription: "Take the 60-second quiz and find out what Bavaria type you are!",
      startTagline: "Natural. Authentic. Bavarian.",
      startButton: "Start",
      questionLabel: "Question",
      back: "Back",
      answerHint: "Tap an answer, the next question follows automatically.",
      calculating: "Finding your Bavaria type...",
      resultEyebrow: "Your Bavaria Type",
      resultVibeLabel: "Your Vibe",
      scanCopy: "Scan and experience your Bavaria type!",
      qrAriaLabel: "QR code",
      homeButton: "Back to start",
    },
    questions: [
      {
        id: "vacation-mood",
        prompt: "Which feeling describes your perfect vacation mood?",
        answers: [
          {
            option: "A",
            label: "Inspiring - when history, creativity, and regional indulgence become a unique experience",
            resultId: "franken",
          },
          {
            option: "B",
            label: "Liberating - when I'm under the open sky and can simply drift in the moment",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "Connecting - when I laugh, celebrate, and enjoy life to the fullest with others",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "Challenging - when I feel my pulse and nature drives me to new peak performances",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
      {
        id: "vacation-activity",
        prompt: "Which activity makes you blissfully happy on vacation?",
        answers: [
          {
            option: "A",
            label: "Strolling through magnificent residences and then soaking up urban culture in a street café",
            resultId: "franken",
          },
          {
            option: "B",
            label: "A hike through deep forests where you don't encounter another person for hours",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "A boat tour on the lake, followed by a convivial stop at a sunny alpine pasture",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "Mountain biking, climbing, or a challenging summit tour - as long as the pulse rises",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
      {
        id: "vacation-home",
        prompt: "Your perfect vacation home looks like this ...",
        answers: [
          {
            option: "A",
            label: "A charming boutique hotel in a historic old town or right in the vineyards",
            resultId: "franken",
          },
          {
            option: "B",
            label: "A cabin in a forest clearing or close to a river",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "A cozy chalet with lake panorama and Alpine views",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "A sporty base camp or the camper right in front of the next mountain backdrop",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
      {
        id: "travel-luggage",
        prompt: "What absolutely cannot be missing from your travel luggage?",
        answers: [
          {
            option: "A",
            label: "A good book, a chic outfit for the evening, and some space for regional souvenirs",
            resultId: "franken",
          },
          {
            option: "B",
            label: "The hammock, comfortable shoes, and completely disabled notifications on the phone",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "Swimwear, a picnic blanket, and a card game for the whole group",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "The sports watch, the via ferrata set, or the bike directly on the car roof",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
      {
        id: "travel-memory",
        prompt: "The perfect closing moment of your trip: What do you take home as a memory?",
        answers: [
          {
            option: "A",
            label: "A bottle of regional wine and inspiration from lived history and culture",
            resultId: "franken",
          },
          {
            option: "B",
            label: "Complete inner peace, deceleration, and the sound of untouched nature in your ears",
            resultId: "ostbayern",
          },
          {
            option: "C",
            label: "Countless photos with your loved ones in front of postcard backdrops and anticipation for next time",
            resultId: "oberbayern",
          },
          {
            option: "D",
            label: "Sore muscles, a beaming face, and the tracked route of your new personal best",
            resultId: "allgaeu-bayerisch-schwaben",
          },
        ],
      },
    ],
    results: {
      franken: withStyle({
        id: "franken",
        title: "The Culture Connoisseur",
        region: "Franconia",
        vibe: "Stylish. Relaxed. Curious.",
        description:
          "You prefer to travel where centuries-old history meets modern enjoyment of life. Between vineyards, historic magnificent buildings, and creative cities, you feel at home. For you, vacation is more than just sightseeing - it's immersing yourself in a real atmosphere. This exact feeling awaits you in Franconia! Here, top-notch culture combines with urban old-town flair and outstanding culinary arts. During the day you discover charming alleyways and UNESCO World Heritage sites, in the evening you wind down the day with a glass of Silvaner in a traditional Heckenwirtschaft. Discover a Bavaria that is creative, indulgent, and unique. Your Bavaria: inspired, tasteful, and full of character.",
        cta: "Discover Franconia now",
        guideLabel: "Digital travel guide for the Franconia vacation region",
      }),
      oberbayern: withStyle({
        id: "oberbayern",
        title: "The Panorama Performer",
        region: "Upper Bavaria",
        vibe: "Emotional. Sociable. Boundless.",
        description:
          "You love big emotions and impressive backdrops - preferably with crystal-clear lake views and majestic mountains. Vacation for you is community: laughing, experiencing, and enjoying together. In Upper Bavaria you'll find exactly this joie de vivre. Here, Bavarian tradition meets modern lightness. First refreshment while swimming or stand-up paddling on the lake, then a relaxing ride on the mountain railway or with the crew to the cozy beer garden. Your Bavaria celebrates life, sociability, and offers you the perfect postcard backdrop for unforgettable memories. Your Bavaria: active, cheerful, and always a little spectacular.",
        cta: "Experience Upper Bavaria now",
        guideLabel: "Digital travel guide for the Upper Bavaria vacation region",
      }),
      ostbayern: withStyle({
        id: "ostbayern",
        title: "The Nature Free Spirit",
        region: "Eastern Bavaria",
        vibe: "Authentic. Grounded. Free.",
        description:
          "You seek the original on vacation - where you can completely leave everyday life behind. Eastern Bavaria is exactly your thing: endless forests, wild rivers, and genuine, heartfelt encounters. Far away from mass tourism, you'll find the perfect space for deceleration here. Between the Bavarian Forest National Park and gentle hill landscapes, there are hidden trails and cultural insider tips to discover. During the day you roam through deep forests or glide across the water in a canoe, in the evening you enjoy the silence and the vast starry sky. Your Bavaria is a place to breathe deeply and recharge. Your Bavaria: authentic, quiet, and made for taking a breath.",
        cta: "Experience Eastern Bavaria now",
        guideLabel: "Digital travel guide for the Eastern Bavaria vacation region",
      }),
      "allgaeu-bayerisch-schwaben": withStyle({
        id: "allgaeu-bayerisch-schwaben",
        title: "The Peak Conqueror",
        region: "Allgäu / Bavarian Swabia",
        vibe: "Dynamic. Creative. Adventurous.",
        description:
          "Lying around the pool for a long time is nothing for you - you navigate cleverly through life and stay in motion even on vacation. Welcome to Allgäu and Bavarian Swabia! Here, spectacular outdoor action, expansive cycling and river landscapes, and authentic Alpine culture merge into your perfect active vacation. Whether challenging mountaineering, extensive gravel bike tours, or water sports - here nature pushes you to the limit and rewards you with breathtaking views. Your Bavaria is sporty, smart, and full of drive. Your Bavaria: athletic, lively, and full of ideas.",
        cta: "Experience Allgäu/Bavarian Swabia now",
        guideLabel: "Digital travel guide for the Allgäu/Bavarian Swabia vacation region",
      }),
    },
  },
};
