export type Role = "proprietario" | "inquilino" | "agenzia" | "tecnico";
export type Route =
  | "home"
  | "immobili"
  | "documenti"
  | "affitto"
  | "utenze"
  | "assistenza"
  | "consulenze"
  | "card"
  | "profilo"
  | "agenzia"
  | "accesso"
  | "design-system";
export type Scenario =
  | "demo"
  | "worst"
  | "empty"
  | "one"
  | "many"
  | "loading"
  | "error"
  | "revoked"
  | "ended";
export interface Property {
  id: string;
  name: string;
  address: string;
  area: number;
  rooms: number;
  image: string;
  rent: number;
  owners: string[];
  tenants: string[];
  status: string;
}
export interface Doc {
  id: string;
  property: string;
  name: string;
  category: string;
  date: string;
  size: string;
  visibility: string;
  status: string;
}
export interface Payment {
  status: "pending" | "uploaded" | "declared" | "verified" | "receipt";
  file?: string;
  amount?: number;
  date?: string;
  source?: string;
  author?: string;
}
export interface Ticket {
  id: string;
  property: string;
  title: string;
  description: string;
  category: string;
  contact: string;
  attachment?: string;
  status: "Ricevuta" | "Assegnata" | "In lavorazione" | "Conclusa";
  technician?: string;
  events: string[];
}
export interface Share {
  doc: string;
  recipient: string;
  duration: string;
  active: boolean;
}
export interface DemoState {
  version: 1;
  role: Role;
  property: string;
  payments: Record<string, Payment>;
  tickets: Ticket[];
  shares: Share[];
  blocked: boolean;
  cardId: string;
  revokedCards: string[];
  physical: string;
  booking: string;
  notificationsRead: boolean;
  reviewedDocuments: string[];
}
export const properties: Property[] = [
  {
    id: "p1",
    name: "Casa Tortona",
    address: "Via Tortona 24, Milano",
    area: 85,
    rooms: 3,
    image: "casa-salone.jpg",
    rent: 950,
    owners: ["Alessandro Rossi", "Giulia Rossi"],
    tenants: ["Sofia Bianchi", "Luca Moretti"],
    status: "Locato",
  },
  {
    id: "p2",
    name: "Casa Brera",
    address: "Via Fiori Chiari 8, Milano",
    area: 62,
    rooms: 2,
    image: "casa-luminosa.jpg",
    rent: 820,
    owners: ["Alessandro Rossi"],
    tenants: ["Giulia Rossi", "Andrea Conti"],
    status: "Locato",
  },
  {
    id: "p3",
    name: "Studio Navigli",
    address: "Ripa di Porta Ticinese 41, Milano",
    area: 48,
    rooms: 2,
    image: "casa-studio.jpg",
    rent: 0,
    owners: ["Alessandro Rossi"],
    tenants: [],
    status: "Non locato",
  },
];
export const documents: Doc[] = [
  {
    id: "d1",
    property: "p1",
    name: "Contratto di locazione",
    category: "Contratti",
    date: "01 set 2026",
    size: "240 KB",
    visibility: "Parti del contratto",
    status: "Controllato",
  },
  {
    id: "d2",
    property: "p1",
    name: "Attestato di prestazione energetica",
    category: "Certificati",
    date: "28 ago 2026",
    size: "180 KB",
    visibility: "Parti del contratto",
    status: "Caricato",
  },
  {
    id: "d3",
    property: "p1",
    name: "Planimetria catastale",
    category: "Immobile",
    date: "25 ago 2026",
    size: "320 KB",
    visibility: "Solo proprietari",
    status: "Da verificare",
  },
  {
    id: "d4",
    property: "p2",
    name: "Contratto di locazione · Brera",
    category: "Contratti",
    date: "01 lug 2026",
    size: "230 KB",
    visibility: "Parti del contratto",
    status: "Controllato",
  },
  {
    id: "d5",
    property: "p2",
    name: "Verbale di consegna",
    category: "Immobile",
    date: "01 lug 2026",
    size: "140 KB",
    visibility: "Parti del contratto",
    status: "Controllato",
  },
];
export function initialState(): DemoState {
  return {
    version: 1,
    role: "proprietario",
    property: "all",
    payments: {
      p1: { status: "pending" },
      p2: {
        status: "verified",
        amount: 820,
        date: "2026-10-01",
        source: "Estratto conto dimostrativo · rif. DEMO-082",
        author: "Alessandro Rossi",
      },
    },
    tickets: [
      {
        id: "EE-1042",
        property: "p1",
        title: "Perdita dal rubinetto in cucina",
        description:
          "Il rubinetto perde alla base quando viene aperto. Foto del punto interessato allegata alla pratica demo.",
        category: "Idraulica",
        contact: "sofia.bianchi@example.com",
        attachment: "rubinetto-demo.jpg",
        status: "In lavorazione",
        technician: "Marco Ferri · Idraulico",
        events: [
          "Richiesta ricevuta · 4 ott",
          "Assegnata a Marco Ferri · 5 ott",
          "Incarico accettato · 5 ott",
        ],
      },
    ],
    shares: [],
    blocked: false,
    cardId: "EE · 2048",
    revokedCards: [],
    physical: "Non richiesta",
    booking: "",
    notificationsRead: false,
    reviewedDocuments: [],
  };
}
export function readState(): DemoState {
  try {
    const s = JSON.parse(localStorage.getItem("eecard-demo-v1") || "null");
    if (
      s?.version === 1 &&
      ["proprietario", "inquilino", "agenzia", "tecnico"].includes(s.role) &&
      Array.isArray(s.tickets) &&
      s.payments &&
      Array.isArray(s.shares) &&
      Array.isArray(s.revokedCards)
    )
      return {
        ...s,
        reviewedDocuments: Array.isArray(s.reviewedDocuments)
          ? s.reviewedDocuments
          : [],
      };
  } catch {
    /* A corrupt demo is reset, never fatal. */
  }
  return initialState();
}
export function fixtureProperties(scenario: Scenario): Property[] {
  if (scenario === "empty") return [];
  if (scenario === "one") return properties.slice(0, 1);
  if (scenario === "worst")
    return properties.map((p, i) => ({
      ...p,
      name: [
        "Residenza Aleksandra Wiśniewska-Kowalczyk",
        "Casa di 王秀英",
        "Studio di Jo",
      ][i],
      address:
        i === 0
          ? "Via dei Cavalieri di Vittorio Veneto 128, scala B, interno 24, Sesto San Giovanni"
          : p.address,
      owners:
        i === 0
          ? ["Aleksandra Wiśniewska-Kowalczyk", "Đặng Thị Ngọc Hân"]
          : p.owners,
      rent: i === 0 ? 12345.67 : p.rent,
    }));
  return properties;
}
export function fixtureDocuments(scenario: Scenario): Doc[] {
  if (scenario === "empty") return [];
  if (scenario === "one") return documents.slice(0, 1);
  if (scenario === "many")
    return Array.from({ length: 1284 }, (_, i) => ({
      ...documents[i % documents.length],
      id: `many-${i}`,
      property: "p1",
      name: `Verbale di manutenzione · unità ${i + 1}`,
    }));
  if (scenario === "worst")
    return documents.map((d, i) => ({
      ...d,
      name:
        i === 0
          ? "Contratto_di_locazione_Aleksandra_Wiśniewska-Kowalczyk_versione_12_firmata_da_tutte_le_parti.pdf"
          : i === 1
            ? "Certificazione di 王秀英"
            : d.name,
      size: i === 1 ? "Dimensione non disponibile" : d.size,
    }));
  return documents;
}
export const money = (value: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
export const paymentLabel: Record<Payment["status"], string> = {
  pending: "In scadenza",
  uploaded: "Documento caricato",
  declared: "Pagamento dichiarato",
  verified: "Incasso verificato",
  receipt: "Quietanza demo rilasciata",
};
export const roleLabel: Record<Role, string> = {
  proprietario: "Proprietario",
  inquilino: "Inquilino",
  agenzia: "Agenzia",
  tecnico: "Tecnico",
};
export const scenarioLabels: Record<Scenario, string> = {
  demo: "Dati demo",
  worst: "Caso limite",
  empty: "Vuoto",
  one: "Un elemento",
  many: "1.284 documenti",
  loading: "Caricamento",
  error: "Errore",
  revoked: "Accesso revocato",
  ended: "Fine contratto",
};
