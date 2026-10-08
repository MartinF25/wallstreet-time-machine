# WALL STREET: TIME MACHINE
## UI & GAME EXPERIENCE SKILL

**Skill Name:** `wallstreet-game-ui`

**Purpose:**  
Dieser Skill definiert die verbindliche visuelle, interaktive und spielerische Designsprache für **WALL STREET: TIME MACHINE**.

Er muss bei jeder Änderung berücksichtigt werden, die betrifft:

- UI
- UX
- Screens
- Navigation
- Portfolio
- Trading
- Character
- Avatars
- Events
- News
- Intelligence
- Agents
- Campaign
- Career
- Crisis Mode
- Round Flow
- Charts
- Animations
- Game Feel
- Responsive Design

Dieser Skill ist kein optionaler Style Guide.

Er ist die visuelle Produktbasis des Spiels.

---

# 1. PRODUKTIDENTITÄT

WALL STREET: TIME MACHINE ist **KEIN Finanz-Dashboard mit Spielmechanik**.

Es ist:

**HISTORICAL STRATEGY GAME**

+

**FINANCIAL MARKET SIMULATION**

+

**CINEMATIC TRADING EXPERIENCE**

Das Spiel muss sich anfühlen wie:

Bloomberg Terminal

+

Grand Strategy Game

+

Historical Financial Drama

+

Modern Management Game

---

# 2. ZENTRALES DESIGN-ZIEL

Der Spieler muss jederzeit beantworten können:

- Wer bin ich?
- In welcher Epoche bin ich?
- Was passiert gerade?
- Was habe ich investiert?
- Was hat sich in dieser Runde verändert?
- Wie ist mein Portfolio exponiert?
- Was ist mein Risiko?
- Welche Entscheidung kann ich jetzt treffen?

Wenn eine Hauptansicht diese Fragen nicht schnell beantwortet:

**UI überarbeiten.**

---

# 3. KEIN TROCKENES DASHBOARD

Vermeide:

- reine Tabellenansichten
- viele gleichgewichtete Cards
- riesige Mengen kleiner Kennzahlen
- statische Dashboard-Layouts
- UI ohne visuelle Priorität
- UI ohne Charakter
- UI ohne zentrale Aktion

Jeder Hauptscreen braucht:

**eine klare visuelle Hauptzone.**

---

# 4. PRIMARY GAME SCREEN

Standardstruktur Desktop:

**LEFT HUD**

**CENTER ACTION AREA**

**RIGHT INVESTMENT HUD**

**BOTTOM ACTION BAR**

---

# 5. LEFT HUD – INVESTOR

Links soll der Spieler seine Identität sehen.

Mindestens:

- Avatar Portrait
- Investor Name
- Archetype
- Level
- Current Era
- optional Mood

Beispiel:

```text
[MARTIN PORTRAIT]

MARTIN

MACRO STRATEGIST

LEVEL 6

MARKET OPERATOR

ERA

THE GREAT CRASH
```

---

# 6. AVATAR MUSS SICHTBAR SEIN

Der Avatar darf nicht nur im Profile Screen existieren.

Auf dem Hauptspielscreen muss mindestens eine kompakte Version sichtbar sein.

Empfehlung Desktop:

72–110 px.

Tablet:

64–90 px.

Mobile:

48–64 px.

---

# 7. ERA AVATAR

Immer aktuelle Era Presentation aus dem Era Identity System verwenden.

Beispiel:

- 1929: Art Deco Wall Street Portrait
- 1973: Commodity / Financial Press Look
- 1987: Trading Floor
- 2026: Modern Macro / Quant

---

# 8. CHARACTER REACTION

Bei wichtigen Ereignissen darf der Avatar größer erscheinen.

Beispiel:

```text
SYSTEMIC EVENT

BLACK THURSDAY

[Avatar – ALERT]

"Liquidity is becoming as important as valuation."
```

Danach wieder kompakter HUD-Modus.

---

# 9. CENTER ACTION AREA

Das Zentrum des Screens gehört dem:

- MARKT
- EVENT
- CHART
- ROUND REVEAL
- PLAYER DECISION

Nicht:

einer Tabelle.

---

# 10. CENTRAL MARKET AREA

Normalerweise anzeigen:

- Primary Market Chart
- Selected Asset
- Market State
- Market Heat
- Top Movers
- Current Date
- Round Number

---

# 11. DATE MUSS SICHTBAR SEIN

Groß genug:

```text
OCTOBER 24, 1929

ROUND 94
```

