import { createNewUser } from "../../services";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const newUser = await createNewUser(userName, email, password);

    if (!newUser) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong creating the user"
      });
      return; 
    }

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created with sucess",
      data: newUser
    });

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "User already exists"
        });
        return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error"
    });
  }
};
