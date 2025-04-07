import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validate } from "../middleware/validation";
import {
  createEventWithAdmin,
  sAdminSigninMiddleware,
  sAdminSignupMiddleware,
} from "../middleware/superAdminMiddleware";
dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;
const router = Router();
interface CostomRequestSignup extends Request {
  email?: string;
  name?: string;
  password?: string;
}
//super  admin sign up route
router.post(
  "/signup",
  sAdminSignupMiddleware,
  async (req: CostomRequestSignup, res: Response) => {
    const name = req.name;
    const email = req.email;
    const password = req.password;

    try {
      const sadmin = await prisma.sadmin.create({
        data: {
          email: email!,
          name: name!,
          password: password!,
        },
      });
      const details = {
        email: sadmin.email,
        role: "SUPERADMIN",
      };
      const sadminData = {
        email: sadmin.email,
        name: sadmin.name,
      };
      const token = jwt.sign(details, JWT_SECRET, { expiresIn: "7d" });
      res.status(200).json({
        message: "Super Admin registered successfully",
        authorization: "Bearer " + token,
        user: sadminData,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  }
);

interface CostomRequestSignin extends Request {
  email?: string;
  name?: string;
}
//superadmin sign in route
router.post(
  "/signin",
  sAdminSigninMiddleware,
  (req: CostomRequestSignin, res: Response) => {
    const email = req.email;
    const name = req.name;
    try {
      const details = {
        email: email!,
        role: "SUPERADMIN",
      };
      const sadminData = {
        email: email,
        name: name,
      };
      const token = jwt.sign(details, JWT_SECRET, { expiresIn: "7d" });
      res.status(200).json({
        message: "Super Admin signin successfully",
        authorization: "Bearer " + token,
        userData: sadminData,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
);

interface CostomRequest extends Request {
  name?: string;
  adminEmail?: string;
  adminPassword?: string;
  event?: string;
  date?: string;
  description?: string;
  paymentQr?: string;
  fee?: number
}
// super admin create both admin and event at the same time
router.post(
  "/event-admin",
  validate,
  createEventWithAdmin,
  async (req: CostomRequest, res: Response) => {
    try {
      const {
        name,
        adminEmail,
        adminPassword,
        event,
        date,
        description,
        paymentQr,
        fee,
      } = req;
      const { newEvent, newAdmin } = await prisma.$transaction(async (prisma) => {
        const newEvent = await prisma.event.create({
          data: {
            event: event ?? "",
            date: date ?? "",
            description: description ?? "",
            fee:String(fee)?? "",
            paymentQr: paymentQr ?? "",
          },
        });

        const newAdmin = await prisma.admin.create({
          data: {
            name: name ?? "",
            email: adminEmail ?? "",
            password: adminPassword ?? "",
            event: { connect: { id: newEvent.id } },
          },
        });

        return { newEvent, newAdmin };
      });
      const details = {
        event: newEvent.event,
        admin: newAdmin.name,
      };
      res
        .status(201)
        .json({ message: "Event and Admin successfully created", details });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
);

interface CustomRequestProfile extends Request {
  email?: string;
}
//get super admin profile data
router.get("/profile",validate,async(req:CustomRequestProfile,res:Response)=>{
  try{
    const {email}=req
    const user = await prisma.sadmin.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(409).json({ message: "User doesn't exist" });
      return;
    }
    const userData = {
      email: email,
      name: user.name!,
    };
    res.status(201).json({
      message: "Get Details Successfull",
      userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
})

export default router;
