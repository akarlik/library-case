import { Router, Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserInfo,
} from "../controllers/user.controller";
import { userValidationRules, validateUser } from "./validators/user.validator";

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUserInfo);

router.post(
  "/",
  userValidationRules(),
  validateUser,
  (req: Request, res: Response) => {
    createUser(req, res);
  }
);

export default router;
