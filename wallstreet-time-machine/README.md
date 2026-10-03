# Wall Street: Time Machine

A turn-based historical market strategy game. The foundation release contains a playable, fully simulated **Great Crash Prologue (1928–1929)** with deterministic weekly prices, trading, portfolio accounting, local saves, and an episode report.

## Run locally

```bash
npm install
npm run dev
```

Quality gates: `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.

All current market values are fictional and carry a `SIMULATED DATA` label. No external data source or paid API is used. Game code lives in `src/game/`, separate from the UI. See [Architecture](docs/ARCHITECTURE.md), [Game Design](docs/GAME_DESIGN.md), and the [Roadmap](docs/ROADMAP.md).
