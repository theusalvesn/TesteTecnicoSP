import { getUserFavoritesCharacters } from "./getUserFavoriteService";

interface ICharacter {
    id: number;
    name: string;
    episode: string[];
}


interface ICharacterEpisodes {
    name: string;
    id: number;
    episodeCount: number;
}

export async function getCharacterEpisodes(userId: number): Promise<ICharacterEpisodes[]> {
    const response = await getUserFavoritesCharacters(userId);

    if (!response || !response.data || response.data.length === 0) {
        throw new Error("NO_FAVORITES_FOUND");
    }

    const data =  response.data.map((char: ICharacter) => ({
        name: char.name,
        id: char.id,
        episodeCount: char.episode.length
    }));

    return data
}

export async function getTotalUniqueEpisodes(userId: number): Promise< number > {

    const response = await getUserFavoritesCharacters(userId);

    if (!response || !response.data || response.data.length === 0) {
        throw new Error("NO_FAVORITES_FOUND");
    }

    const uniqueEpisodes = new Set<string>();

    response.data.forEach((char: ICharacter) => {
        char.episode.forEach((ep) => uniqueEpisodes.add(ep));
    });

    return uniqueEpisodes.size;
}

