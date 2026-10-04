# Architecture

The application uses Next.js 16, React 19, TypeScript, and Tailwind CSS. `src/game` contains pure domain logic with no React dependency. `engine` owns state transitions; `market` produces deterministic prices; `trading` validates and executes orders; `portfolio` calculates valuation and drawdown; `episodes` contains configuration; and `persistence` is the only browser-storage boundary.

The UI receives only the current market state. `getVisibleMarketData`, `getAvailableEvents`, and `getAvailableNews` enforce the current-date boundary. `strategy`, `risk`, and `intelligence` remain pure domain services. `advanceRound` coordinates prices, valuation, newly visible information, regime, risk, briefing, snapshot, and persistence-ready state. State updates are immutable.

## Sprint 2 campaign layer

The campaign layer sits above the episode engine. Era metadata is separate from playable episode content to prevent future information leakage. The shared engine resolves its episode through `EPISODE_REGISTRY`, while career, challenge, progression, and v3 persistence services orchestrate long-term play.
