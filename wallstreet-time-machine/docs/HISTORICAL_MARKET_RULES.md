# Historical Market Rules

Date-effective rules support short permissions, bans, margin, borrow restrictions, closures, holidays, price limits, liquidity restrictions, halts, and forced-liquidation delays. Rules apply only on or after `effectiveFrom`. Historical claims require a verified source; current baseline margin and liquidation delay are explicitly `SIMULATED` gameplay rules.

Existing positions can remain open under a `NO_NEW_SHORTS` policy. Other future policies can specify allow-existing or forced-cover behavior without changing the rule model.
