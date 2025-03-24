import { Request, Response } from 'express';
import { signIn } from '../../services/'	
import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes";

export const signInController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await signIn(email, password);
        
        if (!process.env.JWT_SECRET) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal server error"
            });
            console.log("JWT_SECRET not found in .env file");
            return;
        }
        
        const accessToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Sign in successful",
            accessToken
        });
        
    } catch (error) {
        console.error("Error signing in:", error);

        if (error instanceof Error) {
            if (error.message === "USER_NOT_FOUND" ) {
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "User not found"
                });
                return;     
            }

            if (error.message === "INVALID_PASSWORD") {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: "Invalid password"
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