Der Spieler soll immer wissen:

**wann er sich befindet.**

---

# 12. RIGHT HUD – THIS ROUND

Einer der wichtigsten Bereiche des gesamten Spiels.

Titel:

**THIS ROUND**

Immer sichtbar oder leicht erreichbar.

Zeige:

- Start Capital
- Invested This Round
- Bought This Round
- Sold This Round
- Shorted This Round
- Covered This Round
- Current Cash
- Round P&L
- Round Return

---

# 13. INVESTED THIS ROUND

Der Spieler muss sofort sehen:

wie viel Kapital er in dieser Runde eingesetzt hat.

Beispiel:

```text
INVESTED THIS ROUND

$22,000

BANKING LONG
$10,000

GOLD LONG
$5,000

INDUSTRIALS SHORT
$7,000
```

---

# 14. ROUND INVESTMENT TRACKER

Implementiere / verwende:

`RoundInvestmentSummary`

mindestens:

- roundNumber
- startCapital
- startCash
- buyValue
- sellValue
- shortValue
- coverValue
- feesPaid
- borrowFees
- endCash
- roundPnL
- roundReturn
- trades

---

# 15. ROUND START VS CURRENT

UI sollte zeigen können:

```text
START OF ROUND

Portfolio:
$104,200

Cash:
$53,200

↓

CURRENT

Portfolio:
$105,540

Cash:
$31,200

Round Result:
+$1,340
```

---

# 16. CURRENT EXPOSURE

Rechtes HUD zusätzlich:

```text
CURRENT EXPOSURE

LONG
$61,000

SHORT
$12,000

CASH
$31,200

NET EXPOSURE
$49,000

GROSS EXPOSURE
$73,000
```

---

# 17. POSITION BREAKDOWN

Maximal 4–6 wichtigste Positionen direkt sichtbar.

Rest:

**VIEW PORTFOLIO**

Beispiel:

```text
BANKING LONG
31 %

GOLD LONG
14 %

INDUSTRIALS SHORT
9 %

BONDS LONG
12 %
```

---

# 18. BOTTOM ACTION BAR

Primäre Spieleraktionen immer deutlich.

Desktop:

- BUY
- SELL
- SHORT
- COVER
- HOLD
- NEXT ROUND

Nicht in kleinen Menüs verstecken.

---

# 19. ACTION PRIORITY

NEXT ROUND darf nicht dominieren, solange eine aktive Entscheidung sinnvoll ist.

Beispiel:

BUY / SELL / SHORT / COVER / HOLD

werden zuerst gezeigt.

NEXT ROUND klar getrennt.

---

# 20. HOLD IST EINE AKTION

HOLD darf nicht wie "nichts tun" wirken.

Wenn gewählt:

```text
HOLD POSITION

No trade executed.

Current strategy maintained.
```

---

# 21. TRADE FEEDBACK

Trade muss unmittelbar sichtbar sein.

Beispiel:

```text
ORDER EXECUTED

SHORT

BANKING

120 shares

Entry:
$82.40

Position Value:
$9,888

Margin Used:
$4,944
```

---

# 22. PORTFOLIO UPDATE

Nach Trade:

Cash / Exposure / Position Card animiert aktualisieren.

Keine Seite komplett neu laden.

---

# 23. ROUND FLOW

Eine Runde soll als Ablauf erlebt werden.

Nicht:

Click → Zahlen ändern.

Sondern:

```text
NEXT ROUND

↓

DATE

↓

MARKET OPEN

↓

PRICE MOVES

↓

NEWS

↓

DATA

↓

EVENTS

↓

PORTFOLIO IMPACT

↓

RISK

↓

ANALYST UPDATE

↓

PLAYER DECISION
```

---

# 24. NORMAL ROUND

Normale Reveal-Dauer:

ca. 2–4 Sekunden.

---

# 25. CRISIS ROUND

Crisis Reveal:

ca. 4–7 Sekunden.

Immer:

- SKIP
- REVEAL ALL

---

# 26. ACTION MOMENTS

Große Bewegungen müssen sichtbar werden.

Beispiele:

- MARKET SELLOFF
- SHORT SQUEEZE
- MARGIN CALL
- SYSTEMIC EVENT
- BREAKING NEWS
- POSITION UNDER PRESSURE
- NEW ERA
- ACHIEVEMENT
- MENTOR UNLOCK

---

# 27. MARKET OPEN

Kurzer Startmoment:

**MARKET OPEN**

oder:

**MARKET UPDATE**

