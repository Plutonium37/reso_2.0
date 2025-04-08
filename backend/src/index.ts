import express from "express";
import cors from "cors";
import users from "./routes/users";
import admin from "./routes/admin";
import superadmin from "./routes/superadmin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initializeGlobalSetting = async () => {
  await prisma.globalSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      registrationOpen: true,
    },
  });
};

initializeGlobalSetting();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET as string;
app.use(express.json());
app.use(cors());
app.get("/islogIn", (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({ message: "Not Log In", auth: null});
    return;
  }
  const token = authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET) as {
      email: string;
      role: "USER" | "ADMIN" | "SUPERADMIN";
    };
    if (verified) {
      res.status(200).json({ auth: verified.role, message: "It's authenticated" });
    }
  } catch {
    res.status(403).json({ message: "Forbidden", auth: null });
  }
});
app.use("/users", users);
app.use("/admin", admin);
app.use("/sadmin", superadmin);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
