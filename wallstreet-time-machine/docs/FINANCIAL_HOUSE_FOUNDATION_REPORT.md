# Financial House Foundation Report

## Summary

The player now owns a persistent Financial House between Character, Headquarters, Branches, Information, and future Deals. Every career starts as a Brokerage with Securities Trading in New York and can open historically presented business divisions, place them at active locations, and build organizational prestige.

## Existing Systems Reused

The implementation reuses `InvestorProfile.character`, Character Skills, Credits, Character Reputation, Career cash, active-episode cash, Office levels, the New York headquarters, Expansion branches and modifiers, the Information investigation service, current era/year, and V3 persistence. It adds no second headquarters, branch, cash, credit, reputation, information, or deal system.

## Financial House Domain

`src/game/financial-house` contains typed models, registry, Zod schema, and pure services. A Financial House stores identity, headquarters reference, founded year, house level, prestige, global division instances, and location assignments. The model is not structurally tied to the player and can later represent rival organizations.

## House Identity

The default name uses the investor surname, such as `Martin Fauerbach` to `Fauerbach & Co.`. A new character replaces the initial `Investor & Co.` placeholder automatically. The House screen allows a validated custom name and generates a simple text monogram. It shows headquarters, founded year, house level, Character Reputation, organizational Prestige, branches, and active divisions.

## House Levels

Five independent organizational levels are registered: Brokerage, Securities Firm, Investment House, International Financial House, and Global Financial Institution. House level is stored separately from Office level. This sprint consumes the value for division requirements and location capacity; a future economy will govern level upgrades.

## Business Divisions

The registry contains Trading, Research, Bonds, Foreign Exchange, Commodities, Corporate Finance, Investment Banking, Wealth Management, and Private Banking. Trading is the no-cost default. Every opened division starts active at Level 1; Levels 2 and 3 are valid in the model for future progression.

## Era Presentation

Stable domain IDs have era-specific labels. Investment Banking appears as Merchant & Corporate Finance in 1900, Investment Banking from 1980, and Investment Banking & Capital Markets from 2000. Research, Trading, Wealth Management, and Private Banking also use period-aware language. Wealth Management remains era-locked until 1950.

## Division Requirements

Definitions can require year, house level, office level, character level, Character Reputation, cash, Credits, Skill, any one of specified branches, and another active division. Foreign Exchange requires London or Zurich; Commodities requires Chicago, London, or Hong Kong; Investment Banking requires Corporate Finance and sufficient reputation.

## Division Opening

`canOpenDivision` reports explicit reasons. `openDivision` validates all requirements before returning a new House and remaining cash and Credits. Failure leaves the House, cash, and Character untouched. Duplicate global divisions and premature era combinations are rejected.

## Branch Assignment

Divisions exist once globally and gain local presence through assignments. Headquarters can host `2 + House Level` divisions. A branch has two slots per branch level. Assignment requires an active division and either the headquarters or an active branch; duplicate placement, inactive locations, and capacity overflow are rejected.

## Location Synergies

Synergies are data-driven records on division definitions. Examples include Bonds in London, Foreign Exchange in London or Zurich, Commodities in Chicago, and Private Banking in Zurich. They provide scoped information, research, access, or reputation opportunities and never direct profit multipliers.

## Character Integration

Existing Office Management, Branch Planning, Banker Contacts, Deep Research, Character Level, Credits, and Character Reputation gate relevant divisions. House Prestige is distinct from Character Reputation: Reputation describes the investor; Prestige records organizational development and increases when a division opens.

## Information Integration

Active Research contributes its bounded `researchQuality` modifier to the existing investigation calculation. The bonus is capped, preserves all existing uncertainty limits, and never exposes `rumorTruthState`. Branch, division, and location-synergy modifiers are returned through one combined organization selector based on the existing Branch modifier shape.

## Office Integration

The Headquarters scene includes a House Ledger entry into the new screen. Its status strip shows House Level, branch count, and active division count. The locked Conference Table explains that Investment Banking is required, while Deals and M&A remain unimplemented.

## Expansion Integration

The existing Global Expansion detail panel now lists divisions assigned to the selected headquarters or branch. It continues to own branch opening and requirements; no second expansion engine was introduced.

## Save / Migration

`financialHouse` is additive to V3. Old saves receive a house derived from the existing investor name, founded in 1900, with Trading assigned to New York. Valid divisions, assignments, prestige, and custom names persist. Malformed states fall back to the safe default without changing Character, Career, Office, Branches, cash, or Credits.

## Tests

Dedicated tests cover default identity, naming, five levels, all nine definitions, era labels and availability, every opening failure class, exact costs, atomic failure, duplicate divisions, headquarters and active-branch assignments, inactive locations, synergies, combined Branch/Division modifiers, Research quality, truth protection, persistence, migration, and malformed saves.

## Browser Verification

PASS. Playwright verified the complete flow at 1440 x 1000 and 390 x 844: create an investor, enter Headquarters, inspect the surname-derived House, open Research, assign it to London, verify exact cash and Credit deductions, confirm the Office division count and London assignment in Global Expansion, reload, and confirm persistence. Keyboard-native buttons, inputs, selects, written states, and mobile stacking were exercised without runtime errors.

## Quality Gates

- Typecheck: PASS
- Lint: PASS
- Tests: PASS, 242 tests in 20 files
- Production Build: PASS
- Browser Verification: PASS, desktop and mobile

## UI / Game Experience Compliance

- Character HUD: PASS - portrait, investor identity, Credits, cash, era, and House identity are visible.
- Investment Visibility: PASS - available cash and opening costs remain explicit.
- Round Action: PASS - the screen does not alter the established deterministic round flow.
- Game Feel: PASS - crest, house ledger, division plaques, historical names, and locations present an investment house rather than a generic admin table.
- Responsive: PASS — verified at 1440 x 1000 and 390 x 844.
- Accessibility: PASS by implementation - native controls, written states, disabled semantics, labels, keyboard focus, and non-color status text are present.

## Open Points

House level upgrades, division level upgrades, employees, managers, salaries, clients, AUM, branch accounting, underwriting, IPOs, bond issues, M&A, competing houses, regulation, and bankruptcy remain outside this sprint.
