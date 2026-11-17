/* ------------------------------------------------------------------
   All site copy and data lives here so it can be edited in one place.
   Anything marked PLACEHOLDER must be replaced with real details.
   ------------------------------------------------------------------ */

const m = (name: string) => `/media/${name}.jpg`;

export const company = {
  name: "Godsway Company Limited",
  short: "Godsway",
  founded: 2004,
  city: "Accra, Ghana",
  region: "Greater Accra Region",
  phone: "+233 XX XXX XXXX", // PLACEHOLDER
  emergencyPhone: "+233 XX XXX XXXX", // PLACEHOLDER
  // WhatsApp number in international format, digits only (e.g. 233241234567)
  whatsapp: "233000000000", // PLACEHOLDER
  email: "info@godswaycompany.com",
  projectsEmail: "projects@godswaycompany.com",
  hours: [
    ["Mon – Fri", "08:00 – 18:00"],
    ["Saturday", "08:00 – 16:00"],
    ["Sunday", "Emergency only"],
  ] as const,
  socials: [
    { label: "LinkedIn", href: "#" }, // PLACEHOLDER
    { label: "Facebook", href: "#" }, // PLACEHOLDER
  ],
};

export const nav = [
  { label: "Fleet", href: "/fleet" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: 20, suffix: "+", label: "Years in the field" },
  { value: 100, suffix: "+", label: "Projects delivered" },
  { value: 18, suffix: "", label: "Machines in the fleet" },
  { value: 24, suffix: "/7", label: "Technical support" },
];

export const services = [
  {
    id: "rent",
    index: "01",
    verb: "Rent",
    title: "Machine Rentals",
    line: "Excavators, rollers, pumps, rigs and tippers, on site when you need them, maintained and backed 24/7.",
    points: ["Short & long-term hire", "Maintenance included", "24/7 support", "Delivery to site"],
    image: m("night-excavators"),
  },
  {
    id: "supply",
    index: "02",
    verb: "Supply",
    title: "Equipment Sales",
    line: "New and certified used machinery from the manufacturers we've worked with for three decades.",
    points: ["New & certified used", "Financing options", "Warranty & parts", "Operator training"],
    image: m("machines-row"),
  },
  {
    id: "build",
    index: "03",
    verb: "Build",
    title: "Construction",
    line: "Roads, rail, ports and high-rise. Infrastructure that carries Ghana's economy.",
    points: ["Roads & rehabilitation", "Railway infrastructure", "Ports & marine works", "Project management"],
    image: m("road-equipment"),
  },
  {
    id: "mine",
    index: "04",
    verb: "Mine",
    title: "Mining Support",
    line: "Drilling, breaking and hauling for the gold mines that made this the Gold Coast.",
    points: ["Equipment supply", "Drill & blast support", "Safety compliance", "Technical consultation"],
    image: m("mining-aerial"),
  },
];

export type Availability = "Available" | "On hire";

export interface Machine {
  slug: string;
  name: string;
  brand: string;
  category: string;
  spec: string;
  rate: number; // USD per day, "from"
  availability: Availability;
  image: string;
}

export const fleetCategories = [
  "Excavators",
  "Rollers",
  "Concrete Pumps",
  "Drill Rigs",
  "Tippers",
  "Breakers",
] as const;

const catImage: Record<(typeof fleetCategories)[number], string> = {
  Excavators: m("excavator-rock"),
  Rollers: m("road-equipment"),
  "Concrete Pumps": m("stockpile-conveyor"),
  "Drill Rigs": m("quarry-top"),
  Tippers: m("haul-truck"),
  Breakers: m("two-excavators"),
};

