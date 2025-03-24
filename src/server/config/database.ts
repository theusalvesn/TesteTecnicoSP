import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

const dataBaseDir = path.resolve(__dirname, "../database");

const dbPath = path.resolve(dataBaseDir, "database.db");

if (!fs.existsSync(dataBaseDir)) {
  fs.mkdirSync(dataBaseDir, { recursive: true });
}

export async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
