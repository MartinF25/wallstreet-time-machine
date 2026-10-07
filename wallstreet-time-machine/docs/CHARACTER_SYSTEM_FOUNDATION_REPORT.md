# Character System Foundation Report

## Ergebnis

Die Character Foundation erweitert das bestehende Investor-Identity-System. Der aktive Player Character liegt als `InvestorProfile.character` im Career-Save und steht damit Campaign, HUD, Profil und späteren Rivalen- oder NPC-Systemen über ein gemeinsames Modell zur Verfügung.

## Implementierte Bausteine

- Sechs Kernwerte mit zentralen Grenzen von 0 bis 100: Trading, Risk, Information, Network, Reputation und Influence.
- Sechs ausgewogene Archetypen: Speculator, Value Investor, Networker, Crisis Trader, Corporate Raider und Banker.
- Acht Traits und sechs Weaknesses mit datengetriebenen Add- und Multiply-Modifikatoren.
- Deterministische Berechnung der effektiven Werte über `getEffectiveCharacterStats`.
- Zod-Validierung des vollständigen Character-Modells. Ein Character benötigt genau einen Archetyp, genau zwei unterschiedliche Traits und genau eine Weakness.
- XP- und Level-Helfer mit Übertrag überschüssiger XP.
- Wiederverwendbare `CharacterCard` für Player, historische Rivalen, fiktive Rivalen und NPCs.
- Responsive sechsstufige Erstellung: Name, Avatar, Archetyp, zwei Traits, Weakness, Zusammenfassung.

## Integration und Migration

Es wurde kein zweites konkurrierendes Profil- oder Savegame-System angelegt. Das bestehende `InvestorProfile` bleibt die Integrationsgrenze. Die bisherigen Era-Traits, Perks, Mentoren, Avatar-Evolution und Legacy-Werte bleiben erhalten.

Das Savegame bleibt Version 3, weil die Änderung additiv ist. `migrateToV3` ergänzt bei älteren V3-Spielständen ohne Character automatisch einen gültigen Legacy-Character. Alte Archetypen werden deterministisch auf die neue Auswahl abgebildet; Name, Avatar, Level und XP bleiben erhalten. Neue Karrieren erhalten bereits im Pending Profile eine valide Ausgangsstruktur, die im Setup ersetzt wird.

## Abweichungen und Entscheidungen

Die frühere Character-Erstellung verwendete Schritt 4 und 5 für Strategie und Schwierigkeit. Diese Werte bleiben im bestehenden Career-Save erhalten, sind aber nicht mehr Teil der Identitätsdefinition. Die sechs Schritte entsprechen jetzt der Character-Spezifikation. Die bestehenden zehn Identity-Archetypen bleiben intern für ältere Agent-, Reaktions- und Avatar-Regeln verfügbar; die neue Character-Domain besitzt den verbindlichen, kleineren Sechser-Katalog.

## Qualitätssicherung

- TypeScript Typecheck
- ESLint
- 113 automatisierte Tests in 14 Testdateien, davon 16 neue Character-Tests
- Next.js Production Build
- Browserprüfung des vollständigen Creation-Flows und der mobilen Darstellung