Danach bewegen sich Preise.

---

# 28. MARKET TICKER

Dezenter Ticker:

```text
BANK -4.8 % • GOLD +1.3 % • RAIL -2.2 % • IND -3.7 %
```

Kein Casino-Ticker.

---

# 29. CHARTS

Charts sind zentraler Spielinhalt.

Nicht zu klein.

Selected Asset Chart sollte auf Desktop ein Hauptvisual sein.

---

# 30. CHART ACTION

Neue Datenpunkte dürfen animiert erscheinen.

Bei großem Move:

kurzer Fokus.

Keine dauernden Animationen.

---

# 31. TOP MOVERS

Direkt neben / unter Chart:

```text
TOP MOVERS

BANKING
-7.8 %

GOLD
+2.1 %

RAILROADS
-4.4 %
```

---

# 32. MARKET HEAT

Sichtbare Skala:

**CALM → ACTIVE → NERVOUS → STRESSED → PANIC**

Nicht als Zukunftsindikator.

---

# 33. CRISIS MODE

Wenn Crisis Mode aktiv:

UI muss dies sofort vermitteln.

Header:

```text
CRISIS MODE

1 ROUND = 1 TRADING DAY

MARKET STRESS

SEVERE
```

---

# 34. CRISIS VISUALS

Erlaubt:

- dunklere Panels
- stärkere Kontraste
- Amber / Red Highlights
- dichterer Ticker
- prominente Event Cards

Nicht:

- komplett roter Screen
- permanentes Blinken
- Glitch-Horror

---

# 35. BREAKING NEWS

Wichtige News:

nicht einfach im Feed verschwinden lassen.

Overlay:

```text
BREAKING

BANKING FEARS INTENSIFY

Kurze Summary.
```

Danach:

in News Feed übernehmen.

---

# 36. HISTORICAL EVENTS

Große Events:

```text
SYSTEMIC EVENT

BLACK THURSDAY

October 24, 1929
```

mit:

- Event Card
- Character Reaction
- Market Impact
- Continue

---

# 37. HISTORICAL ATMOSPHERE

Design verändert sich subtil nach Epoche.

- 1900: Ledger / Telegraph
- 1920s: Art Deco / Financial Press
- 1940s: Bulletin / Reports
- 1970s: Financial Newspaper / TV
- 1980s: Trading Terminal
- 1990s: Electronic Markets
- 2000s: Early Digital Finance
- Modern: Institutional Terminal

---

# 38. NICHT JEDEN SCREEN KOMPLETT UMBAUEN

Die grundlegende Navigation bleibt konsistent.

Era Theme verändert:

- Texture
- Headers
- Avatar
- Event Presentation
- Background Details

nicht die gesamte Bedienlogik.

---

# 39. CHARACTER-FIRST DESIGN

Bei Career Screens immer:

- Investor Portrait
- Name
- Archetype
- Progress

sichtbar.

Der Spieler ist Teil der Geschichte.

---

# 40. CHARACTER STATUS

Optional kompakt:

- FOCUSED
- CONCERNED
- ALERT
- CONFIDENT

Keine psychologische Simulation.

---

# 41. INVESTMENT VISIBILITY

Auf jeder Trading-relevanten Ansicht muss mindestens eines sichtbar sein:

- Current Position
- Current Exposure
- Round Investment
- Round P&L
- Cash

Kein Trading Screen ohne Kapitalbezug.

---

# 42. PORTFOLIO VIEW

Portfolio darf mehr Details haben.

Aber Top Zone immer:

- TOTAL VALUE
- ROUND P&L
- TOTAL RETURN
- CASH
- LONG
- SHORT
- NET EXPOSURE
- GROSS EXPOSURE

---

# 43. POSITION CARDS

Position Cards zeigen:

- Asset
- LONG / SHORT
- Value
- Entry
- Current
- P&L
- Allocation
- Risk

---

# 44. SHORT POSITION

SHORT immer explizit.

Beispiel:

```text
BANKING

SHORT

Entry:
82.40

Current:
71.10

P&L:
+$1,356

Margin:
$4,944
```

---

# 45. INVESTMENT RESULT

Der Spieler muss verstehen:

**"Meine Entscheidung aus letzter Runde hat X bewirkt."**

Round Summary:

```text
YOUR DECISIONS

Bought:
Gold $5,000

Shorted:
Banking $8,000

Held:
Bonds

RESULT

Gold:
+$120

Banking Short:
+$480

Fees:
-$35

ROUND P&L:
+$565
```

