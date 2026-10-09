# Game Experience & Visual Action Overhaul Report

## Summary

WallStreet Time Machine now presents each playable round as a sequence of situations rather than a collection of management screens. A deterministic Event Director selects one Morning Situation, supporting signals and ambient office activity from existing news, information, rival, deal, portfolio and market state. Trading adds a visible countdown and timed events. Closing now leads to a short newspaper-style Round Story.

## Why This Sprint Was Needed

The project already had deep market, Character, Information, Rival, Office, Employee and Deal systems, but most of their effects lived in separate screens. The player could manage data without feeling that people and events were entering the room. This sprint connects those existing systems through presentation and navigation without creating a second truth engine.

## Player Experience Before

Headquarters was a static illustrated navigation map. Pre-market was a balanced briefing grid. Trading changed only after direct player input or round advancement. Rivals appeared primarily in their dedicated screen. The Round Summary emphasized metrics, and Deal details emphasized process actions.

## Player Experience After

A round now opens with one visually dominant situation, partial consequence information and direct actions. The office shows ringing calls, newspaper extras, ticker state, research work and deal documents. The market session displays remaining time and receives deterministic, dismissible event moments. The close produces a headline and three to five prioritized narrative sentences based on recorded results.

## Hero Events

`getRoundExperienceEvents` produces one CRITICAL, MAJOR or STANDARD hero plus at most two supporting signals and optional ambient activity. Inputs are restricted to released historical events/news, player-visible information, filtered Rival Intelligence, current deals, portfolio alerts and current market state. Cards expose upside, risk, confidence where known, reputation exposure and two to four actions.

## Office Activity

Headquarters now starts with a Morning Situation and Character flavor. Telephone, Newspaper, Market Board, Conference Table and Research zones receive restrained labels and count badges from the current state. The office continues to use its existing physical scene and navigation targets.

## Dynamic Round Events

`getIntraRoundEventSchedule` derives stable event times from episode, round and seed. Events exist only in TRADING, are stored as triggered IDs for reload safety and cannot repeat. They appear as a dismissible paper/bulletin moment without pausing the session.

## Rival Presence

Only `getRivalBriefing` output enters the director. Hidden rival activity and exact hidden positions never appear. Visible action is presented as a Rival Activity bulletin with confidence, likely asset and routes to the existing Rivals or Market screens.

## Information Decisions

Current Information items can become the Morning Situation. INVESTIGATE routes to the existing Information Desk, and affected assets route to the existing Market. Confidence uses the existing bounded reliability display. Future, inaccessible, unseen, ignored and expired items are excluded.

## Deal Presentation

The existing mandate detail now explains the client situation, financing pressure, information uncertainty, visible rival pressure, reputation exposure and assigned lead. Event actions route to the existing Deal pipeline for review, acceptance or decline; the Deal engine remains authoritative.

## Employee Presence

Headquarters identifies an assigned employee and describes current preparation or research work. Research badges reflect existing Investigations and assigned Analysts/Researchers. Deal details show the existing assigned lead.

## Market Heat Presentation

Current sentiment affects Market Board language and priority. PANIC creates an urgent tape state; calmer sessions remain restrained. Critical historical or risk state can displace ordinary news as the hero. Existing Crisis visual treatment remains intact.

## Round Story

`getRoundStory` prioritizes the recorded market move, trades, strongest position, important released news, visible rival activity, information changes and completed deals. Output is deterministic, limited to five sentences and never reads hidden truth state or future data.

## Newspaper Moments

Large moves, major released headlines and exceptional deal outcomes can produce an EXTRA front page. The paper masthead, headline, columns and firm footer replace the former metric-card wall while retaining a compact result strip.

## Era Differences

Before 1920, situations use Private Wire, Newspaper Extra, ticker tape, telegram, paper mandate and broker-note language. Mid-century uses Market Bulletin and established office media. Modern years use Market Alert and the existing digital Office presentation. No computer, smartphone or push-notification object appears in the 1900 scene.

## Mobile Experience

The mobile Headquarters places identity, capital and the Morning Situation before the office zones. Hero actions and consequence previews use two-column or single-column layouts. The countdown stays visible, dynamic events fit the viewport, and the Round Story collapses from newspaper columns to one readable column.

## Accessibility

Events use text, priority labels, native buttons and written consequence levels. The countdown exposes `role=timer`; dynamic moments and session overlays have dialog labels. All motion is cosmetic, `prefers-reduced-motion` and the existing Reduced Motion setting remove event animation, and no meaning depends on color alone.

## Tests

Nine dedicated tests cover deterministic priority, future-data filtering, hidden-rival protection, deterministic unique schedules, trading-only schedules, reload deduplication, action routing, office activity and Round Story source/prioritization. The full suite passes 288 tests in 23 files.

## Browser Verification

PASS at 1440 x 1000 and 390 x 844. The verified path was: create Character, enter Headquarters/Campaign, see Morning Situation, continue through Opening Bell, see Countdown, receive a Dynamic Market Event, execute a short, close the round, read the newspaper Round Story, review overnight risk, return through the next opening and enter Headquarters again. Reload-safe event IDs, desktop interaction and mobile hierarchy were exercised without runtime errors.

Verification screenshots were captured as `experience-morning-desktop.png`, `experience-trading-desktop.png`, `experience-story-desktop.png`, `experience-office-desktop.png`, `experience-office-mobile.png` and `experience-trading-mobile.png` in the isolated verification workspace.

## Before / After Comparison

- Headquarters before: a useful static navigation scene. After: a prioritized Morning Situation, Character reaction, Employee note and stateful physical objects.
- Trading before: market chart, actions and END ROUND. After: prominent countdown, deterministic arriving bulletins and Rival/News presence while the market remains actionable.
- Round Summary before: equally weighted metric cards. After: a historical newspaper page with a headline, a short causal story and compact supporting metrics.
- Player experience before: systems were visited separately. After: existing systems interrupt, inform and redirect the same round loop.

## Quality Gates

- Typecheck: PASS
- Lint: PASS
- Tests: PASS, 288 tests in 23 files
- Production Build: PASS
- Desktop Browser Verification: PASS
- Mobile Browser Verification: PASS

## UI / Game Experience Compliance

- Character HUD: PASS - Character identity and contextual personality are present in Headquarters and Trading.
- Investment Visibility: PASS - capital, cash, exposure and round result remain visible.
- Round Action: PASS - Morning decisions, timed trade activity and close-story flow are explicit.
- Game Feel: PASS - situations, people, paper, time pressure and consequence framing replace the static dashboard rhythm.
- Responsive: PASS - desktop and mobile complete flow verified.
- Accessibility: PASS - semantic text/actions, dialog and timer roles, focusable controls and reduced motion support.

## Remaining Boring / Static Areas

Global Expansion, the Financial House division catalog, hiring/management lists, Career Statistics and Settings still feel primarily administrative. Deal negotiation is richer in context but still resolves through a small set of fixed actions. Employee moments are textual and do not yet develop into multi-round personal stories. The market chart still advances at round boundaries rather than animating a continuous intra-session price path. Those areas should be improved through future presentation work while preserving their existing domain engines.
