import type { EraDefinition } from "./types";

const data:[string,string,number,number,string,string,string?][]=[
 ["E01","Age of Trusts",1900,1906,"Industrial concentration, rapid growth, and fragile confidence.","Build a foundation before the first banking panic.","panic-1907"],
 ["E02","Panic of 1907",1907,1913,"Trust failures and a private rescue test market liquidity.","A banking panic reshapes financial oversight."],
 ["E03","The Great War",1914,1919,"War finance and disrupted world trade.","Markets confront a global conflict."],
 ["E04","Roaring Twenties",1920,1928,"Consumer credit and industrial expansion accelerate.","Prosperity draws capital into shares.","great-crash"],
 ["E05","The Great Crash",1929,1933,"Crash, bank failures, and depression.","Preserve capital through systemic collapse."],
 ["E06","New Deal Markets",1934,1939,"Regulation and recovery change market structure.","A new financial order takes shape."],
 ["E07","World War II",1940,1945,"Mobilization redirects industry and capital.","Wartime controls transform investing."],
 ["E08","Postwar Boom",1946,1959,"Mass consumption and corporate growth expand.","A long expansion creates new leaders."],
 ["E09","Go-Go Years",1960,1969,"Conglomerates and speculation dominate.","Growth stocks test valuation discipline."],
 ["E10","Oil Shock",1970,1975,"Inflation, energy scarcity, and recession collide.","Energy prices overturn the postwar playbook.","oil-shock"],
 ["E11","Stagflation",1976,1981,"Inflation persists as policy tightens.","Real returns become the central challenge."],
 ["E12","Bull Market",1982,1989,"Disinflation and financial innovation lift assets.","Leverage expands in a powerful rally."],
 ["E13","Dot-Com Dawn",1990,1999,"Technology and globalization accelerate.","A new economy captures investor attention."],
 ["E14","Dot-Com Bust",2000,2003,"Technology valuations unwind.","Growth expectations meet cash-flow reality."],
 ["E15","Credit Boom",2004,2007,"Housing and structured credit expand.","Low volatility hides accumulating fragility."],
 ["E16","Global Financial Crisis",2008,2012,"A credit collapse threatens the banking system.","Liquidity and solvency become inseparable."],
 ["E17","Long Expansion",2013,2019,"Low rates support a broad recovery.","Technology leadership and passive flows grow."],
 ["E18","Pandemic & Inflation",2020,2026,"Shutdown, stimulus, inflation, and rate shocks.","The modern market faces rapid regime changes."]
];
export const ERAS:EraDefinition[]=data.map(([id,title,startYear,endYear,description,teaser,episodeId],i)=>({id,order:i+1,title,years:`${startYear}–${endYear}`,startYear,endYear,description,teaser,episodeId}));
export const getEra=(id:string)=>ERAS.find(e=>e.id===id);