---

# 46. DECISION HISTORY

Nicht nur Trade History.

Auch:

**Decision History.**

Zeige:

- WHY
- OUTCOME

---

# 47. ACTION FEEDBACK

Positive Rückmeldung:

**POSITION GAIN**

Negative:

**POSITION LOSS**

Neutral:

**POSITION UNCHANGED**

Keine Jubelanimationen.

---

# 48. CHARACTER ABILITY

Wenn Archetype Ability relevant wird:

kleines Hinweis-Icon.

Beispiel:

```text
MACRO STRATEGIST

BIG PICTURE ACTIVE

Expanded macro context available.
```

Nicht permanent aufdringlich.

---

# 49. ABILITY ICONS

Jede Ability erhält:

klares kleines Icon.

Beispiele:

- Macro: globe / chart
- Risk: shield
- Industrial: factory
- Commodity: barrel / gold
- Historian: archive
- Speculator: trend line

Keine Emojis als finale Produkticons.

---

# 50. ICON SYSTEM

Verwende eine konsistente Icon Library.

Wenn bereits Lucide, Heroicons oder ähnliche vorhanden:

bestehende Library verwenden.

Nicht mehrere Icon Libraries mischen.

---

# 51. CHARACTER ICON

Wenn Portrait nicht verfügbar:

niemals leere Box.

Fallback:

stylized silhouette / initials.

---

# 52. NAVIGATION

Navigation soll sich wie Game Navigation anfühlen.

Empfohlen:

- MARKET
- PORTFOLIO
- INTELLIGENCE
- ANALYSTS
- CAREER
- HISTORY

Nicht:

20 gleichwertige Menüpunkte.

---

# 53. SECONDARY FEATURES

Settings, Profile, Research, Watchlist, Mentors und Gallery über Subnavigation / Profile erreichbar.

---

# 54. SCREEN HIERARCHY

Jeder Screen hat:

- PRIMARY
- SECONDARY
- TERTIARY

Information.

Nicht alles gleich groß.

---

# 55. VISUAL PRIORITY

Typische Priorität Hauptscreen:

1. Current Market / Event
2. Current Investments
3. Player Action
4. Portfolio Result
5. Character
6. Supporting Intelligence

---

# 56. COLORS

Basis:

- Charcoal / Black
- Warm Off-White
- Muted Gold
- Positive Green
- Negative Red
- Warning Amber

Keine grellen Farben.

---

# 57. GOLD

Gold ist Brand-/Historical Accent.

Nicht jeder Button Gold.

Primär für:

- Era
- Character
- Important Highlights
- Historical Identity

---

# 58. POSITIVE / NEGATIVE

Green / Red primär:

financial change.

Nicht für allgemeine Navigation.

---

# 59. TYPOGRAPHY

Main UI:

clean readable sans-serif.

Historical Headers:

optional serif / display font.

Numbers:

tabular numerals wenn möglich.

---

# 60. NUMBER DESIGN

Finanzzahlen prominent.

Beispiel:

```text
$124,840

+2.81 %
```

Nicht versteckt in Fließtext.

---

# 61. MICRO ANIMATIONS

Erlaubt:

- count-up/down
- fade
- slide
- scale
- highlight
- chart draw
- single pulse

---

# 62. VERBOTENE ANIMATIONEN

Keine:

- endlosen pulses
- wiggle
- bounce loops
- rotating cards
- confetti
- slot-machine effects

---

# 63. AUDIO

Optional:

- opening bell
- news alert
- trade execute
- crisis low tone

Sehr kurz.

Audio respektiert Settings.

---

# 64. RESPONSIVE

Desktop-first.

iPad ausdrücklich hochwertig.

Mobile:

kompakt, aber Kernspiel weiterhin möglich.

---

# 65. DESKTOP LAYOUT

Empfohlene Breite:

Left HUD:
15–20 %

Center:
55–65 %

Right HUD:
20–25 %

Nicht zwingend exakt.

---

# 66. TABLET

Character HUD kann in Header wandern.

Right HUD:

drawer oder kompakte Side Column.

---

# 67. MOBILE

Header:

- Avatar
- Capital
- Round P&L

Tabs:

- MARKET
- POSITIONS
- ACTION
- INFO

---

# 68. ACTION BAR MOBILE

Sticky innerhalb App Layout:

- BUY
- SELL
- SHORT
- COVER
- HOLD

---

# 69. ACCESSIBILITY

