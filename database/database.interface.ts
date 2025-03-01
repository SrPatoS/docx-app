import { SQLiteDatabase } from "expo-sqlite";

export interface IDatabase {
	config: (db: SQLiteDatabase) => void | Promise<void>;
}