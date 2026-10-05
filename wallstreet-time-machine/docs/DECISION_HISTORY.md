# Decision History

Every player BUY, SELL, SHORT, COVER, and HOLD creates one episode-local `DecisionRecord`. Trades reference their decision through `decisionId`; HOLD creates no trade. Records retain the known market context, strategy, compact portfolio state before and after execution, reason, actor, and optional trade link. The timeline supports action and asset filters and uses neutral outcome language.