- prefers-reduced-motion unterstützen
- Keyboard Navigation
- Clear Focus
- Icons mit Labels / aria-label
- Nicht nur Farbe für LONG/SHORT/RISK

---

# 70. EMPTY STATES

Keine langweiligen:

`No data`

Meldungen.

Beispiel:

```text
NO POSITIONS

Your capital is currently held in cash.

Choose a market to begin investing.
```

---

# 71. LOADING STATES

Historical Data:

```text
LOADING MARKET DATA
```

nicht:

spinner-only.

---

# 72. ERROR STATES

Provider Failure:

```text
Historical source unavailable.

Using approved cached data.
```

Keine technische Fehlermeldung für Spieler.

---

# 73. GAME FEEL PRIORITY

Bei Konflikt zwischen:

mehr Daten

und:

besserer Spielbarkeit

zuerst bessere Informationshierarchie schaffen.

Nicht Daten entfernen.

Aber:

Details einklappbar machen.

---

# 74. ADVANCED DATA

Source / provenance / detailed indicators:

Details Drawer.

Nicht immer im Vordergrund.

---

# 75. MAIN GAME LOOP

Der UI muss diesen Loop unterstützen:

```text
OBSERVE

↓

ANALYZE

↓

DECIDE

↓

TRADE / HOLD

↓

ADVANCE ROUND

↓

EXPERIENCE RESULT

↓

ADAPT
```

---

# 76. OBSERVE

Spieler sieht:

- Market
- News
- Events
- Data

---

# 77. ANALYZE

Spieler sieht:

- Agents
- Risk
- Strategy
- Watchlist

---

# 78. DECIDE

Spieler entscheidet:

- BUY
- SELL
- SHORT
- COVER
- HOLD

---

# 79. EXPERIENCE RESULT

Besonders wichtig.

Spieler sieht:

was seine Entscheidung bewirkt hat.

---

# 80. ADAPT

Danach:

- new risk
- new strategy
- new trade

---

# 81. THIS ROUND CARD – STANDARD

Auf Trading Screen mindestens:

```text
THIS ROUND

Start:
$100,000

Invested:
$24,000

Sold:
$5,000

Short:
$8,000

Fees:
$92

Round P&L:
+$640

Cash:
$73,000
```

---

# 82. ROUND RESULT CARD

Nach Round Reveal:

```text
ROUND RESULT

Portfolio:
+$1,340

Best Position:
Gold +$620

Worst Position:
Banking -$480

Short P&L:
+$390

Fees:
-$55
```

---

# 83. CURRENT DECISION

Screen soll optional anzeigen:

```text
CURRENT DECISION

Asset:
BANKING

Position:
SHORT

Amount:
$10,000

Risk:
HIGH

Confirm / Cancel
```

---

# 84. RISK PREVIEW

Vor Trade:

Portfolio impact preview.

Beispiel:

```text
Before:
Banking Exposure 24 %

After:
38 %

Strategy Limit:
40 %
```

---

# 85. MARGIN PREVIEW

SHORT:

- Initial Margin
- Margin Available
- Resulting Margin Utilization
- Borrow Fee

sichtbar.

---

# 86. CHARACTER + DECISION

Bei sehr großem Trade:

Character Reaction optional.

Risk Officer:

> "This position will materially increase concentration."

Nicht bei jedem kleinen Trade.

---

# 87. CRISIS ACTION PANEL

In Crisis Mode:

zusätzliche Schnellaktionen:

- REVIEW RISK
- RUN SCENARIO
- RAISE CASH
- REVIEW NEWS
- HOLD

RAISE CASH darf nur Navigation/Trade Prep sein.

Keine automatische Position verändern.

---

# 88. NO AUTOPILOT

UI darf Entscheidungen erleichtern.

Nie automatisch handeln.

---

# 89. ICONOGRAPHY

Definiere Icons für:

- BUY
- SELL
- SHORT
- COVER
- HOLD
- CASH
- RISK
- NEWS
- EVENT
- MACRO
- MARKET
- COMMODITY
- BANKING
- ERA
- CHARACTER
- MENTOR
- ACHIEVEMENT
- MARGIN

---

# 90. UI COMPONENT LIBRARY

Erstelle / pflege wiederverwendbare Components:

- CharacterHud
- InvestorPortrait
- RoundInvestmentPanel
- ExposurePanel
- PositionCard
- TradeActionBar
- MarketTicker
- MarketHeat
- BreakingNewsOverlay
- HistoricalEventOverlay
- CrisisBanner
- RoundResultPanel
- DecisionPanel
- AgentUpdateCard
- RiskAlertCard
- EraHeader
- CareerBadge

