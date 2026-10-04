# Agent System

Archetypes may reorder desks and add display context. `personalizeAnalyses` preserves every underlying signal unchanged, so identity cannot turn a negative signal positive.

Sprint 4 adds six deterministic analyst desks: Market, Macro, Risk, News, Commodity, and Strategy. `RuleBasedAgentProvider` receives an immutable `AgentContext` derived from the Sprint 3 intelligence context. It never receives an episode definition or future event data and cannot place trades.

Every analysis records its game date, round, confidence, evidence references, observations, and up to three signals. The runtime is synchronous and deterministic so an identical state produces identical output. `AgentProvider` is the extension boundary for a future provider.

Analyses and signals are deduplicated and capped at 120 entries. Per-agent memory retains the last 20 analyses. Agents can be disabled independently through `AgentSettings`.
