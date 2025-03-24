
import { createUser, getUserBy } from "../../models/userModels";

const bcrypt = require('bcrypt');

const hashPassword = async (password: string) => {
    const salt = 10;
    return bcrypt.hash(password, salt);
}

export async function createNewUser(userName: string, email: string, password: string) {

    const checkUser = await getUserBy("email", email);

    if (checkUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    const hasehdPassword = await hashPassword(password);
    const newUser = createUser(userName, email, hasehdPassword);
    
    return newUser;
};


