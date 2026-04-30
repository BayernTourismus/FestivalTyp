# FestivalTyp Quiz Demo

Kleine offline-faehige PWA-Demo fuer ein Event-Tablet. Die App laeuft als statische Vite/React-Anwendung und kann direkt bei Vercel deployed werden.

## Lokal starten

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Vercel Deploy

1. Repository nach GitHub pushen.
2. In Vercel ein neues Projekt aus dem Repository anlegen.
3. Framework Preset `Vite` waehlen.
4. Build Command auf `npm run build` lassen.
5. Output Directory `dist` verwenden.

Danach ist die Demo direkt erreichbar.

## PWA auf dem Tablet testen

- URL auf dem Tablet oeffnen
- Im Browser zum Home-Bildschirm hinzufuegen
- Als installierte Web-App im Vollbild starten
- Fuer iPad zusaetzlich `Guided Access` aktivieren

## Demo-Inhalt anpassen

- Fragen und Antworten: `src/data/quiz.ts`
- Quiz-Logik und Scoring: `src/lib/scoring.ts`
- Layout und Farben: `src/styles/app.css`

## Aktueller Umfang

- 5 Demo-Fragen
- Auswertung fuer 4 Festival-Typen
- Zuordnung zu 4 Bayern-Regionen
- Offline-Cache per Service Worker
- Auto-Reset nach 45 Sekunden Inaktivitaet
