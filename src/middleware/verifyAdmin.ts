import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyUser = async (req: Request,res: Response,next: NextFunction) => {
  try {
    // Membaca data header request
    const header = req.headers.authorization;
    // Membaca data token yang dikirimkan
    const token = header?.split(" ")[1] || "";
    const secretKey = "bakso";
    // Proses verifikasi token
    verify(token, secretKey, (error) => {
      if (error) {
        return res.status(401).json({
          status: false,
          message: "Unauthtorize",
        });
      }
      next();
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      error,
    });
  }
};
