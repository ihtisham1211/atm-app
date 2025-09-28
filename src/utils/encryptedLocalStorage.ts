import { LOCAL_SALT } from "./constants"

export default class EncryptedLocalStorage {
  private prefix = 'enc:'
  private key: CryptoKey | null = null
  private salt?: Uint8Array 

  private constructor() {}

  static async create(passphrase: string) {
    const inst = new EncryptedLocalStorage()
    await inst.init(passphrase)
    return inst
  }

  private async deriveKey(passphrase: string, salt: BufferSource) {
    const enc = new TextEncoder();
    const passKey = await crypto.subtle.importKey(
      "raw",
      enc.encode(passphrase),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
      passKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  private toBase64(buf: ArrayBuffer | ArrayBufferView) {
    const u8 =
      buf instanceof ArrayBuffer
        ? new Uint8Array(buf)
        : new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    let s = "";
    for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
    return btoa(s);
  }

  private fromBase64(s: string) {
    const bin = atob(s);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return arr.buffer as ArrayBuffer;
  }

  isInitialized() {
    return this.key !== null
  }

  async init(passphrase: string) {
    const enc = new TextEncoder();
    const salt = enc.encode(LOCAL_SALT);
    this.salt = salt;
    this.key = await this.deriveKey(passphrase, salt as BufferSource);
  }

  getSaltBase64(): string | undefined {
    if (!this.salt) return undefined
    return this.toBase64(this.salt)
  }

  async setItem<T = unknown>(key: string, value: T) {
    if (!this.key) throw new Error("not initialized");
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const plain = enc.encode(JSON.stringify(value));
    const cipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      this.key,
      plain
    );
    const payload = JSON.stringify({
      iv: this.toBase64(iv),
      data: this.toBase64(cipher),
    });
    localStorage.setItem(this.prefix + key, payload);
  }

  async getItem<T = unknown>(key: string): Promise<T | null> {
    if (!this.key) throw new Error("not initialized");
    const raw = localStorage.getItem(this.prefix + key);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      const iv = new Uint8Array(this.fromBase64(parsed.iv));
      const data = this.fromBase64(parsed.data);
      const plain = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        this.key,
        data
      );
      const dec = new TextDecoder().decode(plain);
      return JSON.parse(dec) as T;
    } catch (err) {
      console.error("decrypt failed", err);
      return null;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(this.prefix + key);
  }

  clear() {
    const toDelete: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) as string;
      if (k && k.startsWith(this.prefix)) toDelete.push(k);
    }
    toDelete.forEach((k) => localStorage.removeItem(k));
  }
}
