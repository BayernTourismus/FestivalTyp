export type FestivalTypeId = 'freigeist' | 'nachtmensch' | 'genussmensch' | 'entdecker'
export type RegionId = 'allgaeu' | 'franken' | 'oberbayern' | 'bayerischer-wald'

export type ResultMeta = {
  id: FestivalTypeId | RegionId
  title: string
  subtitle: string
  description: string
  color: string
}

export type Answer = {
  label: string
  detail: string
  typeScores: Partial<Record<FestivalTypeId, number>>
  regionScores: Partial<Record<RegionId, number>>
}

export type Question = {
  id: string
  prompt: string
  kicker: string
  answers: Answer[]
}

export const festivalTypes: Record<FestivalTypeId, ResultMeta> = {
  freigeist: {
    id: 'freigeist',
    title: 'Freigeist',
    subtitle: 'Du suchst Atmosphaere, Stil und ungeplante Highlights.',
    description: 'Du magst besondere Orte, gute Stories und ein Wochenende, das sich nicht nach Standard anfuehlt.',
    color: '#db6d52'
  },
  nachtmensch: {
    id: 'nachtmensch',
    title: 'Nachtmensch',
    subtitle: 'Dein Festival beginnt, wenn andere ans Aufraeumen denken.',
    description: 'Energie, Beats und spontane Eskalation ziehen dich an. Hauptsache intensiv und mit Zug nach spaet.',
    color: '#7d53de'
  },
  genussmensch: {
    id: 'genussmensch',
    title: 'Genussmensch',
    subtitle: 'Du willst gutes Essen, entspannte Vibes und null Stress.',
    description: 'Fuer dich zaehlt das Gesamtgefuehl: ankommen, geniessen, Leute treffen und den Tag sauber ausklingen lassen.',
    color: '#f0a93b'
  },
  entdecker: {
    id: 'entdecker',
    title: 'Entdecker',
    subtitle: 'Du kombinierst Festival mit Ausflug, Natur und neuen Eindruecken.',
    description: 'Musik ist wichtig, aber du willst rundherum etwas erleben: Wege, Aussicht, Wasser, Kultur oder kleine Umwege.',
    color: '#3f9d73'
  }
}

export const regions: Record<RegionId, ResultMeta> = {
  allgaeu: {
    id: 'allgaeu',
    title: 'Allgaeu',
    subtitle: 'Leicht, offen und nah an Bergen und Sommergefuehl.',
    description: 'Passt zu dir, wenn du Natur, Weite und eine lockere, warme Festivalstimmung suchst.',
    color: '#6bbf59'
  },
  franken: {
    id: 'franken',
    title: 'Franken',
    subtitle: 'Charmant, genussorientiert und kulturell stark.',
    description: 'Gut fuer dich, wenn du Charakter, Kulinarik und ein bisschen lokale Eigenheit schaetzt.',
    color: '#c95c54'
  },
  oberbayern: {
    id: 'oberbayern',
    title: 'Oberbayern',
    subtitle: 'Lebendig, vielseitig und mit starkem Gemeinschaftsgefuehl.',
    description: 'Die richtige Richtung, wenn du auf Energie, gute Erreichbarkeit und grosse Momente stehst.',
    color: '#3f7ad9'
  },
  'bayerischer-wald': {
    id: 'bayerischer-wald',
    title: 'Bayerischer Wald',
    subtitle: 'Ruhiger, tiefer und dichter dran an Natur und Rueckzug.',
    description: 'Das passt, wenn du Authentizitaet, Landschaft und ein etwas entschleunigteres Erlebnis suchst.',
    color: '#306b57'
  }
}

