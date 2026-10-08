import type { OfficeEraPresentation, OfficeLevelDefinition, OfficeState, OfficeZoneDefinition } from "./models";

export const OFFICE_LEVELS:OfficeLevelDefinition[]=[
 {level:1,name:"Broker Office",description:"A compact operation built around paper, contacts and the market tape.",requiredCareerLevel:1},
 {level:2,name:"Successful Trader Office",description:"More room for research, communications and market records.",requiredCareerLevel:3},
 {level:3,name:"Wall Street Firm",description:"A professional firm with dedicated operating areas.",requiredCareerLevel:6},
 {level:4,name:"Investment House",description:"An institutional headquarters prepared for major transactions.",requiredCareerLevel:10},
 {level:5,name:"Global Financial Headquarters",description:"The command center of an international financial group.",requiredCareerLevel:15},
];

export const OFFICE_ZONES:OfficeZoneDefinition[]=[
 {id:"DESK",label:"Portfolio Desk",objectLabel:"DESK",description:"Review capital and return to the active market.",target:"MARKET",unlockLevel:1},
 {id:"MARKET_BOARD",label:"Market Board",objectLabel:"TICKER & QUOTE BOARD",description:"Enter the market or choose the next historical era.",target:"MARKET",unlockLevel:1},
 {id:"NEWSPAPER",label:"News & Rumors",objectLabel:"NEWSPAPER",description:"Read released news, rumors and private tips.",target:"INFORMATION",unlockLevel:1},
 {id:"TELEPHONE",label:"Contacts & Rivals",objectLabel:"TELEPHONE",description:"Observe contacts, rival investors and visible activity.",target:"RIVALS",unlockLevel:1},
 {id:"RESEARCH",label:"Research Area",objectLabel:"BOOKS & REPORTS",description:"Open the Information Desk and investigate sources.",target:"INFORMATION",unlockLevel:1},
 {id:"CHARACTER",label:"Investor Status",objectLabel:"INVESTOR PORTRAIT",description:"Manage character progression, credits and skills.",target:"PROFILE",unlockLevel:1},
 {id:"WORLD_MAP",label:"Global Expansion",objectLabel:"WORLD MAP",description:"Plan branches in international financial centers.",target:"EXPANSION",unlockLevel:1},
 {id:"CONFERENCE_TABLE",label:"Deals & M&A",objectLabel:"CONFERENCE TABLE",description:"Future corporate transactions and investment banking operations.",unlockLevel:4},
];

export const createOfficeState=():OfficeState=>({level:1,unlockedZones:OFFICE_ZONES.filter(x=>x.unlockLevel===1).map(x=>x.id),upgrades:[]});

export function normalizeOfficeState(value?:Partial<OfficeState>|null):OfficeState{const base=createOfficeState(),level=OFFICE_LEVELS.some(x=>x.level===value?.level)?value!.level!:1;return{level,unlockedZones:[...new Set([...base.unlockedZones,...(value?.unlockedZones??[])])],upgrades:[...new Set(value?.upgrades??[])]}}

export function getOfficeEraPresentation(year:number):OfficeEraPresentation{
 if(year<1920)return{id:"LEDGER",theme:"Ledger & Telegraph",marketDevice:"Ticker tape machine and chalk quote board",communicationDevice:"Candlestick telephone and telegraph",newsMedium:"Morning financial newspaper",researchMedium:"Ledgers, books and printed company reports",atmosphere:"Dark oak, brass, paper and coal-lit Wall Street"};
 if(year<1950)return{id:"DECO",theme:"Art Deco Exchange Office",marketDevice:"Improved ticker and exchange board",communicationDevice:"Desk telephone and messenger wire",newsMedium:"Financial press and late editions",researchMedium:"Bound reports and analyst memoranda",atmosphere:"Geometric brass details and a busy trading floor beyond"};
 if(year<1980)return{id:"MID_CENTURY",theme:"Mid-Century Financial Office",marketDevice:"Quote board and office market machine",communicationDevice:"Rotary telephone and telex",newsMedium:"Newspaper and financial television",researchMedium:"Paper research files and economic bulletins",atmosphere:"Institutional wood, steel cabinets and fluorescent light"};
 if(year<2000)return{id:"TERMINAL",theme:"Electronic Trading Office",marketDevice:"Electronic quote board and early terminal",communicationDevice:"Telephone and fax",newsMedium:"Financial television and wire service",researchMedium:"Terminal research and printed models",atmosphere:"Dense screens, market printouts and trading-floor energy"};
 return{id:"DIGITAL",theme:"Modern Institutional Headquarters",marketDevice:"Multi-market digital terminal",communicationDevice:"Secure digital communications",newsMedium:"Real-time institutional feed",researchMedium:"Digital research library and analytics",atmosphere:"Glass, focused light and global market connectivity"};
}
