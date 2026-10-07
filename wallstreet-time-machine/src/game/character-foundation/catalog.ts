import type{CharacterArchetypeDefinition,CharacterModifier,CharacterTraitDefinition,CharacterWeaknessDefinition}from"./models";
const add=(stat:CharacterModifier["stat"],value:number,source:string):CharacterModifier=>({category:stat!.toUpperCase()as CharacterModifier["category"],stat,operation:"ADD",value,source});
export const CHARACTER_ARCHETYPES:CharacterArchetypeDefinition[]=[
 {id:"SPECULATOR",name:"Speculator",description:"Reads price action and acts before consensus forms.",strengths:["Trading","Speed"],tradeoff:"Accepts wider risk",baseStats:{trading:82,risk:58,information:55,network:42,reputation:48,influence:45}},
 {id:"VALUE_INVESTOR",name:"Value Investor",description:"Builds conviction from business quality and patient research.",strengths:["Information","Risk discipline"],tradeoff:"Can react slowly",baseStats:{trading:52,risk:72,information:84,network:42,reputation:58,influence:42}},
 {id:"NETWORKER",name:"Networker",description:"Turns relationships into early context and opportunity.",strengths:["Network","Influence"],tradeoff:"Relies on social access",baseStats:{trading:48,risk:52,information:62,network:86,reputation:60,influence:78}},
 {id:"CRISIS_TRADER",name:"Crisis Trader",description:"Keeps a clear head when liquidity and confidence collapse.",strengths:["Risk","Trading"],tradeoff:"Thrives in conditions that rarely last",baseStats:{trading:76,risk:84,information:66,network:38,reputation:50,influence:42}},
 {id:"CORPORATE_RAIDER",name:"Corporate Raider",description:"Uses control, negotiation and capital structure as weapons.",strengths:["Influence","Negotiation"],tradeoff:"Carries reputation risk",baseStats:{trading:64,risk:62,information:58,network:68,reputation:36,influence:88}},
 {id:"BANKER",name:"Banker",description:"Combines disciplined risk assessment with institutional reach.",strengths:["Reputation","Network"],tradeoff:"Moves within institutional constraints",baseStats:{trading:48,risk:76,information:68,network:74,reputation:84,influence:66}}
];
export const CHARACTER_TRAITS:CharacterTraitDefinition[]=[
 {id:"TAPE_READER",name:"Tape Reader",description:"Spots momentum and reversals in market action.",modifiers:[add("trading",8,"Tape Reader")]},
 {id:"CONTRARIAN",name:"Contrarian",description:"Finds opportunity when consensus becomes crowded.",modifiers:[add("trading",4,"Contrarian"),add("risk",4,"Contrarian")]},
 {id:"CALCULATED_RISK",name:"Calculated Risk",description:"Sizes exposure with unusual discipline.",modifiers:[add("risk",9,"Calculated Risk")]},
 {id:"NETWORK_BUILDER",name:"Network Builder",description:"Cultivates durable sources and alliances.",modifiers:[add("network",9,"Network Builder")]},
 {id:"DEEP_RESEARCH",name:"Deep Research",description:"Extracts signal from difficult evidence.",modifiers:[add("information",10,"Deep Research")]},
 {id:"FAST_OPERATOR",name:"Fast Operator",description:"Acts decisively while a window is open.",modifiers:[add("trading",6,"Fast Operator"),{category:"DECISION_SPEED",operation:"MULTIPLY",value:1.1,source:"Fast Operator"}]},
 {id:"NEGOTIATOR",name:"Negotiator",description:"Wins better terms under pressure.",modifiers:[add("influence",8,"Negotiator"),add("reputation",3,"Negotiator")]},
 {id:"MARKET_HISTORIAN",name:"Market Historian",description:"Recognizes recurring market structures.",modifiers:[add("information",7,"Market Historian"),add("risk",3,"Market Historian")]}
];
export const CHARACTER_WEAKNESSES:CharacterWeaknessDefinition[]=[
 {id:"OVERCONFIDENT",name:"Overconfident",description:"Success can loosen risk discipline.",modifiers:[add("risk",-9,"Overconfident")]},
 {id:"IMPATIENT",name:"Impatient",description:"Long theses are hard to hold.",modifiers:[add("information",-6,"Impatient"),add("trading",3,"Impatient")]},
 {id:"RISK_AVERSE",name:"Risk Averse",description:"Capital protection can suppress opportunity.",modifiers:[add("trading",-7,"Risk Averse"),add("risk",5,"Risk Averse")]},
 {id:"REPUTATION_SENSITIVE",name:"Reputation Sensitive",description:"Public pressure can distort decisions.",modifiers:[add("reputation",-8,"Reputation Sensitive")]},
 {id:"INFORMATION_ADDICT",name:"Information Addict",description:"More research can delay action.",modifiers:[add("trading",-5,"Information Addict"),add("information",4,"Information Addict")]},
 {id:"LEVERAGE_HABIT",name:"Leverage Habit",description:"Borrowed capital amplifies fragile positions.",modifiers:[add("risk",-10,"Leverage Habit"),{category:"LEVERAGE",operation:"MULTIPLY",value:1.15,source:"Leverage Habit"}]}
];
