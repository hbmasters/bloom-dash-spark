// ── Mock data for Project Dashboards ──

export interface KPICard {
  id: string;
  label: string;
  value: string;
  unit?: string;
  change: string;
  trend: "up" | "down" | "neutral";
  target?: string;
  sparkline: number[];
}

export interface ProjectHighlight {
  id: string;
  title: string;
  severity: "info" | "warning" | "success" | "critical";
  description: string;
  timestamp: string;
}

// ── INKOOP ──
export const inkoopKPIs: KPICard[] = [
  { id: "ink1", label: "Inkoopvolume", value: "€284k", change: "+12%", trend: "up", target: "€260k", sparkline: [210, 225, 240, 248, 260, 272, 284] },
  { id: "ink2", label: "Gemiddelde Steelprijs", value: "€0.38", change: "-4%", trend: "up", target: "€0.40", sparkline: [0.44, 0.43, 0.42, 0.41, 0.40, 0.39, 0.38] },
  { id: "ink3", label: "Leverbetrouwbaarheid", value: "96.2%", change: "+1.8%", trend: "up", target: "95%", sparkline: [91, 92, 93, 94, 95, 95.5, 96.2] },
  { id: "ink4", label: "Open Bestellingen", value: "47", change: "+3", trend: "neutral", sparkline: [38, 42, 40, 45, 43, 44, 47] },
  { id: "ink5", label: "Derving Inkoop", value: "1.8%", change: "-0.6%", trend: "up", target: "< 2.5%", sparkline: [3.0, 2.8, 2.5, 2.3, 2.1, 1.9, 1.8] },
  { id: "ink6", label: "Leveranciers Actief", value: "23", change: "+2", trend: "up", sparkline: [18, 19, 20, 20, 21, 22, 23] },
];

export const inkoopHighlights: ProjectHighlight[] = [
  { id: "ih1", title: "Rozen Ecuador: prijs +18% door seizoenspiek", severity: "warning", description: "Importprijzen stijgen, alternatieve leverancier contacteren.", timestamp: "2 uur geleden" },
  { id: "ih2", title: "Nieuw contract Chrysanten-leverancier getekend", severity: "success", description: "Jaarcontract met 5% volumekorting gerealiseerd.", timestamp: "Vandaag 09:15" },
  { id: "ih3", title: "Kenya farm: volgende week extra partij lelies beschikbaar", severity: "info", description: "Overaanbod verwacht, kans voor gunstige inkoopprijzen.", timestamp: "Gisteren" },
];

// ── VERKOOP (incl. transport) ──
export const verkoopKPIs: KPICard[] = [
  { id: "vk1", label: "Weekomzet", value: "€412k", change: "+8.5%", trend: "up", target: "€380k", sparkline: [340, 355, 368, 380, 392, 400, 412] },
  { id: "vk2", label: "Ordervulling", value: "98.1%", change: "+0.4%", trend: "up", target: "97%", sparkline: [96.5, 96.8, 97.0, 97.4, 97.6, 97.9, 98.1] },
  { id: "vk3", label: "Gemiddelde Orderwrde", value: "€186", change: "+€12", trend: "up", sparkline: [162, 168, 172, 175, 178, 182, 186] },
  { id: "vk4", label: "Retourenpercentage", value: "1.2%", change: "-0.3%", trend: "up", target: "< 2%", sparkline: [2.0, 1.8, 1.7, 1.5, 1.4, 1.3, 1.2] },
  { id: "vk5", label: "Transport On-Time", value: "94.7%", change: "+2.1%", trend: "up", target: "93%", sparkline: [89, 90, 91, 92, 93, 94, 94.7] },
  { id: "vk6", label: "Klanten Actief", value: "318", change: "+14", trend: "up", sparkline: [290, 295, 300, 305, 308, 312, 318] },
];

export const verkoopHighlights: ProjectHighlight[] = [
  { id: "vh1", title: "Albert Heijn: Moederdag bestelling +40% vs vorig jaar", severity: "success", description: "Extra productie ingepland voor week 19.", timestamp: "Vandaag 08:00" },
  { id: "vh2", title: "Transport vertraging A2: 3 ritten verschoven", severity: "warning", description: "Chauffeurs geïnformeerd, klanten proactief op de hoogte gebracht.", timestamp: "1 uur geleden" },
  { id: "vh3", title: "Nieuwe klant: JUMBO regio Zuid onboarded", severity: "success", description: "Eerste proeflevering volgende week gepland.", timestamp: "Gisteren" },
];

