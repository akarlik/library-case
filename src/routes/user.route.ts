import { Router, Request, Response } from "express";
import { createUser, getAllUsers } from "../controllers/user.controller";
import { userValidationRules, validateUser } from "./validators/user.validator";

const router = Router();

router.get("/users", getAllUsers);
router.post(
  "/users",
  userValidationRules(),
  validateUser,
  (req: Request, res: Response) => {
    createUser(req, res);
  }
);

export default router;
