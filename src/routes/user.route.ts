import { Router, Request, Response } from "express";
import {
  borrowBook,
  createUser,
  getAllUsers,
  getUserInfo,
  returnBook
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

router.post("/:user_id/borrow/:book_id", borrowBook);
router.post("/:user_id/return/:book_id", returnBook);

export default router;
