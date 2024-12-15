import { Router, Request, Response } from "express";
import { createBook, getAllBooks } from "../controllers/book.controller";
import { bookValidationRules, validateBook } from "./validators/book.validator";

const router = Router();

router.get("/books", getAllBooks);
router.post(
  "/books",
  bookValidationRules(),
  validateBook,
  (req: Request, res: Response) => {
    createBook(req, res);
  }
);

export default router;
