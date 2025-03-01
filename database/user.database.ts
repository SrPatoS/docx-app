import { IDatabase } from "@/database/database.interface";
import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export interface IUser {
	id: string;
	email: string;
	avatar: string;
	name: string;
}

export class UserDatabase implements IDatabase {
	private database!: SQLite.SQLiteDatabase;
	public static Instance: UserDatabase;

	async config(db: SQLiteDatabase) {
		this.database = db;
		await this.database.execAsync("CREATE TABLE IF NOT EXISTS user (id TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, avatar TEXT, name TEXT);");
		if (!UserDatabase.Instance) {
			UserDatabase.Instance = this;
		}
	}

	async create(id: string, email: string, avatar: string, name: string): Promise<void> {
		try {
			const query = `INSERT INTO user (id, email, avatar, name)
                     VALUES ('${id}', '${email}', '${avatar}', '${name}')`;
			await this.database.execAsync(query);
		} catch (error) {
			console.error(error);
		}
	}

	async read(): Promise<IUser> {
		return await this.database.getFirstAsync("SELECT * FROM user") as IUser;
	}
}