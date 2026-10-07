# Architecture

## Decision and market memory

`src/game/decision-memory` owns compact decision/context snapshots, per-asset price points, bounded known-date selectors, outcome snapshots, market metrics, and round recap records. Engine transitions append history; trading creates and links decisions; React only presents these projections.

## Game HUD and round projection

`src/components/game-hud.tsx` presents active gameplay through four stable zones. `src/game/round-investment` derives the current-round ledger from engine state and trades, keeping financial calculation outside React. The HUD consumes existing exposure, margin, identity, era, and reveal services and does not mutate gameplay.

## Historical data and advanced trading

`src/game/historical-data` separates providers, provenance, normalization, validation, caching, dataset versions, and known-date filtering. Provider availability never changes the deterministic episode fallback. `src/game/advanced-trading` owns dated market rules, the trading calendar, short liabilities, borrow accrual, margin accounting, calls, exposure, and forced covers; the engine coordinates those pure services at round boundaries.

The identity presentation resolver is a pure layer above campaign metadata. It accepts public era IDs and visual state only; it cannot access future events, prices, outcomes, or trading services.

The pure `identity` domain owns profiles, catalogs, bounded loadouts, presentation preferences, reactions, migration defaults, and legacy derivation. React identity screens consume these services without changing the market engine.

The Agent Layer (`src/game/agents`) sits above the Intelligence Layer. It consumes only immutable, date-filtered `AgentContext` values and returns analyses; it has no trading or episode-data dependency. Campaign persistence stores bounded analysis and signal history.

The application uses Next.js 16, React 19, TypeScript, and Tailwind CSS. `src/game` contains pure domain logic with no React dependency. `engine` owns state transitions; `market` produces deterministic prices; `trading` validates and executes orders; `portfolio` calculates valuation and drawdown; `episodes` contains configuration; and `persistence` is the only browser-storage boundary.

The UI receives only the current market state. `getVisibleMarketData`, `getAvailableEvents`, and `getAvailableNews` enforce the current-date boundary. `strategy`, `risk`, and `intelligence` remain pure domain services. `advanceRound` coordinates prices, valuation, newly visible information, regime, risk, briefing, snapshot, and persistence-ready state. State updates are immutable.

## Sprint 2 campaign layer

The campaign layer sits above the episode engine. Era metadata is separate from playable episode content to prevent future information leakage. The shared engine resolves its episode through `EPISODE_REGISTRY`, while career, challenge, progression, and v3 persistence services orchestrate long-term play.

## Presentation layer

`src/game/feel` consumes completed engine output and never drives calculation timing. The client persists the next `GameState` before creating a transient reveal sequence, so skip, navigation, or reload cannot execute a round twice.

## Intelligence layer

Indicator, snapshot, research, and context services accept the current game date and return known information only. `IntelligenceContext` is the future Sprint-4 read boundary. Complete episode datasets are still statically bundled, so a server-only content boundary remains future work.
# Character Foundation

`src/game/character-foundation` enthält Modell, Kataloge, Zod-Schema und pure Services. Der Character wird über `InvestorProfile.character` in die bestehende Identity- und Campaign-Architektur eingebunden. UI-Komponenten lesen Katalogdaten und effektive Werte, verändern die Modifier-Logik aber nicht.

