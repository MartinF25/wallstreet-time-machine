# Office / Headquarters Foundation Report

## Summary

The Career now has a central, illustrated two-dimensional Headquarters. It anchors the investor in the current era and routes the player into the existing Market, Campaign, Information, Rivals, and Character systems without duplicating their business logic.

## Existing Systems Reused

The Office uses the existing Character and era portrait presentation, Career era registry and capital, active episode state, Round Experience phase, Information lifecycle, player-visible Rival briefing, Campaign timeline, Market HUD, Profile and Skill Tree, V3 persistence, and global UI tokens.

## Navigation Analysis

The application uses a single client state view rather than URL routes. Market and Portfolio are part of the active Game HUD; Campaign, Information, Rivals, and Character Progression are existing screens. Office targets therefore switch to those views. If no episode is active, Desk and Market Board open the Campaign timeline. Locked areas do not create placeholder systems.

## Office Domain

`OfficeState` contains a five-step `OfficeLevel`, unlocked zone IDs, and future upgrade IDs. Level 1 unlocks Desk, Market Board, Newspaper, Telephone, Research, and Character Status. Normalization supplies these safe defaults to older V3 saves while preserving stored progress.

## Office Levels

The registry defines Broker Office, Successful Trader Office, Wall Street Firm, Investment House, and Global Financial Headquarters with progressive career requirements. Only the Broker Office is functional in this sprint. Higher levels are data definitions for later progression work.

## Interactive Headquarters

The scene uses layered HTML and CSS: street window, rug, desk, quote board, newspaper, telephone, research shelves, portrait, map, and conference area. Every functional object is a semantic button with a descriptive label. Global Expansion and Deals are visible as locked future areas.

## Era Presentation

`getOfficeEraPresentation(year)` centrally maps the current year to Ledger, Art Deco, Mid-Century, Terminal, or Digital presentation. It defines market, communications, news, research, and atmosphere language. The 1900 office explicitly uses ticker tape, chalk quotes, telegraph, telephone, newspaper, ledgers, and printed reports with no modern computer language.

## Character Integration

The Office command area shows the current era-aware portrait, investor name, archetype, character level, credits, and career era. Investor Status opens the existing Character Progression and Skill Tree screen.

## Market and Portfolio Integration

Capital, active round, and session phase are visible in the Office status strip. Desk and Market Board resume the existing Game HUD when an episode is active, preserving its Portfolio, exposure, risk, chart, and trading systems. Otherwise they open the Campaign timeline.

## Information and Rival Integration

The status strip counts currently released, non-expired information and player-visible rival signals. Newspaper and Research open the existing Information Desk. Telephone opens the existing Rival Investors screen. No private rival state is rendered in the Office.

## Save and Migration

`officeState` is additive to V3. `createAppSave` and new careers receive a Level 1 office. `migrateToV3` normalizes missing and stored office data without changing character, career, episode, information, rival, or financial state.

## Mobile and Responsive Design

Desktop uses a spatial scene with positioned objects. Tablet and mobile switch to a two-column and then one-column interactive headquarters while retaining object hierarchy, readable descriptions, capital, character identity, and primary navigation.

## Accessibility

Every zone is a native labeled button. Locked zones are disabled and include their unlock level in text. Focus has a visible outline, status is never color-only, and motion respects `prefers-reduced-motion`.

## UI / Game Experience Compliance

- Character HUD: **PASS** - portrait, name, archetype, level, credits, and era are prominent.
- Investment Visibility: **PASS** - capital and active market session are always visible; the existing complete Portfolio remains one action away.
- Round Action: **PASS** - an active round resumes from Desk or Market Board without replacing Round Experience.
- Game Feel: **PASS** - the scene reads as a historical strategic office rather than a generic dashboard.
- Responsive: **PASS** - spatial desktop and stacked mobile layouts are defined.
- Accessibility: **PASS** - semantic buttons, labels, locked descriptions, focus, and reduced motion are supported.

## Tests

Domain tests cover all five levels, functional and locked zones, every era presentation range, historical technology guardrails, new-career defaults, old V3 migration, and progress-preserving normalization. Existing tests remain the regression gate.

## Browser Verification

**PASS.** The complete new-career flow was exercised through Character Creation into the Broker Office. Browser verification confirmed Character identity, era, capital, functional zones, disabled Global Expansion, Research navigation into the existing Information Desk, return to Home and Headquarters re-entry. Screens were visually inspected at 1440 x 1000 and 390 x 844.

## Quality Gates

- Typecheck: **PASS**
- Lint: **PASS**
- Tests: **PASS**, 205 tests in 18 files
- Browser verification: **PASS**, desktop and mobile
- Production build: **PASS**

## Open Points

Office upgrades have no economy yet. Levels 2-5, branch cities, employees, M&A, investment banking, rival market impact, complex room planning, and 3D movement remain future work.
