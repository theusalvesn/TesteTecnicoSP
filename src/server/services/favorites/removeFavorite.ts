import { removeFavorite } from "../../models/favoritesModels";

export async function removeCharhacterFromFavorites(id: number, character_id: number){

    const update = await removeFavorite(id, character_id )

    if (!update) {
        throw new Error("USER_NOT_FOUND_OR_CHARACTER_NOT_IN_FAVORITES");
    }

    return update;

}