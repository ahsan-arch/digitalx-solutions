import fs from "fs";
import path from "path";
import { SendRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const HISTORY_FILE = path.join(DATA_DIR, "outreach-history.json");
const UNSUBSCRIBES_FILE = path.join(DATA_DIR, "unsubscribes.json");

export class OutreachTracker {
  private history: SendRecord[] = [];
  private unsubscribes: Set<string> = new Set();

  constructor() {
    this.ensureDataFiles();
    this.load();
  }

  private ensureDataFiles() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(HISTORY_FILE)) {
      fs.writeFileSync(HISTORY_FILE, JSON.stringify([], null, 2), "utf8");
    }
    if (!fs.existsSync(UNSUBSCRIBES_FILE)) {
      fs.writeFileSync(UNSUBSCRIBES_FILE, JSON.stringify([], null, 2), "utf8");
    }
  }

  private load() {
    try {
      const historyRaw = fs.readFileSync(HISTORY_FILE, "utf8");
      this.history = JSON.parse(historyRaw);
    } catch {
      this.history = [];
    }

    try {
      const unsubRaw = fs.readFileSync(UNSUBSCRIBES_FILE, "utf8");
      const list: string[] = JSON.parse(unsubRaw);
      this.unsubscribes = new Set(list.map((e) => e.toLowerCase().trim()));
    } catch {
      this.unsubscribes = new Set();
    }
  }

  private saveHistory() {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(this.history, null, 2), "utf8");
  }

  public recordSend(record: SendRecord) {
    this.history.push(record);
    this.saveHistory();
  }

  public addUnsubscribe(email: string) {
    const clean = email.toLowerCase().trim();
    this.unsubscribes.add(clean);
    fs.writeFileSync(UNSUBSCRIBES_FILE, JSON.stringify(Array.from(this.unsubscribes), null, 2), "utf8");
  }

  public isUnsubscribed(email: string): boolean {
    return this.unsubscribes.has(email.toLowerCase().trim());
  }

  public isAlreadyContacted(email: string, daysWindow: number = 60): boolean {
    const clean = email.toLowerCase().trim();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysWindow);

    return this.history.some((record) => {
      if (record.email.toLowerCase().trim() !== clean) return false;
      if (record.status !== "sent") return false;

      const sentDate = new Date(record.sentAt);
      return sentDate >= cutoffDate;
    });
  }

  public getTodaySentCount(): number {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    return this.history.filter((record) => {
      if (record.status !== "sent") return false;
      const sentTime = new Date(record.sentAt).getTime();
      return sentTime >= startOfDay;
    }).length;
  }

  public getRemainingDailyQuota(dailyCap: number = 50): number {
    const todaySent = this.getTodaySentCount();
    return Math.max(0, dailyCap - todaySent);
  }

  public getStats(dailyCap: number = 50) {
    const totalSent = this.history.filter((r) => r.status === "sent").length;
    const todaySent = this.getTodaySentCount();
    const remainingQuota = Math.max(0, dailyCap - todaySent);
    const uniqueContacts = new Set(this.history.filter((r) => r.status === "sent").map((r) => r.email)).size;
    const unsubscribesCount = this.unsubscribes.size;

    return {
      totalSent,
      todaySent,
      dailyCap,
      remainingQuota,
      uniqueContacts,
      unsubscribesCount,
    };
  }
}
