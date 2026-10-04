# Sprint 02 Report

## Scope delivered

Sprint 2 adds the campaign and era foundation, an 18-era registry, sequential career unlocking, three capital carryover modes, a campaign timeline, six challenge definitions, XP and levels, centralized scores and grades, career statistics, settings, achievement metadata, crisis mode, special market rules, and Savegame v3.

Three historical vertical slices are playable through one engine:

- Panic of 1907 (1906–1908)
- The Great Crash (1928–1933)
- Oil Shock (1972–1975)

Each can start, trade, advance, save, reload, complete, and produce a graded result. Prices remain deterministic simulations and reports are marked reconstructed.

## Sprint 1 audit and deviations

All required Sprint 1 foundations existed: deterministic market simulation, trading, portfolio accounting, events, news, information gating, regimes, strategy, risk alerts, objectives, weekly rounds, and v2 browser persistence. No assumed subsystem had to be fabricated.

The Sprint 1 episode state remains schema version 2 inside the new v3 archive. This deliberate boundary allows existing v2 saves to migrate as standalone Great Crash games without changing their game-state payload.

Not all 18 eras contain playable data. The prompt explicitly excluded full content for every era, so locked entries contain metadata and teasers only. E02 and later unavailable eras display “coming soon” after unlock rather than exposing invented events.

## Architecture

- `campaign/eras.ts`: spoiler-safe era metadata.
- `campaign/episodes.ts`: playable episode registry and asset availability.
- `campaign/rounds.ts`: DAY, WEEK, MONTH advancement and crisis overrides.
- `campaign/career.ts`: unlock and capital progression.
- `campaign/progression.ts`: score, grade, XP, and levels.
- `campaign/challenges.ts`: challenge registry.
- `campaign/persistence.ts`: Savegame v3 archive and v2 migration.

`MARKET_CLOSED` and `BANK_HOLIDAY` use the generic special-rule framework and block affected asset classes during their date windows.

## Verification

- TypeScript: passed
- ESLint: passed with zero warnings
- Vitest: 24 tests passed across 4 files
- Production build: passed with Next.js 16.3.6 (webpack)
- Browser flows: new career, reload/continue, Crash Proof challenge, and Oil Shock standalone passed with zero console errors

Foundation commit: `bef980c`
Sprint 1 commit: `804f828`
Sprint 2 commit: generated after this report; the final handoff records the pushed SHA.

