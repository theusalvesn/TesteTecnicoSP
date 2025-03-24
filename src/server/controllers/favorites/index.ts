import { addToFavoritesHandler } from "./addToFavorite"
import { getFavoritesCharactersHandler} from "./getFavorites"
import { getEpisodesPerFavoriteHandler, getTotalUniqueEpisodesHandler } from "./getEpisodes"
import { removeFavoriteHandler } from "./removeFavorite"
import { updateFavoriteHandler } from "./updateFavorite"

export const favoritesController = { 
    addToFavoritesHandler, getFavoritesCharactersHandler, getEpisodesPerFavoriteHandler, getTotalUniqueEpisodesHandler,
    removeFavoriteHandler, updateFavoriteHandler
}