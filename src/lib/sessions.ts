export interface Session {
  id: string;
  day: string;
  month: string;
  weekday: string;
  title: string;
  time: string;
  isoDate: string;
  price: string;
  spots: number;
  total: number;
}

export const sessions: Session[] = [
  {
    id: "malbec-reservas",
    day: "28",
    month: "Jun",
    weekday: "Sábado",
    title: "Cata Malbec & Reservas",
    time: "20:00 hs",
    isoDate: "2026-06-28",
    price: "$100.000",
    spots: 12,
    total: 20,
  },
  {
    id: "tintos-de-altura",
    day: "11",
    month: "Jul",
    weekday: "Viernes",
    title: "Tintos de Altura",
    time: "20:30 hs",
    isoDate: "2026-07-11",
    price: "$100.000",
    spots: 5,
    total: 20,
  },
  {
    id: "bordeaux-maridajes",
    day: "26",
    month: "Jul",
    weekday: "Sábado",
    title: "Bordeaux & Maridajes",
    time: "20:00 hs",
    isoDate: "2026-07-26",
    price: "$100.000",
    spots: 18,
    total: 20,
  },
  {
    id: "vinos-patagonicos",
    day: "08",
    month: "Ago",
    weekday: "Viernes",
    title: "Vinos Patagónicos",
    time: "20:30 hs",
    isoDate: "2026-08-08",
    price: "$100.000",
    spots: 15,
    total: 20,
  },
];

/** Fired when a user clicks "Reservar" on a session card. detail = session id */
export const SELECT_SESSION_EVENT = "select-session";