---

# 91. COMPONENT STANDARD

Jede Component braucht:

- loading state wenn nötig
- empty state
- responsive behavior
- accessibility
- reduced-motion handling

---

# 92. DESIGN TOKENS

Zentral definieren:

- spacing
- border radius
- panel background
- border
- positive
- negative
- warning
- historical accent
- typography scale
- motion durations

---

# 93. KEINE MAGIC STYLES

Keine zufälligen inline Farben.

Keine pro Screen komplett eigenen Styles.

---

# 94. GAME UI QA CHECKLIST

Bei jedem neuen Feature prüfen:

- Ist der Avatar sichtbar oder sinnvoll erreichbar?
- Ist die aktuelle Era sichtbar?
- Ist Current Date sichtbar?
- Ist Current Capital sichtbar?
- Ist Round Investment sichtbar?
- Ist Cash sichtbar?
- Ist Position Direction sichtbar?
- Ist Round P&L sichtbar?
- Sind aktuelle Aktionen sichtbar?
- Gibt es visuelle Reaktion auf wichtige Events?
- Ist der Screen zu dashboard-lastig?

---

# 95. TRADING SCREEN QA

Trading Screen darf erst als fertig gelten wenn:

- Selected Asset klar
- Chart groß genug
- Position sichtbar
- Cash sichtbar
- Current Exposure sichtbar
- This Round sichtbar
- Trade Actions sichtbar
- Risk Preview sichtbar

---

# 96. CRISIS QA

Crisis Screen:

- Crisis Mode sichtbar
- Event sichtbar
- Portfolio Impact sichtbar
- Risk sichtbar
- Character Reaction optional
- Player Actions sichtbar

---

# 97. CHARACTER QA

Avatar:

- nicht zu klein
- nicht nur dekorativ
- Era Style korrekt
- Fallback vorhanden
- Alt text korrekt

---

# 98. ANIMATION QA

Animation:

- unterstützt Information
- blockiert Gameplay nicht
- Skip möglich
- Reduced Motion möglich

---

# 99. SCREENSHOT TESTING

Für zentrale Screens Visual Regression pflegen:

- Main Game
- Normal Round
- Trade Open
- Short Open
- Crisis Mode
- Breaking News
- Margin Call
- Portfolio
- Analyst Desk
- Character Profile
- Era Transition

---

# 100. DESIGN REVIEW RULE

Bei jedem größeren Sprint:

vor Abschluss Screens gegen diesen Skill prüfen.

Im Sprint Report Abschnitt hinzufügen:

**UI Skill Compliance**

mit:

- PASS
- PARTIAL
- FAIL

und Begründung.

---

# 101. REQUIRED REPORT SECTION

Jeder zukünftige Sprint Report enthält:

## UI / Game Experience Compliance

Character HUD:  
PASS / PARTIAL / FAIL

Investment Visibility:  
PASS / PARTIAL / FAIL

Round Action:  
PASS / PARTIAL / FAIL

Game Feel:  
PASS / PARTIAL / FAIL

Responsive:  
PASS / PARTIAL / FAIL

Accessibility:  
PASS / PARTIAL / FAIL

---

# 102. DO NOT

Keine:

- trockene SaaS-App
- reine Admin-Oberfläche
- Card-Wüste
- Daten ohne Priorität
- Hauptscreens ohne Action
- Trading Screens ohne Investmentsicht
- Career Screens ohne Character Identity

---

# 103. PRODUCT TEST

Wenn ein Screenshot des Spiels auch als:

**B2B Finance Dashboard**

durchgehen könnte,

ist das Design noch nicht spielerisch genug.

Wenn es wie:

**historisches Finanzstrategiespiel**

aussieht,

ist die Richtung richtig.

---

# 104. FINAL DESIGN PRINCIPLE

Der Spieler soll nicht denken:

**"Ich verwalte Daten."**

Er soll denken:

**"Ich bin mitten im Markt."**

---

# 105. FINAL GAME LOOP PRINCIPLE

Every important screen should reinforce:

**THIS IS MY INVESTOR.**

**THIS IS MY MONEY.**

**THIS IS MY POSITION.**

**THIS IS WHAT JUST HAPPENED.**

**THIS IS THE RISK.**

**THIS IS MY NEXT DECISION.**

Wenn einer dieser Punkte auf dem Hauptspielscreen fehlt:

**UI überarbeiten.**
