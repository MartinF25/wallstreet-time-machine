# Animation System

`RoundRevealState` owns the phases IDLE, DATE, MARKET, NEWS, EVENTS, PORTFOLIO, RISK, and COMPLETE. It contains IDs of newly visible information, before/after portfolio values, market movers, crisis state, and progress.

Motion tokens are instant, fast, normal, and dramatic. Animation speed supports NORMAL, FAST, and OFF. Reduced Motion forces immediate reveals and disables ticker motion. CSS transform and opacity provide transitions; no animation dependency or calculation loop is used. Reload shows the already persisted final round state.

