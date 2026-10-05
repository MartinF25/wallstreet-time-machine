# Risk System

Sprint 5 adds current gross leverage, short exposure, margin utilization, margin-call, and squeeze-risk alerts. These signals use current positions, current prices, and borrow availability only.

The rule-based risk engine evaluates cash, equity exposure, single positions, sectors, drawdown, and stressed regimes from current known state. Alerts contain severity, evidence text, affected assets, and the triggering strategy rule. They explain current exposure and never predict future events.
