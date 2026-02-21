import productSpringBouquet from "@/assets/product-spring-bouquet.jpg";
import productMoederdag from "@/assets/product-moederdag.jpg";
import productTulpen from "@/assets/product-tulpen.jpg";
import productPastel from "@/assets/product-pastel.jpg";
import productZonnebloem from "@/assets/product-zonnebloem.jpg";
import productRoos from "@/assets/product-roos.jpg";
import productOrchidee from "@/assets/product-orchidee.jpg";
import productZomermix from "@/assets/product-zomermix.jpg";

export interface ActiveProduct {
  id: number;
  name: string;
  image: string;
  line: string;
  lineType: "hand" | "band";
  startTime: string;
  expectedEndTime: string;
  people: number;
  produced: number;
  target: number;
  minutesActive: number;
  piecesPerHour: number;
  status: "op-schema" | "sneller" | "hoog-tempo" | "onder-check";
  checkStartTime?: string;
  checkPeople?: number;
  checkEndTime?: string;
}

export interface CompletedProduct {
  id: number;
  name: string;
  quantity: number;
  plannedMinutes: number;
  actualMinutes: number;
  line: string;
  completedAt: string;
}

export interface ProductionLine {
  id: number;
  name: string;
  type: "hand" | "band";
  people: number;
  produced: number;
  hoursActive: number;
  piecesPerHour: number;
  badge?: string;
}

export const activeProducts: ActiveProduct[] = [
  {
    id: 1,
    name: "Luxe Voorjaarsboeket",
    image: productSpringBouquet,
    line: "Handlijn 3",
    lineType: "hand",
    startTime: "07:00",
    expectedEndTime: "11:30",
    people: 6,
    produced: 287,
    target: 400,
    minutesActive: 195,
    piecesPerHour: 88,
    status: "op-schema",
  },
  {
    id: 2,
    name: "Moederdag Arrangement",
    image: productMoederdag,
    line: "Bandlijn 2",
    lineType: "band",
    startTime: "07:15",
    expectedEndTime: "12:00",
    people: 8,
    produced: 356,
    target: 400,
    minutesActive: 180,
    piecesPerHour: 119,
    status: "sneller",
  },
  {
    id: 3,
    name: "Mono Plus Tulpen",
    image: productTulpen,
    line: "Bandlijn 4",
    lineType: "band",
    startTime: "06:30",
    expectedEndTime: "10:30",
    people: 5,
    produced: 412,
    target: 500,
    minutesActive: 225,
    piecesPerHour: 110,
    status: "hoog-tempo",
  },
  {
    id: 4,
    name: "Seizoens Mix Pastel",
    image: productPastel,
    line: "Handlijn 1",
    lineType: "hand",
    startTime: "08:00",
    expectedEndTime: "13:00",
    people: 7,
    produced: 198,
    target: 350,
    minutesActive: 135,
    piecesPerHour: 88,
    status: "sneller",
  },
];

export const completedProducts: CompletedProduct[] = [
  { id: 1, name: "Lenteweelde Boeket", quantity: 350, plannedMinutes: 240, actualMinutes: 210, line: "Bandlijn 1", completedAt: "08:45" },
  { id: 2, name: "Premium Roos Arrangement", quantity: 200, plannedMinutes: 180, actualMinutes: 180, line: "Handlijn 2", completedAt: "09:30" },
  { id: 3, name: "Zomermix Gerbera", quantity: 500, plannedMinutes: 300, actualMinutes: 265, line: "Bandlijn 3", completedAt: "10:15" },
  { id: 4, name: "Orchidee Deluxe", quantity: 150, plannedMinutes: 120, actualMinutes: 105, line: "Handlijn 5", completedAt: "11:00" },
  { id: 5, name: "Zonnebloem Vreugde", quantity: 275, plannedMinutes: 200, actualMinutes: 195, line: "Handlijn 4", completedAt: "12:20" },
];

export const productionLines: ProductionLine[] = [
  { id: 1, name: "Handlijn 1", type: "hand", people: 7, produced: 548, hoursActive: 5.2, piecesPerHour: 105, badge: "🏆 Meeste output" },
  { id: 2, name: "Handlijn 2", type: "hand", people: 5, produced: 420, hoursActive: 4.8, piecesPerHour: 88 },
  { id: 3, name: "Handlijn 3", type: "hand", people: 6, produced: 487, hoursActive: 5.0, piecesPerHour: 97, badge: "🚀 Sterkste groei" },
  { id: 4, name: "Handlijn 4", type: "hand", people: 4, produced: 375, hoursActive: 4.5, piecesPerHour: 83 },
  { id: 5, name: "Handlijn 5", type: "hand", people: 4, produced: 295, hoursActive: 3.8, piecesPerHour: 78 },
  { id: 6, name: "Handlijn 6", type: "hand", people: 6, produced: 410, hoursActive: 4.6, piecesPerHour: 89 },
  { id: 7, name: "Handlijn 7", type: "hand", people: 5, produced: 365, hoursActive: 4.2, piecesPerHour: 87 },
  { id: 8, name: "Bandlijn 1", type: "band", people: 8, produced: 720, hoursActive: 5.5, piecesPerHour: 131, badge: "⚡ Beste tempo" },
  { id: 9, name: "Bandlijn 2", type: "band", people: 8, produced: 656, hoursActive: 5.2, piecesPerHour: 126 },
  { id: 10, name: "Bandlijn 3", type: "band", people: 7, produced: 600, hoursActive: 5.0, piecesPerHour: 120 },
  { id: 11, name: "Bandlijn 4", type: "band", people: 5, produced: 512, hoursActive: 4.8, piecesPerHour: 107 },
  { id: 12, name: "Bandlijn 5", type: "band", people: 6, produced: 480, hoursActive: 4.5, piecesPerHour: 107 },
];

export const aiMessages = [
  "💪 Bandlijn 3 heeft zojuist het tempo met 8% verhoogd — sterk leiderschap!",
  "🔥 Handlijn 2 nadert de top positie — push dit uur!",
  "🏆 Nieuw snelheidsrecord vanmorgen!",
  "⚡ Geweldig momentum — houd dit tempo vast!",
  "🚀 Bandlijn 1 presteert 15% boven planning — fantastisch!",
  "💐 Al meer dan 6.000 stuks vandaag — topdag!",
];

export const dashboardStats = {
  totalPeople: 85,
  totalProduced: 6868,
  avgPiecesPerHour: 545,
};
