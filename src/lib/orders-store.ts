import { useEffect, useState } from "react";
import type { CartItem } from "./cart-context";

export type OrderStatus =
  | "Placed"
  | "Preparing"
  | "Ready"
  | "Out for delivery"
  | "Delivered";

export interface Order {
  id: string;
  customer: string;
  email?: string;
  room: string;
  deliveryTime: string; // "ASAP" or HH:MM
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
}

const KEY = "sam_orders";
const EVT = "sam_orders_changed";

function read(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function write(list: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(EVT));
}

export const STATUS_FLOW: OrderStatus[] = [
  "Placed",
  "Preparing",
  "Ready",
  "Out for delivery",
  "Delivered",
];

export function placeOrder(o: Omit<Order, "id" | "status" | "createdAt">): Order {
  const order: Order = {
    ...o,
    id: `SAM-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "Placed",
    createdAt: Date.now(),
  };
  write([order, ...read()]);
  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  write(read().map((o) => (o.id === id ? { ...o, status } : o)));
}

export function advanceOrder(id: string) {
  const list = read();
  const o = list.find((x) => x.id === id);
  if (!o) return;
  const i = STATUS_FLOW.indexOf(o.status);
  const next = STATUS_FLOW[Math.min(i + 1, STATUS_FLOW.length - 1)];
  updateOrderStatus(id, next);
}

export function useOrders(): Order[] {
  const [list, setList] = useState<Order[]>(() => read());
  useEffect(() => {
    const refresh = () => setList(read());
    window.addEventListener("storage", refresh);
    window.addEventListener(EVT, refresh);
    const t = window.setInterval(refresh, 2000);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVT, refresh);
      window.clearInterval(t);
    };
  }, []);
  return list;
}