const mk = (
  category: (typeof fleetCategories)[number],
  brand: string,
  model: string,
  spec: string,
  rate: number,
  availability: Availability,
): Machine => ({
  slug: `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name: model,
  brand,
  category,
  spec,
  rate,
  availability,
  image: catImage[category],
});

export const fleet: Machine[] = [
  mk("Excavators", "CAT", "320D", "20-ton class · 1.2 m³ bucket", 800, "Available"),
  mk("Excavators", "Komatsu", "PC210", "21-ton class · versatile", 850, "Available"),
  mk("Excavators", "Volvo", "EC240B", "24-ton class · fuel efficient", 900, "On hire"),
  mk("Rollers", "BOMAG", "BW219", "Single drum · 9-ton", 400, "Available"),
  mk("Rollers", "Dynapac", "CA302", "Double drum · smooth", 450, "Available"),
  mk("Rollers", "CAT", "CS533E", "Vibratory · 7-ton", 500, "Available"),
  mk("Concrete Pumps", "Putzmeister", "BSF 36", "36 m boom · truck-mounted", 1200, "Available"),
  mk("Concrete Pumps", "Schwing", "S 24 X", "24 m reach · flexible", 1000, "Available"),
  mk("Concrete Pumps", "CIFA", "K31 XRZ", "31 m boom · precision", 1100, "On hire"),
  mk("Drill Rigs", "Atlas Copco", "FlexiROC T30", "Surface rig · versatile", 2000, "Available"),
  mk("Drill Rigs", "Sandvik", "DX780", "Down-the-hole", 1800, "Available"),
  mk("Drill Rigs", "Epiroc", "SmartROC T35", "Surface top hammer", 2200, "Available"),
  mk("Tippers", "MAN", "TGS 35t", "6×4 · robust", 300, "Available"),
  mk("Tippers", "Volvo", "FMX 40t", "8×4 · heavy duty", 350, "Available"),
  mk("Tippers", "Mercedes", "Arocs 32t", "6×4 · reliable", 320, "Available"),
  mk("Breakers", "Atlas Copco", "HB 3000", "Hydraulic · 3,000 kg", 600, "Available"),
  mk("Breakers", "Sandvik", "BR 3288", "Heavy duty", 650, "Available"),
  mk("Breakers", "Furukawa", "F35", "High impact energy", 580, "On hire"),
];

export const included = [
  ["Maintenance", "Regular servicing is included in every rental."],
  ["Delivery", "We deliver to your site and collect when you're done."],
  ["Support", "Round-the-clock technical support and assistance."],
  ["Flexibility", "Rental terms that fit your project, not ours."],
] as const;

export interface Project {
  slug: string;
  title: string;
  partner: string;
  location: string;
  years: string;
  sector: "Rail" | "Roads" | "Mining" | "Marine" | "Urban" | "Quarry";
  summary: string;
  scope: string[];
  image: string;
}

export const projects: Project[] = [
  {
    slug: "railway",
    title: "Ghana Railway Network",
    partner: "Afcons Infrastructure",
    location: "National network",
    years: "2022 – 2024",
    sector: "Rail",
    summary: "Heavy machinery and technical support for a major expansion of Ghana's rail corridor.",
    scope: ["Track-laying equipment", "Heavy machinery rental", "Technical consultation", "Project management"],
    image: m("bucket-wheel"),
  },
  {
    slug: "takoradi-tarkwa",
    title: "Takoradi – Tarkwa Road",
    partner: "Gabriel Couto Construction",
    location: "Western Region",
    years: "2021 – 2023",
    sector: "Roads",
    summary: "The road that links the port of Takoradi to the gold belt around Tarkwa.",
    scope: ["Road construction fleet", "Roller compactors", "Excavators & dozers", "Quality assurance"],
    image: m("road-equipment"),
  },
  {
    slug: "newmont-ahafo",
    title: "Newmont Ahafo",
    partner: "Newmont Corporation",
    location: "Ahafo Region",
    years: "2020 – now",
    sector: "Mining",
    summary: "Ongoing equipment supply and support for one of Ghana's largest gold mines.",
    scope: ["Mining equipment supply", "Maintenance", "Technical training", "Safety compliance"],
    image: m("mining-aerial"),
  },
  {
    slug: "tema-port",
    title: "Tema Port Expansion",
    partner: "Eiffage Construction",
    location: "Tema, Greater Accra",
    years: "2019 – 2022",
    sector: "Marine",
    summary: "Lifting, pumping and logistics support for the expansion of Ghana's busiest port.",
    scope: ["Marine construction equipment", "Heavy lifting", "Concrete pumps", "Logistics"],
    image: m("port-cloudy"),
  },
  {
    slug: "urban",
    title: "Accra & Kumasi High-Rise",
    partner: "Multiple developers",
    location: "Accra & Kumasi",
    years: "2018 – 2024",
    sector: "Urban",
    summary: "Concrete pumps, cranes and equipment for a new generation of city towers.",
    scope: ["Tower cranes", "Concrete pumps", "Construction equipment", "Consultation"],
    image: m("stockpile-conveyor"),
  },
  {
    slug: "quarry",
    title: "Quarry & Demolition",
    partner: "Mining companies",
    location: "Sites across Ghana",
    years: "2017 – now",
    sector: "Quarry",
    summary: "Drilling, breaking and site preparation for quarries and controlled demolition.",
    scope: ["Drilling", "Rock breakers", "Demolition", "Site preparation"],
    image: m("two-excavators"),
  },
];

export const partners = [
  "Newmont",
  "Afcons",
  "Gabriel Couto",
  "Eiffage",
];

export const timeline = [
  { year: "1993", title: "The apprenticeship", text: "Our CEO starts as a technician at Atlas Copco, learning drilling and mining equipment from the inside out." },
  { year: "2004", title: "Godsway is founded", text: "The company is registered in Accra to serve Ghana's growing construction and mining sectors." },
  { year: "2019", title: "Full launch", text: "After an international sales career that ran through Epiroc, our CEO brings that experience home full-time." },
  { year: "Today", title: "Trusted partner", text: "A fleet, a team and a track record across rail, roads, ports and Ghana's biggest gold mines." },
];

export const values = [
  ["Excellence", "The standard on every project, large or small."],
  ["Reliability", "Machines that start, people who show up, prices that hold."],
  ["Innovation", "Modern equipment and better ways of working, brought home."],
] as const;

/* Ghana gold-sector context (from the previous Mining Insights page) */
export const goldFacts = [
  { value: "3.2M oz", label: "Gold produced, 2023" },
  { value: "$6.8B", label: "Export revenue" },
  { value: "15.2%", label: "Mining share of GDP" },
  { value: "200K+", label: "People employed" },
];

export const producers = [
  { company: "Newmont", mine: "Ahafo & Akyem", output: "1.2M oz/yr" },
  { company: "Gold Fields", mine: "Tarkwa & Damang", output: "900K oz/yr" },
  { company: "AngloGold Ashanti", mine: "Obuasi", output: "400K oz/yr" },
  { company: "Asanko Gold", mine: "Asanko", output: "200K oz/yr" },
];

export const serviceOptions = [
  "Machine rental",
  "Equipment purchase",
  "Construction",
  "Mining support",
  "Technical consultation",
  "Something else",
];

export const media = {
  heroFallback: m("night-excavators"),
  rockWall: m("rock-wall"),
  rockStrata: m("rock-strata"),
  haulTruck: m("haul-truck"),
  mineDusk: m("mine-dusk"),
  openPit: m("open-pit"),
  excavatorBucket: m("heavy-rock"),
  aerialLoad: m("dirt-truck"),
  quarryTop: m("quarry-top"),
  portDusk: m("port-dusk"),
  machinesRow: m("machines-row"),
  catExcavator: m("cat-excavator"),
};

/** wa.me link that opens a chat with the message already typed. */
export const whatsappLink = (text = "Hello Godsway, I'd like to ask about your equipment and services.") =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