export const questions: Question[] = [
  {
    id: 'arrival',
    kicker: 'Frage 1',
    prompt: 'Wie startet dein perfekter Festival-Tag?',
    answers: [
      {
        label: 'Mit Kaffee, Sonne und einem ruhigen Spaziergang ueber das Gelaende',
        detail: 'Entspannt ankommen',
        typeScores: { genussmensch: 2, entdecker: 1 },
        regionScores: { allgaeu: 1, 'bayerischer-wald': 2 }
      },
      {
        label: 'Mit Plan, Marker im Running Order und direkt zur ersten Entdeckung',
        detail: 'Alles mitnehmen',
        typeScores: { entdecker: 2, freigeist: 1 },
        regionScores: { oberbayern: 1, allgaeu: 2 }
      },
      {
        label: 'Mit wenig Schlaf und der Frage, wo die Afterhour heute endet',
        detail: 'Maximalmodus',
        typeScores: { nachtmensch: 3 },
        regionScores: { oberbayern: 2, franken: 1 }
      }
    ]
  },
  {
    id: 'lineup',
    kicker: 'Frage 2',
    prompt: 'Was reizt dich bei einem Line-up am meisten?',
    answers: [
      {
        label: 'Ueberraschende Acts und kleine Geheimtipps',
        detail: 'Entdecken statt abhaken',
        typeScores: { freigeist: 2, entdecker: 1 },
        regionScores: { franken: 1, allgaeu: 1 }
      },
      {
        label: 'Der eine Headliner, fuer den man spaet noch komplett eskaliert',
        detail: 'Druck auf dem Floor',
        typeScores: { nachtmensch: 3 },
        regionScores: { oberbayern: 2 }
      },
      {
        label: 'Ein stimmiges Gesamtprogramm mit Genussfaktor',
        detail: 'Das Gesamtpaket',
        typeScores: { genussmensch: 2, freigeist: 1 },
        regionScores: { franken: 2 }
      }
    ]
  },
  {
    id: 'camp',
    kicker: 'Frage 3',
    prompt: 'Welche Stimmung im Umfeld passt am besten zu dir?',
    answers: [
      {
        label: 'Weniger Trubel, mehr Natur und Platz zum Durchatmen',
        detail: 'Luft nach oben',
        typeScores: { entdecker: 2, genussmensch: 1 },
        regionScores: { 'bayerischer-wald': 3 }
      },
      {
        label: 'Viele Leute, viel Bewegung, immer irgendwo etwas los',
        detail: 'Dauerstrom',
        typeScores: { nachtmensch: 2, freigeist: 1 },
        regionScores: { oberbayern: 2 }
      },
      {
        label: 'Charmante Ecken, gutes Essen und entspannte Gespraeche',
        detail: 'Qualitaet vor Lautstaerke',
        typeScores: { genussmensch: 2 },
        regionScores: { franken: 2, allgaeu: 1 }
      }
    ]
  },
  {
    id: 'group',
    kicker: 'Frage 4',
    prompt: 'Wie beschreiben dich Freunde auf einem Event?',
    answers: [
      {
        label: 'Du findest immer die besondere Ecke, bevor sie alle kennen',
        detail: 'Radar fuer gute Orte',
        typeScores: { freigeist: 3 },
        regionScores: { allgaeu: 1, franken: 1 }
      },
      {
        label: 'Du haeltst die Gruppe bis spaet zusammen und ziehst nochmal weiter',
        detail: 'Motor der Nacht',
        typeScores: { nachtmensch: 3 },
        regionScores: { oberbayern: 1, franken: 1 }
      },
      {
        label: 'Du achtest darauf, dass es allen gut geht und der Tag rund wird',
        detail: 'Sozialer Ruhepol',
        typeScores: { genussmensch: 2, entdecker: 1 },
        regionScores: { 'bayerischer-wald': 1, allgaeu: 2 }
      }
    ]
  },
  {
    id: 'memory',
    kicker: 'Frage 5',
    prompt: 'Woran erinnerst du dich Wochen spaeter am ehesten?',
    answers: [
      {
        label: 'An diesen einen magischen Moment mit Kulisse und Gaensehaut',
        detail: 'Das besondere Bild bleibt',
        typeScores: { freigeist: 2, entdecker: 1 },
        regionScores: { allgaeu: 2, 'bayerischer-wald': 1 }
      },
      {
        label: 'An die Nacht, die komplett aus dem Ruder lief und genau richtig war',
        detail: 'Legendengefahr',
        typeScores: { nachtmensch: 3 },
        regionScores: { oberbayern: 2 }
      },
      {
        label: 'An Menschen, Geschmack, Stimmung und das runde Gesamtgefuehl',
        detail: 'Der Vibe zaehlt',
        typeScores: { genussmensch: 2 },
        regionScores: { franken: 2, allgaeu: 1 }
      }
    ]
  }
]
