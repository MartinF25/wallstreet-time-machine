# Architecture

The application uses Next.js 16, React 19, TypeScript, and Tailwind CSS. `src/game` contains pure domain logic with no React dependency. `engine` owns state transitions; `market` produces deterministic prices; `trading` validates and executes orders; `portfolio` calculates valuation and drawdown; `episodes` contains configuration; and `persistence` is the only browser-storage boundary.

The UI receives only the current market state. `getVisibleMarketData` filters points through `currentDate`, establishing the contract for a future server-backed provider. State updates are immutable. Cash is held directly on `GameState`, not duplicated as a position. Fees are included in acquisition cost and deducted on every transaction.
