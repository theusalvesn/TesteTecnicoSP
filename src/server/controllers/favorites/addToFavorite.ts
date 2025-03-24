import { Request, Response } from 'express';
import { addFavorite } from '../../services';
import { StatusCodes } from "http-status-codes";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const addToFavoritesHandler = async (req: AuthenticatedRequest, res: Response) => {

    try {
        const { characterId } = req.body;

        if (!req.userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized"
            });
            return;
        }

        const userId = req.userId;

        const result = await addFavorite(userId, characterId);

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Character added to favorites",
            data: result
        });

    } catch (error) {
        console.error("Error adding to favorites:", error);

        if (error instanceof Error) {
            if (error.message === "USER_NOT_FOUND") {
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "User not found"
                });
                return;
            }

            if (error.message === "ALREADY_IN_FAVORITES") {
                res.status(StatusCodes.CONFLICT).json({
                    success: false,
                    message: "Character already in favorites"
                });
                return;
            }

            if( error.message === "LIMIT_FAVORITES_REACHED"){
                res.status(StatusCodes.FORBIDDEN).json({
                    success: false,
                    message: "Limit of favorites reached, please remove one to add another"
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