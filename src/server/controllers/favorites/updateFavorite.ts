import { updateFavoriteCharacter } from "../../services/favorites/updateFavorite";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const updateFavoriteHandler = async (req: AuthenticatedRequest, res: Response) => {

    try {
        if (!req.userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: false,
                message: "Unauthorized"
            });
            return
        }

        const { newCharacterId, oldCharacterId } = req.body;

        if (!newCharacterId || !oldCharacterId) {
            res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "Missing newCharacterId or oldCharacterId"
            });
            return
        }

        const result = await updateFavoriteCharacter(req.userId, newCharacterId, oldCharacterId);

        res.status(StatusCodes.OK).json({
            status: "success",
            message: "Favorite updated successfully",
            data: result
        });

    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
}