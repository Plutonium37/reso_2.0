import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import users from "./routes/users";
import admin from "./routes/admin";
import superadmin from "./routes/superadmin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET as string;

// Initialize global setting in DB
const initializeGlobalSetting = async () => {
  try {
    await prisma.globalSetting.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        registrationOpen: true,
      },
    });
    console.log("Global setting initialized");
  } catch (err) {
    console.error("Failed to initialize global setting:", err);
  }
};
initializeGlobalSetting();

// Middlewares
app.use(express.json());
app.use(cors());

// Check if user is logged in
app.get("/islogIn", (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({ message: "Not Logged In", auth: null });
    return;
  }

  const token = authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET) as {
      email: string;
      role: "USER" | "ADMIN" | "SUPERADMIN";
    };
    res.status(200).json({ auth: verified.role, message: "Authenticated" });
  } catch {
    res.status(403).json({ message: "Forbidden", auth: null });
  }
});

// Routes
app.use("/users", users);
app.use("/admin", admin);
app.use("/sadmin", superadmin);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
