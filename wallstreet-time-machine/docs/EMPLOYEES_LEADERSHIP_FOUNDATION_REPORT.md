# Employees & Leadership Foundation Report

## Summary

Financial Houses can now hire, assign, and lead a persistent workforce. Staffing augments existing divisions and locations without introducing automatic payroll deductions, hard migration penalties, or a parallel Character system.

## Existing Systems Reused

The sprint reuses Financial House divisions and assignments, Expansion centers and active branches, Character Influence, Network, Reputation and Office Management, Career/episode cash, organization modifiers, Information investigation, V3 persistence, and established House UI patterns.

## Employee Domain

`src/game/employees` provides models, an era-aware catalog, Zod validation, and pure services. Employees store one compact five-skill profile, salary, signing cost, loyalty, reputation, up to two traits, home center, optional assignment and manager responsibility, and lifecycle status.

## Roles

Core roles are Trader, Analyst, Researcher, Banker, Broker, Relationship Manager, Division Manager, Branch Manager, and Executive. Commodity and FX specialists support existing specialist divisions. Compatibility is defined per existing Division ID.

## Era Presentation

Stable role IDs receive central historical labels. Early Researcher becomes Research Clerk, Director becomes Principal, Executive becomes Managing Partner, and FX Specialist becomes Foreign Exchange Dealer. Modern eras use Research Analyst and Investment Banker where appropriate.

## Seniority

Junior, Associate, Senior, Director, and Partner are validated. Partner status is prepared without ownership or profit participation.

## Hiring

`canHireEmployee` validates era, duplicate identity, active home branch, Character Reputation, cash, and House capacity. `hireEmployee` deducts only the signing cost and returns an immutable workforce and balance. Salary remains a displayed obligation.

## Candidate Generation

The curated candidate pool is deterministically ordered by year, center, career seed, and candidate ID. It never calls `Math.random`. The same inputs return the same available candidates, excluding already hired staff.

## Assignments

Assignment requires an employed person, active headquarters/branch, active division, division presence at that location, compatible role, and team capacity. Employees remain globally unique and can have one current assignment.

## Managers

A qualified employee with Leadership 55 or higher can manage one division at one location. Duplicate management responsibility is rejected. Branch Manager and Executive roles are modeled for later operational layers.

## Leadership Capacity

Capacity combines a base value, House Level, Character Influence, and the existing Office Management Skill. It caps current manager count without introducing a new Character stat.

## Employee Capacity

House levels allow 5, 12, 25, 50, and 100 employees. Team assignment currently allows four employees per division/location, preparing later upgrades.

## Staffing

Division/location staffing is textual: UNSTAFFED, UNDERSTAFFED, or STAFFED. Existing migrated divisions remain playable and receive no hard penalty. House division details and Management show team size and manager vacancy.

## Employee Effects

Assigned Analysts and Researchers add bounded Research quality; Traders and Brokers add execution readiness; Bankers add institutional/deal readiness; Managers add division efficiency. Inactive and merely employed staff contribute no modifiers. No effect grants direct profits or exposes truth states.

## Payroll

`getHousePayroll` sums salaries for active employees. It is shown as an annual/period obligation and is not automatically deducted from rounds, preserving round idempotency and snapshots.

## Character Integration

Hiring uses existing Character Reputation. Leadership capacity uses existing Influence and Office Management. Network is part of the hiring context for later candidate access without adding employee-scale Character mechanics.

## Division Integration

The Financial House screen adds PEOPLE with Employees, Management, and Hiring tabs. Division details report staffing, team size, and manager. Role compatibility is keyed directly to the established Division registry.

## Branch Integration

Assignments reference the existing headquarters or active Expansion branches. Global Expansion displays assigned employees and identifies managers alongside assigned divisions.

## Office Integration

The Headquarters Financial House status now includes total staff. The existing House Ledger remains the single entry point; no second office scene was added.

## Save / Migration

`workforce` is additive to V3. Existing saves receive `employees: []`. Valid employees, assignments, managers, loyalty, salaries, and statuses persist. Invalid scores, costs, IDs, duplicate employees, and duplicate managers are rejected and safely normalized.

## Tests

Dedicated tests cover schema bounds, role/seniority eras, deterministic candidates, successful and failed atomic hiring, capacity, location/division/role assignment, manager rules, Leadership capacity, staffing states, payroll, every employee effect, inactive filtering, truth protection, persistence, migration, and malformed saves.

## Browser Verification

PASS. Playwright verified hiring Clara Weiss, exact signing-cost deduction, Research assignment in New York, manager promotion, UNDERSTAFFED status, payroll, Headquarters staff count, reload persistence, and the responsive People screen at 1440 x 1000 and 390 x 844.

## Quality Gates

- Typecheck: PASS
- Tests: PASS, 260 tests in 21 files
- Lint: PASS
- Production Build: PASS
- Browser Verification: PASS, desktop and mobile

## UI / Game Experience Compliance

- Character HUD: PASS - House identity, investor resources, and career context remain visible.
- Investment Visibility: PASS - cash, signing costs, salaries, and payroll are explicit.
- Round Action: PASS - no automatic round mutation or payroll charge was added.
- Game Feel: PASS - candidates, department heads, division plaques, and location language support a historical financial-house experience.
- Responsive: PASS - verified at 1440 x 1000 and 390 x 844.
- Accessibility: PASS by implementation - written states, native buttons/selects, labels, disabled semantics, and keyboard focus are used.

## Open Points

Firing, severance, bonuses, pension obligations, poaching, loyalty events, scandals, burnout, client books, AUM, employee-driven deals, branch P&L, rival employees, and a full board structure remain future work.
