# Sprint 05 Report

## Repository State and Sprint 4.6 Verification

Sprint 5 builds on `53d96cb`, with investor identity, era presentation, 73 tests, and a green production build. The received full prompt contains both Historical Data and Advanced Trading scope.

## Historical Data Architecture

A source registry, normalized observation/price/dataset models, provider interface, cache, validation, fallback chain, health states, Fog-of-History filter, dataset manifest, and import/status/validation commands are implemented. World Bank and ECB are functioning HTTP adapters. FRED/ALFRED remains key- and series-rights-gated; Alpha Vantage remains inactive pending a licensed commercial plan.

## Source Evaluation, Licensing, and Provenance

Every source records coverage, latency, vintage capability, authentication, limits, attribution, commercial status, and notes. World Bank open datasets generally use CC BY 4.0 with indicator-specific exceptions. ECB rights are dataset-specific. FRED data may be third-party copyrighted. No prohibited raw dataset is committed.

## Normalization, Quality, Vintage, and Versioning

Historical, reconstructed, simulated, and placeholder classifications remain strict. Quality uses Verified/High/Medium/Low/Unknown. Observation date, release date, availability, real-time range, and vintage fields remain separate. Careers pin dataset `s5-2026-10-04.1` for reproducibility.

## Market Prices, Assets, Rules, and Calendar

Models cover OHLCV, raw/adjusted values, corporate actions, asset availability, and daily/weekly/monthly price bars. Early episodes retain labeled reconstructed proxies. Date-effective market rules and a weekend/special-closure calendar are wired into day advancement.

## Short Selling, Cover, Borrow, and Margin

SHORT and COVER support partial/full closing, correct restricted proceeds, collateral, realized/unrealized P&L, fees, round-based borrow accrual, initial and maintenance margin, calls, resolution, and delayed forced cover. Strategy limits cover shorts, gross exposure, and leverage. Squeeze risk uses player-specific evidence only.

## Exposure, Risk, Agents, and Character Integration

The UI shows long, short, gross, net, margin, borrow cost, explicit short cards, and margin calls. Risk evaluates short concentration, utilization, leverage, and squeeze pressure. Existing agents already consume risk alerts and portfolio state; identity perks change explanation only, never margin terms or returns.

## Fog of History, Boundary, Security, and Offline Behavior

The normalized service filters both observation and availability dates and supports real-time ranges. Provider calls are designed for server/build/admin use. Keys are never referenced from client code. Cache and curated/simulated fallbacks keep play available offline. Complete episode content remains statically bundled from earlier sprints and still requires a server content boundary before production-scale future episodes.

## Save Migration, Tests, E2E, and Quality Gates

Long-only v2 states gain empty short/margin defaults without value changes. v3 saves gain dataset pinning and advanced career statistics. Unit coverage includes providers, invalid/duplicate observations, cache, fallback, future filtering, short profit/loss, partial/full cover, borrow fees, margin calls, forced cover, bans, calendar, exposures, and migration. Final gate and E2E results are recorded in the handoff.

## Known Limitations and Unresolved Sources

No external provider data snapshot is bundled. ECB redistribution remains review-required per dataset. FRED needs a server-held key and per-series review. Alpha Vantage requires a suitable plan. Current historical prices remain the labeled deterministic simulation inherited from prior sprints.

## Recommended Sprint 6

Build source-linked historical world events, central-bank decisions, geopolitical chains, licensed media, maps, and server-bounded content delivery.
