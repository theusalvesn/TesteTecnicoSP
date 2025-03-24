import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const authenticateTokenOptional = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

    if (authorization) {

        const token = authorization.split(" ")[1];

        try {
            const secret = process.env.JWT_SECRET;

            if (!secret) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error, no JWT_SECRET found" });
                return;
            }

            const decoded: any = jwt.verify(token, secret);

            if (!decoded) {
                res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "Invalid token" });
                return;
            }
            
            const userId = decoded.userId;

            req.userId = userId;


        } catch (error) {
            console.error(error);
        }

    }

    next();
}
