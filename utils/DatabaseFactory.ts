import WebDatabase from "./WebDatabase";

export interface BaseRecord {
  id: string;
}

export interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T;
  getAll(): Record<string, T>;
}

type TypeDatabases = "WebDatabase" | "LocalStorage";

function createDatabase<T extends BaseRecord>(
  typeDatabase: TypeDatabases,
  dbName: string = "defaultDB"
) {
  switch (typeDatabase) {
    case "LocalStorage":
      return new WebDatabase(dbName);
    case "WebDatabase":
      return new WebDatabase(dbName);
    default:
      return new WebDatabase(dbName);
  }
}

export default createDatabase;

interface Pokemon {
  id: "0";
  name: "Pikachu";
  attack: 230;
}
const newDb = createDatabase<Pokemon>("WebDatabase");
