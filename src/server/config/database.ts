import sqlite3 from "sqlite3";
import { open } from "sqlite";

import path from "path";

const dataBaseDir = path.resolve(__dirname, "../database");
const dbPath = path.resolve(dataBaseDir, "database.db");

export async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}