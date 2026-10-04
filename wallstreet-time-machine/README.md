# Wall Street: Time Machine

A turn-based historical market strategy game. **The Great Crash (1928–1933)** combines deterministic simulated prices with curated historical events, reconstructed period reports, strategy profiles, risk monitoring, weekly briefings, objectives, and a benchmark.

## Run locally

```bash
npm install
npm run dev
```

Quality gates: `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.

All market prices are fictional and carry a `SIMULATED DATA` label. Reports are reconstructed, never presented as original quotations. No external API is used. Game code lives in `src/game/`, separate from the UI. See [Architecture](docs/ARCHITECTURE.md), [Game Design](docs/GAME_DESIGN.md), and the [Roadmap](docs/ROADMAP.md).
