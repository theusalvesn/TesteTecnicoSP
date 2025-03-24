import { getFavoritesByUserId } from "../../models/favoritesModels";
import { getUserBy } from "../../models/userModels";
import { getCharacter,ApiResponse } from 'rickmortyapi';

interface ICharacter {
    id: number;
    name: string;
    episode: string[]; 
  }

export async function getUserFavoritesCharacters(id: number) : Promise<ApiResponse<ICharacter[]> | undefined> {

    const user = await getUserBy("id", id);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const charactersArray = await getFavoritesByUserId(id);

    if (!charactersArray || charactersArray.length === 0) {
        return undefined;
    }

    const favoriteCharacters = await getCharacter(charactersArray)
    
    console.log()

    return favoriteCharacters;
}

