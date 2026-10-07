# Rival Investors & Rival AI Report

## Summary

The Campaign now contains persistent Rival Investors who observe available information, investigate selectively, form deterministic trade intentions and maintain simulated positions. Player intelligence exposes only estimates and observed activity.

## Existing Systems Reused

Rivals use the shared Character model, archetypes, Traits, Weaknesses, Skills, modifiers and effective stats. They consume the existing Information & Rumor Engine and its investigation function. Current market prices, sentiment, episode, date and round come from `GameState`; the existing player Trading Engine remains unchanged.

## Rival Domain

`RivalInvestor` stores a Character, strategy, capital, cash, simple positions, risk tolerance, confidence, hidden objectives, private knowledge and status. `RivalState` persists rivals, bounded activity history and the last processed episode/round.

## Initial Rivals

The first roster includes Jesse Livermore, J. P. Morgan, Benjamin Graham and three clearly fictional rivals: Evelyn Cross, Samuel Vale and Clara Voss. Historical availability prevents figures from appearing outside plausible active periods.

## Strategies

Momentum, Value, Crisis, Network, Banking and Corporate Control are data-driven definitions with preferred assets, risk, patience, short, information and sentiment biases.

## Decision Engine

`evaluateRivalDecision` is a pure deterministic function. It considers effective Character stats, strategy, positions, cash, risk tolerance, current price movement, volatility, sentiment, known information and objectives. It returns Buy, Sell, Short, Cover, Hold or Investigate with confidence, reasons and desired exposure.

## Information Consumption

Each Rival owns a separate knowledge state. Rival discovery uses the same available date, round and episode cutoffs as Player information. Network capability and Intelligence Network affect access. Player acquisition never grants the same item to a Rival automatically.

## Investigation

Rivals call the existing `investigateInformation` service and pay investigation costs from Rival cash. Investigation results update only Rival knowledge and confidence; internal rumor truth never appears in public activity.

## Trade Intentions

Decisions create small, medium or large intentions. The sprint uses deterministic simulated position updates because routing Rival orders through the Player order engine would couple separate cash, margin and history models. No separate player-facing order engine was created.

## Risk Management

Risk tolerance and effective Risk define desired exposure. Position losses, total exposure and volatility derive Watching, Active, Aggressive, Defensive or Distressed status. Intent size is capped by Rival capital and cash.

## Hidden Objectives

Each Rival has one hidden weighted objective, such as building a short, preserving capital, supporting banking exposure, profiting from crisis or accumulating industrial positions. Objectives influence decisions but are excluded from Player UI.

## Player Intelligence

Activities have Hidden, Detected or Public visibility. `getVisibleRivalIntelligence` uses Player Information, Network, Intelligence Network, Source Evaluation and Banker Contacts to decide detection, likely asset, estimated size and confidence. Exact positions, cash, objectives and private knowledge remain hidden.

## Character Skill Integration

Intelligence Network improves detection, Source Evaluation improves confidence, and Banker Contacts improves insight into Banker rivals. Rival Character Skills also flow through the existing effective-stat and Information services.

## Round Integration

`storeEpisode` runs Rival processing once per episode round after Information expiration. Repeated saves and trades within the same round do not create duplicate actions. `getRivalBriefing` prepares the visible activity subset for the future Opening Bell sprint.

## Era Compatibility

Every Rival defines a first and optional last active year. Fictional rivals fill gameplay gaps while historical figures remain constrained to plausible periods.

## Save / Migration

`AppSaveV3.rivals` is additive. Old V3 saves receive the deterministic 1900 roster. Capital, cash, positions, knowledge, objectives, activities and status persist through normal save/load.

## Future Data Protection

Rival discovery filters information by `availableFromDate`, `createdRound` and `episodeId` before decisions. Tests cover future rumors and cross-episode data.

## UI

The Rival screen provides Rivals, Watchlist, Activity and Intelligence views. It reuses `CharacterCard` without Credits and labels historical versus fictional participants. Detail views state which values remain hidden and never reveal exact private positions.

## Tests

The suite covers validation, era availability, statuses, deterministic decisions, strategy and risk differences, Character modifiers, every intent type, Information discovery/investigation, false-rumor privacy, asymmetric intelligence, Skill effects, persistence, migration, once-per-round execution and future-data filtering.

## Browser Verification

Desktop and mobile flows were verified from Career creation through Rival roster, market round advancement, activity generation, detail/intelligence views and reload persistence.

## Quality Gates

- Typecheck: PASS
- Lint: PASS
- Tests: PASS
- Production Build: PASS

## UI / Game Experience Compliance

- Character HUD: PASS — Rival identity uses the shared CharacterCard.
- Investment Visibility: PASS — likely markets and estimated activity are visible without exposing private portfolios.
- Round Action: PASS — Rival processing occurs before the next Player decision and does not alter the action bar.
- Game Feel: PASS — participants have distinct identities and uncertain intelligence.
- Responsive: PASS — roster and detail layouts collapse cleanly on mobile.
- Accessibility: PASS — status, confidence and visibility use text alongside visual treatment.

## Open Points

Rival intents do not yet move market prices. Rival-to-Rival response, diplomacy and institutional execution remain deferred. The next sprint should connect Player information and Rival intelligence to Opening and Closing Bell presentation.
