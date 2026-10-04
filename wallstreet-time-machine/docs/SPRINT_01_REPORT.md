# Wall Street: Time Machine — Sprint 1 Report

## Repository State and Foundation Verification

Sprint 1 extends Foundation commit `bef980c` on `main`. Core trading, portfolio, deterministic market, and persistence boundaries were retained.

## Game Engine Changes

The episode now spans 1928–1933. Weekly advancement coordinates valuation, dated events/news, regime and sentiment, risk evaluation, briefing creation, benchmark snapshots, and completion objectives.

## Event and News Engines

Thirteen curated historical events and fourteen reconstructed reports cover the boom, October 1929 crash, contraction, banking crisis, depression, and stabilization. Central date filters and delayed context prevent future leakage.

## Strategy and Risk

Five strategy templates, change journaling, allocation analysis, and six risk rules are available. Alerts appear in overview, strategy, history, and briefings.

## Briefing, Objectives, and Benchmark

Each round compares portfolio/cash, market movers, new information, alerts, and violations. Completion evaluates survival, capital, drawdown, liquidity, and performance against the simulated industrial benchmark.

## Savegame Migration

Schema v2 persists strategies, alerts, seen information, objectives, fees, and briefings. Foundation v1 saves migrate with portfolio and trade data preserved.

## Tests and Quality Gates

Fifteen unit and integration tests cover Foundation behavior plus event/news/context visibility, regimes, sentiment, strategies, risk, briefing, objectives, benchmark, migration, and completion. A production-server browser smoke check passed at desktop size. A persisted Playwright interaction suite remains deferred because `agent-browser` is not installed in this environment; the core loop is covered by integration tests.

## Known Limitations and Technical Debt

Prices and benchmark remain simulated. News is a compact curated dataset. Strategy customization currently uses templates; the model already supports custom profiles. Objective liquidity evaluation is based on saved allocations.

## Recommended Sprint 2

Add the Campaign and Era Engine while keeping episode data isolated and the date boundary centralized.
