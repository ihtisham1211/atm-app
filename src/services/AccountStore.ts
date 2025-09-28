import { Account } from "../types/account";
import { accounts, STORE_KEY } from "../utils/constants";
import EncryptedLocalStorage from "../utils/encryptedLocalStorage";

let store: EncryptedLocalStorage;

export async function initStore() {
  store = await EncryptedLocalStorage.create(STORE_KEY);
  const existing = await readAll();
  if (!existing || existing.length === 0) {
    await writeAll(accounts);
  }
}

export async function readAll(): Promise<Account[]> {
  const v = await store.getItem<Account[]>(STORE_KEY);
  return v ?? [];
}

export async function writeAll(accounts: Account[]) {
  await store.setItem(STORE_KEY, accounts);
}

export async function findByPin(pin: string): Promise<Account | null> {
  const accounts = await readAll();
  return accounts.find((a) => String(a.pin) === String(pin)) ?? null;
}

export async function updateBalance(
  id: string,
  nextBalance: number
): Promise<Account | undefined> {
  const accounts = await readAll();
  const idx = accounts.findIndex((a) => a.id === id);
  if (idx >= 0) {
    accounts[idx].balance = nextBalance;
    await writeAll(accounts);
  }
  return accounts[idx];
}
