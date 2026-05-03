export type FestivalTypeId = 'alpenrausch' | 'seensucht' | 'cityflow' | 'waldrausch'
export type RegionId = 'allgaeu' | 'seenland' | 'staedte' | 'bayerischer-wald'

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
  alpenrausch: {
    id: 'alpenrausch',
    title: 'Alpenrausch',
    subtitle: 'Große Gefühle, klare Luft und Aussicht mit Nachhall.',
    description:
      'Heute tanzt du im Bass, morgen stehst du am Gipfel. Du suchst Intensität, Freiheit und diese Momente, die lange bleiben.',
    color: '#2d63b8'
  },
  seensucht: {
    id: 'seensucht',
    title: 'Seensucht',
    subtitle: 'Wasser, Weite und gute Vibes nach einer langen Nacht.',
    description:
      'Du brauchst Sonne auf der Haut, einen Steg am Wasser und genug Leichtigkeit, um Festival-Ekstase in Erholung zu verwandeln.',
    color: '#2f8db7'
  },
  cityflow: {
    id: 'cityflow',
    title: 'Cityflow',
    subtitle: 'Urban, schnell und immer auf der Suche nach dem nächsten Spot.',
    description:
      'Tagsüber Coffee Spots, nachts Clubs. Du magst Kontraste, Szenegefühl und Orte, an denen immer noch ein zweiter Abend wartet.',
    color: '#6d52c8'
  },
  waldrausch: {
    id: 'waldrausch',
    title: 'Waldrausch',
    subtitle: 'Deep, erdend und am liebsten mit Natur als Gegenpol.',
    description:
      'Du liebst intensive Nächte, brauchst aber Wald, Ruhe und Weite zum Auftanken. Nebel über Baumwipfeln schlägt Großstadtlärm.',
    color: '#2f7a61'
  }
}

export const regions: Record<RegionId, ResultMeta> = {
  allgaeu: {
    id: 'allgaeu',
    title: 'Allgäu & Alpenrand',
    subtitle: 'Für freie Köpfe, Höhenluft und ein Wochenende mit Weitblick.',
    description:
      'Dein Match liegt zwischen Bergen, klaren Seen und dem Gefühl, sofort draußen und weit weg zu sein.',
    color: '#3a79d0'
  },
  seenland: {
    id: 'seenland',
    title: 'Bayerns Seen',
    subtitle: 'Sonnenuntergang, Badesteg und Recovery mit Aussicht.',
    description:
      'Chiemsee, Starnberger See oder Fränkisches Seenland passen zu dir, wenn dein perfekter Ausklang leicht, offen und wassernahe ist.',
    color: '#2f9abf'
  },
  staedte: {
    id: 'staedte',
    title: 'Bayerns Städte',
    subtitle: 'Szene, Kultur und ein Flow zwischen Gassen, Bars und Rooftops.',
    description:
      'München, Nürnberg, Würzburg oder Regensburg passen zu dir, wenn du Energie, Stil und urbane Kontraste suchst.',
    color: '#7a5ad2'
  },
  'bayerischer-wald': {
    id: 'bayerischer-wald',
    title: 'Bayerischer Wald',
    subtitle: 'Natur, Tiefe und ein bisschen Mystik nach dem Bass.',
    description:
      'Hier passt du hin, wenn dein ideales Festival-Wochenende auch Raum für Waldwege, Nebel und echte Entschleunigung braucht.',
    color: '#31735e'
  }
}

