import { updateFavorites } from "../../models/favoritesModels";


export async function updateFavoriteCharacter(id: number, newCharacterId: number, oldCharacterId: number){

    const update = await updateFavorites(id, newCharacterId , oldCharacterId)

    if (!update) {
        throw new Error("USER_NOT_FOUND_OR_CHARACTER_NOT_IN_FAVORITES");
    }

    return update;


}