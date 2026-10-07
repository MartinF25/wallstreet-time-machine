# Information & Rumor Engine Report

## Summary

The game now has a deterministic, data-driven information layer for rumors, private tips, market signals and confirmed information. It complements the existing historical News and Event systems and gives future Rivals, Contacts and Offices one reusable domain.

## Existing Systems Reused

Historical `NewsItem` and `HistoricalEvent` remain the authoritative confirmed timeline and retain their release-date filters. The new engine reuses `InvestorProfile.character`, Character stats, Traits, learned Skills, Campaign cash, the V3 save, episode identifiers, asset identifiers and round progression. It does not introduce another trading or news engine.

## Information Architecture

`src/game/information` contains typed models, source and item catalogs, Zod schemas and pure services. An item separates type, source, internal truth, displayed reliability, importance, market impact, costs, availability date, round lifetime, affected assets and lifecycle state.

## Sources

Sources include newspapers, bankers, industrial contacts, journalists, ticker tape, exchanges, government offices, newswires, electronic terminals and digital feeds. Each source has base reliability, access level and a historical year range.

## Rumor Lifecycle

Items move through Available, Acquired, Investigating and Confirmed/Disproved, or Ignored/Expired. Concluded items remain in history. Expiration runs from the central round persistence hook.

## Reliability

Displayed reliability is a bounded estimate and range derived from source reliability, the item, Character Information and relevant Traits/Skills. The range never reaches perfect certainty. Market impact remains independent, allowing low-confidence but extreme-impact reports.

## Truth State

`TRUE`, `FALSE` and `PARTIALLY_TRUE` are stored internally and omitted from the player UI. Seeded truth generation uses a deterministic integer function and never calls `Math.random()`.

## Investigation

Acquired information can be investigated with in-game cash. Investigation returns a new immutable item, remaining cash, cost and quality. Quality may reveal details, narrow the estimate or conclude a rumor, depending on Character capability and deterministic seed.

## Character Skill Integration

- Source Evaluation improves reliability precision.
- Deep Research improves investigation quality.
- Rumor Analyst improves rumor precision and investigation.
- Intelligence Network increases source access.
- Banker Contacts opens restricted banker sources.
- Press Network is represented by the existing learned-skill catalog and is ready for earlier News timing in future episode content.

## Era Compatibility

Source availability is checked by year. Early eras use newspapers, ticker tape, brokers, bankers and personal contacts. Newswires, electronic terminals and digital feeds only become valid in later periods.

## Round Integration

Information is filtered by episode, `availableFromDate` and `createdRound`. `getRoundBriefingInformation` returns a priority-sorted set for a future Pre-Market Briefing. `storeEpisode` expires outdated items whenever round state is persisted.

## Save / Migration

`AppSaveV3.information` stores items, investigation state, revealed details, status and internal truth. The change is additive, so version 3 remains. Old V3 saves receive an empty state; new Careers receive curated seed information.

## Future Data Protection

Visible and briefing selectors reject items from future dates, future rounds and other episodes. Information therefore follows the same known-date principle as existing News and Event content.

## UI

The Information Desk provides All, News, Rumors, Private and Market Signals filters. Rumors use uncertain language and a dashed visual treatment; confirmed information has a solid treatment. Cards expose source, age, reliability range, impact, assets, status and cost. The detail panel supports Acquire, Investigate, Ignore and View Market without duplicating trading.

## Tests

The suite covers reliability bounds, Character effects, all three truth states, investigation failures and immutability, source eras, source reliability, expiration, cash acquisition, save migration, invalid data, deterministic outcomes, future-data filtering and briefing priority.

## Browser Verification

The campaign flow was tested on desktop and mobile: create a Networker, open the Information Desk, acquire the private railroad rumor, investigate it, focus its market, reload and verify that cash, status, reliability and revealed details persist.

## Quality Gates

- Typecheck: PASS
- Lint: PASS
- Tests: PASS
- Production Build: PASS

## UI / Game Experience Compliance

- Character HUD: PASS — identity and cash remain visible in the Information Desk.
- Investment Visibility: PASS — affected assets and current Campaign cash are explicit.
- Round Action: PASS — information supports decisions without moving trades out of the established action area.
- Game Feel: PASS — the screen reads as a historical intelligence desk, with clear uncertainty and consequence.
- Responsive: PASS — detail and inventory collapse to one column on mobile.
- Accessibility: PASS — filters expose pressed state, actions use native disabled semantics and focus does not depend on color.

## Open Points

Actual price reaction remains owned by the current Market/Event engine. Press Network timing will become active as more episode information is authored. Rival consumption, Contacts, Offices and Opening Bell presentation remain deferred to their planned sprints.
