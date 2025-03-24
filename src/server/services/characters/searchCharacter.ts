import { getCharacters } from "rickmortyapi";

export async function searchCharacter(name: string) {

    name.split("+").join(" ")

    const characters = await getCharacters({ "name": name });

    if (characters.statusMessage === "Not Found") {
        throw new Error("CHARACTER_NOT_FOUND");
    }

    return characters;

}