# WallStreet Time Machine — Character System Skill

## Purpose

This skill defines the player character, investor identity, archetypes, traits, weaknesses, progression, and integration rules for **WallStreet Time Machine**.

It must be read before implementing character creation, investor identity, RPG progression, character cards, or character-related gameplay modifiers.

## 1. Character System Goal

The player should not be a faceless portfolio.

The character system should answer:
- Who am I?
- How do I trade?
- What am I good at?
- What am I bad at?
- How do others perceive me?
- How does my character change over time?

The character system should influence gameplay without replacing player skill.

## 2. Character Creator

Core fields:
- Name
- Avatar
- Background
- Archetype
- Traits
- Weakness
- Optional biography / origin

The player chooses:
- exactly one primary archetype
- exactly two traits
- exactly one weakness

## 3. Core Character Stats

Recommended stats:
- Trading
- Risk
- Information
- Network
- Reputation
- Influence

Optional future stats:
- Negotiation
- Analysis
- Crisis Control
- Leadership

## 4. Archetypes

### The Speculator
Strengths:
- momentum
- short selling
- volatility

Weakness:
- higher drawdown risk

### The Value Investor
Strengths:
- valuation
- long-term investing
- resilience

Weakness:
- slower reaction to momentum

### The Insider Networker
Strengths:
- contacts
- information
- deal access

Weakness:
- higher dependence on reputation

### The Crisis Trader
Strengths:
- panic markets
- liquidity events
- distressed assets

Weakness:
- weaker during stable markets

### The Corporate Raider
Strengths:
- control positions
- M&A
- aggressive acquisition

Weakness:
- expensive capital requirements

### The Banker
Strengths:
- financing
- bonds
- reputation
- client deals

Weakness:
- slower speculative growth

## 5. Traits

Examples:
- Tape Reader
- Contrarian
- Calculated Risk
- Network Builder
- Deep Research
- Fast Operator
- Negotiator
- Market Historian

Traits modify gameplay but should not remove risk.

## 6. Weaknesses

Examples:
- Overconfident
- Impatient
- Risk Averse
- Reputation Sensitive
- Information Addict
- Leverage Habit

Weaknesses should create meaningful tradeoffs without making a character unplayable.

## 7. Modifier Architecture

Modifiers should be data-driven.

Recommended modifier categories:
- transaction cost
- information reliability
- information cost
- margin limit
- risk exposure
- reputation gain/loss
- contact quality
- event outcome weighting
- short selling
- crisis resilience
- deal negotiation

All modifiers should be traceable to their source.

## 8. Character Card

The player character card should display:
- avatar
- name
- archetype
- level
- reputation
- main stats
- active traits
- weakness
- current status effects

Example:

```text
MARTIN FAUERBACH
Speculator

Level 7

Trading      74
Risk         81
Information  58
Network      62
Reputation   69
Influence    47

Traits:
Tape Reader
Calculated Risk

Weakness:
Overconfident
```

## 9. Character Progression

Possible progression sources:
- successful trades
- crisis survival
- information usage
- reputation milestones
- deals
- office expansion
- historical scenario goals

Character levels should unlock choices, not only flat bonuses.

## 10. Credits

Credits are a meta-progression currency.

Credits may unlock:
- new characters
- archetypes
- skill branches
- office features
- scenarios
- historical starting conditions
- branch capabilities

Credits must remain separate from in-run cash.

## 11. Skill Tree

Recommended branches:

### Trading
- Tape Reading
- Short Selling
- Momentum
- Execution

### Information
- Research
- Source Evaluation
- Rumor Analysis
- Intelligence Network

### Network
- Bankers
- Journalists
- Industrialists
- Institutional Contacts

### Risk
- Margin Control
- Crisis Discipline
- Liquidity Management
- Drawdown Recovery

### Reputation
- Client Trust
- Deal Access
- Institutional Standing
- Public Influence

### Empire
- Office Management
- Branch Expansion
- Leadership
- Business Divisions

## 12. Skills Must Have Tradeoffs

Avoid pure power stacking.

Preferred design:
- advantage + cost
- advantage + requirement
- advantage + situational weakness

Example:

```text
Tape Reader II

Cost:
350 Credits

Effect:
Detect unusual volume one phase earlier.

Requirement:
Tape Reader I
```

## 13. Rival Characters

Historical or fictional rivals should use the same underlying framework.

Rivals may have:
- archetype
- traits
- weakness
- capital
- reputation
- risk tolerance
- network
- strategy
- hidden objectives

Not every rival stat should be visible to the player.

## 14. Historical Figures

Historical figures may inspire or appear as characters where appropriate.

Examples:
- Jesse Livermore
- J.P. Morgan
- John D. Rockefeller
- Benjamin Graham
- Warren Buffett
- George Soros
- Carl Icahn

Do not reduce historical figures to caricatures.

## 15. Character + Office Integration

Character progression should influence the office.

Examples:
- higher reputation → more prestigious office
- higher network → more contact options
- stronger research → improved research department
- empire skills → branch efficiency
- leadership → better employee performance

## 16. Character + Information Integration

Character traits should affect:
- rumor evaluation
- source access
- investigation success
- confidence estimates
- cost of information

The player should never receive perfect information automatically.

## 17. Character + Round Integration

Characters may affect:
- Pre-Market briefing
- Opening Bell opportunities
- Trading Phase actions
- Closing Bell summary
- Overnight risk

## 18. Save Model

Character data must be versioned and validated.

Save:
- identity
- avatar
- archetype
- traits
- weakness
- stats
- level
- XP / progression
- unlocked skills
- credits
- reputation
- legacy milestones

Migration paths are required when the schema changes.

## 19. Testing Requirements

Test at minimum:
- valid character creation
- exactly two traits
- exactly one weakness
- archetype validation
- modifier application
- save/load
- migration
- UI rendering
- edge cases
- deterministic calculations where required

## 20. Quality Gates

Before completion:
- typecheck passes
- lint passes
- tests pass
- production build passes
- character creation validated
- modifiers covered by tests
- no hidden UI-only gameplay logic
- save schema versioned
- mobile UI checked

## 21. Design Guardrails

Do not:
- make one archetype clearly superior
- stack unlimited passive bonuses
- make credits equal direct wealth
- hide critical consequences
- create traits that remove risk entirely

Do:
- create meaningful tradeoffs
- encourage multiple playstyles
- integrate characters into market decisions
- preserve player agency
- make progression visible

## Vision

The player should be able to tell a story such as:

> I started as an aggressive speculator with a strong information network. I survived the crash, built a reputation, opened London and Frankfurt, and eventually turned my trading operation into a global financial house.

That progression is the purpose of the character system.
