# Opening / Closing Bell Experience Report

## Summary

The game now presents every playable round as a six-stage market session: pre-market, opening, trading, closing, summary, and overnight. The layer orchestrates the existing deterministic engine and persists its presentation state without creating a second round, trading, information, rival, or risk system.

## Existing Systems Reused

The implementation reuses `advanceRound`, `storeEpisode`, `getRoundBriefingInformation`, `getRivalBriefing`, historical news and events, portfolio and margin state, Market Heat, the trading HUD, the audio cue helper, V3 persistence, and the existing rival once-per-round guard.

## Round Flow

The concrete processing order is:

```text
Player Trading
-> End Round
-> advanceRound exactly once and create an immutable closing snapshot
-> information lifecycle and rival processing through storeEpisode exactly once
-> persisted Closing Bell
-> Round Summary
-> Overnight Risk
-> Next Pre-Market Briefing
```

The existing engine calculates market movement and the new date together inside `advanceRound`. For that reason processing occurs at End Round, before the presentation sequence. The resulting game state and snapshot are persisted together, so reloading or continuing the overlays does not run simulation logic again.

## Session State

`RoundExperienceState` stores the current uppercase session phase, round number, seen flags, an optional `processedRound` guard, and the closing snapshot. The allowed transition table rejects out-of-order movement.

## Pre-Market Briefing

The briefing prioritizes Market Outlook, released historical news, relevant rumors and information, player-visible rival intelligence, and current portfolio risks. It shows mood, direction, volatility, sector pressure, shorts, and existing risk alerts without duplicating the detail desks.

## Information Integration

Briefing information comes from `getRoundBriefingInformation`. Availability date, round, episode, lifecycle status, character skills, and source access remain controlled by the Information & Rumor Engine. The summary records lifecycle changes caused by the round.

## Rival Intelligence Integration

Rival briefing data comes only from `getRivalBriefing`. Its existing visibility and confidence rules prevent hidden actions and exact private positions from leaking. Newly processed visible activity IDs are attached to the snapshot.

## Opening Bell

The modal opening moment displays the date, market mood, volatility, and an era-specific market setting before enabling the unchanged trading controls. It uses the existing bell audio hook when enabled.

## Trading Session

The existing trade ticket, HOLD action, portfolio HUD, chart, Information Desk, Rival Investors view, and decision history remain in place. The HUD displays a textual `MARKET OPEN` session indicator. End Round is enabled only during trading.

## Closing Bell

End Round moves into a persisted Closing Bell overlay with the market result, portfolio result, and closing date. Trading controls remain behind an accessible modal and are disabled by phase.

## Round Snapshot

The snapshot contains start/end portfolio and cash values, round P&L and return, trade counts by side, best/worst open position, aggregate market change, new risks, important news, visible rival activity IDs, information changes, and the engine summary.

## Round Summary

The summary presents portfolio result, cash, best/worst position with empty states, Buy/Sell/Short/Cover counts, risk, market result, visible rival activity, important news, and information outcomes.

## Overnight Risk

`getOvernightRisk` is a pure function over existing margin, short exposure, position concentration, volatility, and unresolved high-impact information. It returns textual LOW, MODERATE, ELEVATED, HIGH, or EXTREME risk plus contributing reasons.

## Era Presentation

Opening presentation maps the session year to ticker tape and telegraph, Art Deco exchange, electronic quote board, or digital institutional feed language. This prepares the experience for richer era assets without introducing a parallel identity system.

## Character Integration

The briefing passes the existing Character into information and rival selectors. Intelligence Network, Source Evaluation, research, network, and related established modifiers therefore affect content and confidence through their current services.

## Save / Resume

The V3 archive adds `roundExperience`. Reload resumes the exact phase and snapshot. Older V3 saves with an active episode safely resume in TRADING; inactive saves use `null`.

## Idempotency

Only End Round invokes `advanceRound` and `storeEpisode`. A UI lock prevents repeated clicks, `processedRound` makes repeated closing calls stable, and the existing rival and information round guards remain authoritative. Summary, overnight, and opening transitions perform no XP, credit, objective, reward, expiration, or rival processing.

## Mobile

Briefing, summary, and overnight cards stack into one column below 760px. The action area remains sticky and full width so the sequence does not depend on a compressed desktop grid.

## Accessibility

Session overlays use dialog semantics, explicit phase labels, live announcements, keyboard-native buttons, and focused primary actions. Status is always written as text. Reduced Motion removes session animation and animation-speed OFF is treated the same way. Opening and Closing provide Skip controls.

## UI / Game Experience Compliance

- Character HUD: **PASS** - the established investor portrait, identity, archetype, level, ability, and era remain visible behind the session layer.
- Investment Visibility: **PASS** - capital, cash, exposure, round investment, position, and P&L remain in the underlying trading HUD; summary and overnight screens surface the result and risk.
- Round Action: **PASS** - the sequence has one clear primary action at every phase and End Round is available only during trading.
- Game Feel: **PASS** - the bell moments, historical setting, priority briefing, market close, result, and risk form a paced market cycle with Skip controls.
- Responsive: **PASS** - verified at 1440 x 1000 and 390 x 844; cards stack and the primary action remains reachable.
- Accessibility: **PASS** - phase and risk have text labels, dialogs announce changes, focus enters the primary action, keyboard controls are native, and Reduced Motion disables transitions.

## Tests

Dedicated tests cover all session phases and order, invalid transitions, snapshot values, duplicate close handling, empty portfolios, future-information filtering, hidden rival filtering, low and stressed overnight risk, risk purity, old-save migration, persisted summaries, and once-per-round rival/information processing. The existing suite remains the regression gate.

## Browser Verification

**PASS.** Playwright verified career creation and era launch, Pre-Market, Opening Bell, Market Open, HOLD, End Round, Closing Bell, Summary, reload and resume during Summary, Overnight Risk, and the next Pre-Market briefing. The persisted result after the flow was phase `PRE_MARKET`, active round `1`, rival processed round `1`, and information processed round `1`. Screens were inspected at 1440 x 1000 and 390 x 844.

## Quality Gates

- Typecheck: **PASS**
- Lint: **PASS**, zero warnings
- Tests: **PASS**, 192 tests in 17 files
- Production Build: **PASS**
- Browser verification: **PASS**, desktop and mobile

## Open Points

Historical sound remains an existing opt-in synthesized cue rather than an asset library. Rich newspaper, panic, and crash cinematics remain future presentation work. Office / Headquarters, global expansion, divisions, employees, M&A, and rival market impact are intentionally outside this sprint.
