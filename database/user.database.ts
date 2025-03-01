import { IDatabase } from "@/database/database.interface";
import * as SQLite from "expo-sqlite";

export class UserDatabase implements IDatabase {
	private database!: SQLite.SQLiteDatabase;
	public static Instance: UserDatabase;

	async config(db: string) {
		this.database = await SQLite.openDatabaseAsync(db);
		await this.database.execAsync("CREATE TABLE IF NOT EXISTS user (id TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, avatar TEXT, name TEXT);");
		if (!UserDatabase.Instance) {
			UserDatabase.Instance = this;
		}
	}


}