import { openDb } from "../config/database";
import { IUser } from "./interface/userInterface";

export async function createUserTable() {
    try {
        const db = await openDb();
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            user_request INTEGER DEFAULT 0
            );
        `);
        
        await db.close();
    } catch (error) {
        throw new Error("Erro ao criar tabela de usuários: " + error);
    }
}

export async function createUser(name: string, email: string, password: string) {

    const db = await openDb();
    const result = await db.run(`
        INSERT INTO users (name, email, password)
        VALUES (?,?,?)`, [name, email, password]);
    await db.close();

    if (!result ) {
        throw new Error("Erro ao criar usuário");
    }

    return result
}
export async function getUserBy(field: string, value: any): Promise<IUser | undefined> {
    try {

        const allowedFields = ["id", "email", "username"];
        if (!allowedFields.includes(field)) {
            throw new Error("Campo de busca inválido");
        }

        const db = await openDb();

        const result = await db.get(
            `SELECT * FROM users WHERE ${field} = ?`, 
            [value]
        );
        await db.close();

        return result as IUser | undefined;

    } catch (error) {
        console.error(`Erro ao buscar usuário por ${field}:`, error);
        throw new Error("INTERNAL_ERROR_GET_USER"); 
    }
}

export async function updateAuthenticatedUserRequest(id: number): Promise<boolean> {
    try {

        const db = await openDb();
        const result = await db.run(
            `UPDATE users SET user_request = user_request + 1 WHERE id = ?`, 
            [id]
        );
        await db.close();

        if (result.changes === 0) {
            throw new Error("USER_NOT_FOUND");
        }

        return true; 

    } catch (error) {
        console.error("Erro ao atualizar requisição do usuário:", error);
        throw new Error("INTERNAL_ERROR_UPDATE_USER_REQUEST");
    }
}

export async function checkUserRequest(id: number): Promise<number | undefined> {

    const db = await openDb();

    try {
        

        const result = await db.get(`
            SELECT user_request FROM users WHERE id = ?`, [id]);
        
        if (!result) {          
            return undefined;    
        }
        return result.user_request;

    } catch (error) {
        console.error("Erro ao verificar requisição do usuário:", error);
        throw new Error("INTERNAL_ERROR_CHECK_USER_REQUEST");
    } finally {
        await db.close();
    }
}
