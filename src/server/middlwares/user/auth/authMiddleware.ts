import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const authenticateToken: RequestHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    if (!process.env.JWT_SECRET) { 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });
        return;
    }
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "Invalid access" });
        return;
    }

    const token = authorization.split(" ")[1]; 
    
    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "Invalid access" });
        return;
    }

    try {
        const secret = process.env.JWT_SECRET;
        const decoded: any = jwt.verify(token, secret); 
        const userId = decoded.userId;
        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "Invalid token payload: User ID not found" });
            return;
        }
        
        req.userId = userId;

        next(); 

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Invalid access" });
        return;
    }
};
