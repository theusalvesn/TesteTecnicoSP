import e, { Request, Response, NextFunction } from 'express';
import { checkUserRequest, updateAuthenticatedUserRequest } from '../../../models/userModels';
import { StatusCodes } from "http-status-codes";

const requestCounts: Record<string, number> = {};

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const countUserRequest = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {
        const userId = req.userId;

        if (userId) {
            
            const userRequest = await checkUserRequest(userId);
        
            if (userRequest !== undefined) {         
                if (userRequest >= 10) {
                    res.status(StatusCodes.TOO_MANY_REQUESTS).json({ success: false, message: "Too many requests, limit of 10 reached" });
                    return;
                }

                const updateRows = await updateAuthenticatedUserRequest(userId);
                
                console.log("updateRows:", updateRows);

                if (!updateRows) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
                    return;
                }
            }
        } else {
            const ip = req.ip;
            if (ip) {
                requestCounts[ip] = (requestCounts[ip] || 0) + 1;
                if (requestCounts[ip] > 3) {
                    res.status(StatusCodes.TOO_MANY_REQUESTS).json({ success: false, message: "Too many requests, limit of 3 reached, please create an account and authenticate" });
                    return;
                }
            }
        }

        next();

    } catch (error) {
        console.error("Error counting user requests:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
        return;
    }
};
