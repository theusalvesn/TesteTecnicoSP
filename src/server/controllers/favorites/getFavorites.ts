import { Request, Response } from 'express';
import { getUserFavoritesCharacters } from '../../services';
import { StatusCodes } from "http-status-codes";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const getFavoritesCharactersHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                sucess: false,
                message: "Unauthorized access"
            });
            return;
        }

        const result = await getUserFavoritesCharacters(req.userId);

        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({
                sucess: false,
                message: "Favorites not found"
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: result
        });

    } catch (error) {
        console.error("Error getting favorites:", error);
        if (error instanceof Error) {
            if (error.message === "USER_NOT_FOUND") {
                res.status(StatusCodes.NOT_FOUND).json({
                    status: false,
                    message: "User not found"
                });
            }
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            sucess: false,
            message: "Internal server error"
        });
    }
}