// ── PRODUCTIE ──
export const productieKPIs: KPICard[] = [
  { id: "pr1", label: "Productie Efficiency", value: "94.2%", change: "+1.8%", trend: "up", target: "95%", sparkline: [88, 90, 91, 92, 93, 93.5, 94.2] },
  { id: "pr2", label: "Boeketten/Uur", value: "842", change: "+28", trend: "up", target: "850", sparkline: [780, 795, 810, 820, 830, 838, 842] },
  { id: "pr3", label: "Arbeid Per Steel", value: "€0.42", change: "-€0.03", trend: "up", target: "€0.40", sparkline: [0.48, 0.46, 0.45, 0.44, 0.43, 0.42, 0.42] },
  { id: "pr4", label: "Uitval Productie", value: "2.1%", change: "-0.4%", trend: "up", target: "< 2.5%", sparkline: [3.2, 2.9, 2.7, 2.5, 2.3, 2.2, 2.1] },
  { id: "pr5", label: "Lijnen Actief", value: "6/8", change: "0", trend: "neutral", sparkline: [5, 6, 6, 7, 6, 6, 6] },
  { id: "pr6", label: "Kwaliteitsscore", value: "97.8%", change: "+0.5%", trend: "up", target: "96%", sparkline: [96.0, 96.3, 96.8, 97.0, 97.2, 97.5, 97.8] },
];

export const productieHighlights: ProjectHighlight[] = [
  { id: "ph1", title: "Lijn 3 stilstand: 45 min door technisch probleem", severity: "critical", description: "Bundelmachine gerepareerd, productie hervat.", timestamp: "30 min geleden" },
  { id: "ph2", title: "Record: 920 boeketten/uur op Lijn 1", severity: "success", description: "Team Ingrida heeft persoonlijk record verbroken.", timestamp: "Vandaag 11:30" },
  { id: "ph3", title: "Moederdag planning: extra shift ingepland", severity: "info", description: "Zaterdag 08:00-16:00 met 12 extra medewerkers.", timestamp: "Gisteren" },
];

// ── DIRECTIE ──
export const directieKPIs: KPICard[] = [
  { id: "dr1", label: "Totale Weekomzet", value: "€412k", change: "+8.5%", trend: "up", target: "€380k", sparkline: [340, 355, 368, 380, 392, 400, 412] },
  { id: "dr2", label: "Brutomarge", value: "34.2%", change: "+1.1%", trend: "up", target: "33%", sparkline: [31.5, 32.0, 32.5, 33.0, 33.4, 33.8, 34.2] },
  { id: "dr3", label: "Personeelsbezetting", value: "87.5%", change: "+0.2%", trend: "neutral", target: "85%", sparkline: [85, 86, 86, 87, 87, 87, 87.5] },
  { id: "dr4", label: "Klachtenindex", value: "0.8%", change: "-0.2%", trend: "up", target: "< 1%", sparkline: [1.5, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8] },
  { id: "dr5", label: "Duurzaamheidsscore", value: "72", change: "+4", trend: "up", target: "75", sparkline: [58, 60, 63, 65, 68, 70, 72] },
  { id: "dr6", label: "HBM Kenya Score", value: "91.0%", change: "+2.0%", trend: "up", target: "90%", sparkline: [84, 86, 87, 88, 89, 90, 91] },
];

export const directieHighlights: ProjectHighlight[] = [
  { id: "dh1", title: "Q1 resultaat boven verwachting: +6% vs budget", severity: "success", description: "Sterke vraag en efficiencyverbeteringen als drivers.", timestamp: "Vandaag" },
  { id: "dh2", title: "Personeelstekort productie: 3 vacatures open", severity: "warning", description: "Uitzendbureau ingeschakeld, sollicitaties in behandeling.", timestamp: "Deze week" },
  { id: "dh3", title: "Duurzaamheidscertificering MPS-A+ behaald", severity: "success", description: "Alle criteria ruim gehaald, geldig tot 2027.", timestamp: "Gisteren" },
  { id: "dh4", title: "Concurrentieanalyse: marktaandeel stabiel", severity: "info", description: "Geen significante verschuivingen in de sector.", timestamp: "Deze week" },
];
