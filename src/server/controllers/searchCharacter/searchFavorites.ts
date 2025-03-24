import { Request, Response } from 'express';
import { searchCharacter } from '../../services';
import { StatusCodes } from "http-status-codes";

export const searchCharacterController = async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const characters = await searchCharacter(name);

        if (!characters) {
            throw new Error("CHARACTER_NOT_FOUND");
        }
        
        res.status(StatusCodes.OK).json({
            success: true,
            message: characters
        });

    } catch(error) {
        console.error("Error searching character: ", error);

        if (error instanceof Error) {
            if (error.message === "CHARACTER_NOT_FOUND") {
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Character not found"
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