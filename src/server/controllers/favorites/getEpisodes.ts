import { Request, Response } from "express";
import { getCharacterEpisodes, getTotalUniqueEpisodes } from "../../services/favorites/getEpisodes";
import { StatusCodes } from "http-status-codes";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const getEpisodesPerFavoriteHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized"
            });
            return;
        }

        const characterEpisodes = await getCharacterEpisodes(userId);

        res.status(StatusCodes.OK).json({
            success: true,
            data: characterEpisodes
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "NO_FAVORITES_FOUND") {
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "No favorites found"
                });
                return;
            }
        }
        console.error("Error getting episodes:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getTotalUniqueEpisodesHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized"
            });
            return;
        }

        const totalUniqueEpisodes = await getTotalUniqueEpisodes(userId);

        res.status(StatusCodes.OK).json({
            success: true,
            data: totalUniqueEpisodes
        });
        
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "NO_FAVORITES_FOUND") {
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "No favorites found"
                });
                return;
            }
        }
        console.error("Error getting total unique episodes:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error"
        });
    }
}