import { getUserBy } from "../../models/userModels";
import { IUser } from "../../models/interface/userInterface";

const bcrypt = require('bcrypt');

export async function signIn(email: string, password: string): Promise<IUser> {

    const user: IUser | undefined = await getUserBy("email", email);

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("INVALID_PASSWORD");
    }

    return user;
};