export const questions: Question[] = [
  {
    id: 'sunday',
    kicker: 'Frage 1',
    prompt: 'Dein perfekter Sonntag nach dem Festival?',
    answers: [
      {
        label: 'Ab an den See. Ruhe, Sonne, einfach treiben lassen.',
        detail: 'See statt Stress',
        typeScores: { seensucht: 3 },
        regionScores: { seenland: 3 }
      },
      {
        label: 'City-Brunch, später Rooftop-Bar und noch ein bisschen weiterziehen.',
        detail: 'Stadt zieht weiter',
        typeScores: { cityflow: 3 },
        regionScores: { staedte: 3 }
      },
      {
        label: 'Wanderschuhe an und rauf auf einen Gipfel mit Aussicht.',
        detail: 'Höhe statt Kater',
        typeScores: { alpenrausch: 3 },
        regionScores: { allgaeu: 3 }
      },
      {
        label: 'Mit Freunden durch kleine Gassen oder Waldwege treiben lassen.',
        detail: 'Leise weiterfühlen',
        typeScores: { waldrausch: 2, seensucht: 1 },
        regionScores: { 'bayerischer-wald': 2, staedte: 1 }
      }
    ]
  },
  {
    id: 'sound',
    kicker: 'Frage 2',
    prompt: 'Welcher Sound-Vibe passt heute zu dir?',
    answers: [
      {
        label: 'Deep und atmosphärisch, eher Sog als Show.',
        detail: 'Tief rein',
        typeScores: { waldrausch: 3 },
        regionScores: { 'bayerischer-wald': 3 }
      },
      {
        label: 'Urban Pop und Hip-Hop mit Druck nach vorne.',
        detail: 'City auf laut',
        typeScores: { cityflow: 3 },
        regionScores: { staedte: 3 }
      },
      {
        label: 'Indie, Alternative oder Singer-Songwriter mit Weite.',
        detail: 'Frei und offen',
        typeScores: { alpenrausch: 2, seensucht: 1 },
        regionScores: { allgaeu: 2, seenland: 1 }
      },
      {
        label: 'Party, Throwbacks und dieser eine Song, den alle mitgrölen.',
        detail: 'Leicht und laut',
        typeScores: { seensucht: 2, cityflow: 1 },
        regionScores: { seenland: 2, staedte: 1 }
      }
    ]
  },
  {
    id: 'crew',
    kicker: 'Frage 3',
    prompt: 'Deine Crew beschreibt dich am ehesten als …',
    answers: [
      {
        label: 'freiheitsliebend und immer offen für den spontanen Abzweig',
        detail: 'Freigeist',
        typeScores: { alpenrausch: 3 },
        regionScores: { allgaeu: 3 }
      },
      {
        label: 'Trendsetter mit Gespür für neue Orte und gute Szenen',
        detail: 'Vorne dabei',
        typeScores: { cityflow: 3 },
        regionScores: { staedte: 3 }
      },
      {
        label: 'Naturmensch, der nach der Nacht wieder Luft braucht',
        detail: 'Draußen zuhause',
        typeScores: { waldrausch: 3 },
        regionScores: { 'bayerischer-wald': 3 }
      },
      {
        label: 'Genießer, der Stimmung, Menschen und den Moment sammelt',
        detail: 'Vibes statt Hektik',
        typeScores: { seensucht: 2, cityflow: 1 },
        regionScores: { seenland: 2, staedte: 1 }
      }
    ]
  },
  {
    id: 'insta',
    kicker: 'Frage 4',
    prompt: 'Was wäre dein perfektes Motiv direkt nach dem Festival?',
    answers: [
      {
        label: 'Sonnenuntergang über Bergen',
        detail: 'Horizont an',
        typeScores: { alpenrausch: 3 },
        regionScores: { allgaeu: 3 }
      },
      {
        label: 'Street Art, Skyline und Licht von oben',
        detail: 'Stadtbild mit Puls',
        typeScores: { cityflow: 3 },
        regionScores: { staedte: 3 }
      },
      {
        label: 'Spiegelnder Bergsee oder ein stiller Steg am Wasser',
        detail: 'Ruhe in Blau',
        typeScores: { seensucht: 3 },
        regionScores: { seenland: 3 }
      },
      {
        label: 'Waldkante, Nebel und ein Weg, der einfach weiterführt',
        detail: 'Mystisch raus',
        typeScores: { waldrausch: 3 },
        regionScores: { 'bayerischer-wald': 3 }
      }
    ]
  },
  {
    id: 'recovery',
    kicker: 'Frage 5',
    prompt: 'Wie klingt für dich das beste Festival-Recovery-Wochenende?',
    answers: [
      {
        label: 'Wellness, klare Luft und ein Zimmer mit Bergblick',
        detail: 'Runterkommen mit Aussicht',
        typeScores: { alpenrausch: 2, seensucht: 1 },
        regionScores: { allgaeu: 3 }
      },
      {
        label: 'Badesee, Sonnenuntergang und tagsüber einfach nichts müssen',
        detail: 'Recovery am Wasser',
        typeScores: { seensucht: 3 },
        regionScores: { seenland: 3 }
      },
      {
        label: 'Noch einen Tag Stadtgefühl: Kaffee, Kultur, später Drinks',
        detail: 'Das Wochenende weiterziehen',
        typeScores: { cityflow: 3 },
        regionScores: { staedte: 3 }
      },
      {
        label: 'Vanlife, Wald und endlich wieder tief durchatmen',
        detail: 'Leiser, aber nicht langweilig',
        typeScores: { waldrausch: 3 },
        regionScores: { 'bayerischer-wald': 3 }
      }
    ]
  }
]
