import { createUserTable } from "../models/userModels";
import { createFavoritesTable } from "../models/favoritesModels";

export async function initDatabase() {
  try {
    
    await createUserTable() 
    await createFavoritesTable();

    console.log("Tables created!");
  } catch (err) {
    console.error("Error creating tables: ", err);
  }
}