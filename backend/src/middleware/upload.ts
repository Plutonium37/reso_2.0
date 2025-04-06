import { paymentScreenshotSchema } from "./validation";
import { Request, Response, NextFunction } from "express";

interface CostomRequestFile extends Request{
  paymentScreenshot: Express.Multer.File; // <- this is correct for a file
}

export const userFileMiddleware = async (
  req: CostomRequestFile,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentScreenshot } = req;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};
