import { removeCharhacterFromFavorites } from "../../services/favorites/removeFavorite";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";



interface AuthenticatedRequest extends Request {
    userId?: number;
}


export const removeFavoriteHandler = async (req: AuthenticatedRequest, res: Response) => {

    const userId = req.userId;

    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized"
        });
        return;
    }
    
    const { id } = req.params;
    const numericId = parseInt(id, 10);  

    if (isNaN(numericId)) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Invalid character id"
        });
        return;
    }

    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Missing characterId"
        });
        return;
    }

    try {
        const result = await removeCharhacterFromFavorites(userId, numericId);

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Character removed from favorites",
            data: result
        });

    } catch (error) {
        console.error("Error removing favorite:", error);

        if (error instanceof Error) {
            if (error.message === "USER_NOT_FOUND_OR_CHARACTER_NOT_IN_FAVORITES") {
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Favorite not found or character not in favorites"
                });
                return;
            }
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error"
        });
    }


}
