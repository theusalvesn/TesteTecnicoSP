import { addFavoriteToDatabase, checkIfInFavorites } from "../../models/favoritesModels";
import { getUserBy } from "../../models/userModels";
import { getFavoritesByUserId } from "../../models/favoritesModels";

export async function addFavorite(id: number, characterId: number) {

    const user = await getUserBy("id", id);

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const charactersArray = await getFavoritesByUserId(id);

    if (charactersArray.length >= 3) {
        throw new Error("LIMIT_FAVORITES_REACHED");
    }

    const alreadyInFavorites = await checkIfInFavorites(id, characterId);

    if (alreadyInFavorites) {
        throw new Error("ALREADY_IN_FAVORITES");
    }

    const result = await addFavoriteToDatabase(id, characterId);
    return result

}

