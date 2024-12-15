import { Router, Request, Response } from "express";
import { createBook, getAllBooks } from "../controllers/book.controller";
import { bookValidationRules, validateBook } from "./validators/book.validator";

const router = Router();

router.get("/", getAllBooks);
router.post(
  "/",
  bookValidationRules(),
  validateBook,
  (req: Request, res: Response) => {
    createBook(req, res);
  }
);

export default router;
