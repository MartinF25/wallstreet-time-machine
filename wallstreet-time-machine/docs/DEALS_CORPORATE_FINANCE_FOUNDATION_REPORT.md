# Deals & Corporate Finance Foundation Report

## Summary

Financial Houses now receive deterministic corporate mandates, accept them, assign existing employees, prepare work, advance mandates through rounds, and resolve outcomes with fees, prestige, and reputation effects.

## Existing Systems Reused

The engine reuses Career/episode cash, Financial House levels and prestige, divisions and locations, Employees and management, Character Reputation/Network/Influence, Information availability, the existing round persistence hook, V3 saves, and Office navigation.

## Deal Domain

`src/game/deals` contains counterparties, four deal types, statuses, opportunities, teams, progress, outcomes, state validation, generation, actions, scoring, resolution, and round processing. Counterparties are lightweight views for the existing historical market setting rather than a second company simulation.

## Deal Types

Corporate Financing, Bond Issue, Equity Raise, and Advisory Mandate define division/team requirements, duration, fee rates, difficulty, and historical presentation.

## Opportunity Generation

Year, round, episode, seed, type, and company feed a deterministic integer hash. No random API is used. Opportunities expire and future Equity Raises are withheld before 1850.

## Historical Presentation

Early eras use Mandate Ledger, Industrial Financing, Bond Subscription, New Share Issue, Merchant Banking Advice, and Financing Proposal language. Modern eras use Deal Pipeline, Corporate Financing, Equity Capital Raise, and Corporate Advisory.

## Requirements

Acceptance validates active divisions, Character Reputation, House Prestige, House Level, required center, expiration, and duplicates. Corporate Finance unlocks financing, equity, and advisory mandates; Bonds unlocks Bond Issues.

## Deal Teams

Accepted deals require an active Banker, Division Manager, or Executive lead and all required roles. Only assigned/manager employees qualify. Seniority limits concurrent deal load from one to four active mandates.

## Employee Integration

Dealmaking, Research, Leadership, seniority, active status, and management feed team readiness and deterministic scoring. The lead employee receives a small Reputation increase on success.

## Division Integration

Division gates use existing stable IDs. Research supplies preparation quality; Corporate Finance and Bonds grant mandate access; Investment Banking remains prepared for later larger offerings and IPOs.

## Information Integration

Released, non-expired rumors add bounded risk while active Research adds preparation context. The scoring context never reads or exposes internal rumor truth states and ignores future-dated information.

## Deal Progression

Actions are ACCEPT, ASSIGN TEAM, PREPARE, EXECUTE, and pipeline filtering. Preparation costs cash and adds 30 progress. Active work also progresses deterministically once per round according to duration.

## Resolution

Success score combines House Prestige, Character Reputation, team skills, preparation, manager presence, Research, information risk, difficulty, and a deterministic seed term. Results are POOR, SUCCESS, STRONG, or EXCEPTIONAL rather than a displayed percentage lottery.

## Fees

Successful fees are credited to the existing active-episode cash or Career capital. Preparation costs use that same balance. No parallel house bank account or underwriting balance sheet was added.

## Reputation / Prestige

Success adds bounded House Prestige and Character Reputation; failure applies small losses. The lead employee can gain one Reputation point. Character Credits are never awarded.

## Conference Table Integration

The Conference Table activates only when Corporate Finance is active and opens the Mandate Pipeline directly. M&A remains outside this sprint. The Financial House also exposes a DEALS tab.

## Deal History

Completed and failed mandates retain company, type, year, size, fee, outcome, score, and lead employee ID in the persisted archive.

## Round Integration

`storeEpisode` invokes `processDealRound`. Episode and round guards make repeated saves and reloads idempotent, matching Information and Rival processing patterns.

## Save / Migration

`dealState` is additive to V3. Existing saves receive an empty pipeline. Opportunities, active teams, progress, history, outcomes, and the processing guard persist; malformed archives fall back safely.

## Tests

Dedicated tests cover all four definitions, historical labels, deterministic and era-safe generation, every acceptance gate, team roles/status/capacity, atomic preparation, once-per-round processing, deterministic success/failure, preparation/team/manager effects, information risk, truth protection, validation, persistence, migration, and malformed saves.

## Browser Verification

Pending final desktop and mobile pipeline verification.

## Quality Gates

- Typecheck: pending final gate
- Lint: pending final gate
- Tests: pending final gate
- Production Build: pending final gate
- Browser Verification: pending final gate

## UI / Game Experience Compliance

- Character HUD: PASS by implementation - House and investor context remain visible.
- Investment Visibility: PASS - cash, mandate size, fee, and preparation cost are explicit.
- Round Action: PASS by implementation - guarded progression reuses the established close flow.
- Game Feel: PASS - a historical mandate ledger and financing proposals replace spreadsheet language.
- Responsive: pending browser verification.
- Accessibility: PASS by implementation - written states, native controls, labels, progress semantics, disabled states, and keyboard focus are present.

## Open Points

IPO bookbuilding, M&A, takeovers, syndicates, underwriting exposure, covenant/legal/regulatory systems, rival bidding, client relationship scores, employee bonuses, and branch P&L remain outside this sprint.
