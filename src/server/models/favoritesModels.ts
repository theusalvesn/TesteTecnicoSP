import { openDb } from "../config/database";

export async function createFavoritesTable() {
    try {
        const db = await openDb();
        await db.exec(`
            CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            character_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
            )`);
        await db.close();

    } catch (error) {
        throw new Error("Error creating favorites table: " + error);
    }
}

export async function checkIfInFavorites(userId: number, characterId: number): Promise<boolean> {
    const db = await openDb();
    try {
        const existing = await db.get(`
            SELECT * FROM favorites 
            WHERE user_id = ? AND character_id = ?`,
            [userId, characterId]);
        return !!existing; // !! converts to boolean
    } catch (error) {
        throw new Error("Error checking favorites: " + error);
    } finally {
        await db.close();
    }
}

export async function addFavoriteToDatabase(userId: number, characterId: number) {
    const db = await openDb();
    try {

        const result = await db.run(`
            INSERT INTO favorites
            (character_id,user_id) VALUES(?,?)`,
            [characterId, userId]);

        return result.lastID;

    } catch (error) {
        console.error("Error adding favorite:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to add favorite: ${error.message}`);
        }
    } finally {
        await db.close();
    }
}

export async function getFavoritesByUserId(userId: number) { 
    
    const db = await openDb();

    try {

        const result = await db.all(`
            SELECT character_id FROM favorites 
            WHERE user_id = ?`,
            [userId]);
        

        const favorite = result.map(item => item.character_id);
    
        return favorite;

    } catch (error) {
        throw new Error("Error getting favorites: " + error);
    } finally {     
        await db.close();
    }

}

export async function updateFavorites(userId: number, newCharacterId: number, oldCharacterId: number) : Promise<boolean> {
    
    const db = await openDb();

    try {
        const result = await db.run(`
            UPDATE favorites
            SET character_id = ?
            WHERE user_id = ? AND character_id = ?`,
            [newCharacterId, userId, oldCharacterId]);
        
        if (result.changes == 0){
            return false 
        }

        return true

    } catch (error) {
        throw new Error("Error updating favorites: " + error);
    } finally {
        await db.close();
    }
}   

export async function removeFavorite(usedId: number, character_id : number ) : Promise<boolean> {
    const db = await openDb();
    try {
        
        const result = await db.run(`
            DELETE FROM favorites
            WHERE user_id = ? AND character_id = ?`,
            [usedId, character_id]);
            
        if (result.changes == 0) {
            throw new Error("USER_NOT_FOUND_OR_CHARACTER_NOT_IN_FAVORITES");
        }

        return true;

    } catch (error) {
        throw new Error("Error removing favorite: " + error);
    } finally {
        await db.close();
    }

}