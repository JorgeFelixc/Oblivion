import { BaseRecord, Database } from "../DatabaseFactory";

class WebDatabase<T extends BaseRecord> implements Database<T> {
  public dbName: string = "";
  private defaultStore = "default";

  private db: Record<string, T> = {};
  private objectStore: IDBObjectStore | undefined;

  constructor(dbName: string) {
    this.dbName = dbName;
    const localdb = localStorage.getItem(this.dbName);
    if (localdb) {
      this.db = JSON.parse(localdb) as Record<string, T>;
    } else {
      localStorage.setItem(this.dbName, "{}");
    }
  }

  getAll(): Record<string, T> {
    return this.db;
  }

  saveDatabase() {
    localStorage.setItem(this.dbName, JSON.stringify(this.db));
  }
  set(newValue: T): void {
    this.objectStore?.add(newValue, newValue.id);
    this.saveDatabase();
  }
  get(id: string): T {
    return this.db[id];
  }
}

export default WebDatabase;
