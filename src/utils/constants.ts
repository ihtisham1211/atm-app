import { Account, CardId } from "../types/account";

export const LOCAL_SALT = "local-salt";
export const STORE_KEY = "accounts";

export const accounts: Account[] = [
  {
    id: "peter",
    name: "Peter Parker",
    pin: 1234,
    balance: 1000.0,
    card: "plus",
  },
];

export const enterPin = ["Enter PIN"];
export const leftPanel = ["Exit", "Balance", "Re-Enter PIN"];
export const rightPanel = ["Withdraw", "Deposit"];

export const stepType: Record<number, string> = {
  0: "Pin",
  3: "Re-Pin",
  6: "Withdraw",
  7: "Deposit",
};

export const FRAMES: { id: CardId; label: string; x: number }[] = [
  { id: "star", label: "STAR", x: 0 },
  { id: "pulse", label: "Pulse", x: 40 },
  { id: "maestro", label: "Maestro", x: 84 },
  { id: "mastercard", label: "Mastercard", x: 128 },
  { id: "plus", label: "Plus", x: 172 },
  { id: "visa", label: "VISA", x: 212 },
];
