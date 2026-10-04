# Wall Street: Time Machine

Sprint 4.6 carries one investor identity through ten historical visual styles with deterministic moods, crisis treatments, badges, a passport, and a frozen career portrait archive.

Sprint 4.5 adds investor identity, accessible avatar selection, ten information-focused archetypes, traits, perks, mentors, reactions, and behavior-based legacy progression.

Sprint 4 adds six deterministic analyst desks, signal-versus-noise classification, consensus and disagreement, bounded agent memory, and non-mutating portfolio stress scenarios. See [docs/SPRINT_04_REPORT.md](docs/SPRINT_04_REPORT.md).

A turn-based historical market strategy game. **The Great Crash (1928–1933)** combines deterministic simulated prices with curated historical events, reconstructed period reports, strategy profiles, risk monitoring, weekly briefings, objectives, and a benchmark.

## Run locally

```bash
npm install
npm run dev
```

Quality gates: `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.

All market prices are fictional and carry a `SIMULATED DATA` label. Reports are reconstructed, never presented as original quotations. No external API is used. Game code lives in `src/game/`, separate from the UI. See [Architecture](docs/ARCHITECTURE.md), [Game Design](docs/GAME_DESIGN.md), and the [Roadmap](docs/ROADMAP.md).

## Campaign and career

Sprint 2 expands the original Great Crash scenario into an 18-era career timeline. Panic of 1907, The Great Crash, and Oil Shock are playable as standalone episodes and through available career or challenge entries. Saves now use a version 3 archive with automatic import of the version 2 Great Crash save.

## Cinematic game feel

Rounds now reveal date, market moves, new reports, historical events, portfolio impact, and risk in sequence. Persistent settings control animation speed, reduced motion, overlays, ticker motion, and optional synthesized audio.

## Intelligence foundation

Released economic indicators, publication delays, confidence, freshness, research, watchlists, notes, and provenance now sit behind one current-date boundary. All bundled time series are marked reconstructed unless verified historical data exists.
