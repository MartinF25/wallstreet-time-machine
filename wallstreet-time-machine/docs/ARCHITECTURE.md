# Architecture

The application uses Next.js 16, React 19, TypeScript, and Tailwind CSS. `src/game` contains pure domain logic with no React dependency. `engine` owns state transitions; `market` produces deterministic prices; `trading` validates and executes orders; `portfolio` calculates valuation and drawdown; `episodes` contains configuration; and `persistence` is the only browser-storage boundary.

The UI receives only the current market state. `getVisibleMarketData`, `getAvailableEvents`, and `getAvailableNews` enforce the current-date boundary. `strategy`, `risk`, and `intelligence` remain pure domain services. `advanceRound` coordinates prices, valuation, newly visible information, regime, risk, briefing, snapshot, and persistence-ready state. State updates are immutable.

## Sprint 2 campaign layer

The campaign layer sits above the episode engine. Era metadata is separate from playable episode content to prevent future information leakage. The shared engine resolves its episode through `EPISODE_REGISTRY`, while career, challenge, progression, and v3 persistence services orchestrate long-term play.

## Presentation layer

`src/game/feel` consumes completed engine output and never drives calculation timing. The client persists the next `GameState` before creating a transient reveal sequence, so skip, navigation, or reload cannot execute a round twice.

## Intelligence layer

Indicator, snapshot, research, and context services accept the current game date and return known information only. `IntelligenceContext` is the future Sprint-4 read boundary. Complete episode datasets are still statically bundled, so a server-only content boundary remains future work.
