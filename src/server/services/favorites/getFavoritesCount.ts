
import { getFavoritesByUserId } from "../../models/favoritesModels";


export async function getFavoritesCount(id: number) {

    const charactersArray = await getFavoritesByUserId(id);

    if ( charactersArray.length >= 3 ){
        throw new Error("LIMIT_FAVORITES_REACHED");
    }

    return charactersArray.length;

}