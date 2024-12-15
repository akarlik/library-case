import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { UserBookBorrow } from "../models/user-book-borrow.model";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const user = await Book.create({ name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const getBookInfo = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findOne({
      where: { id: bookId },
      include: [
        {
          attributes: ["return_date","score"],
          required: false,
          model: UserBookBorrow,
          as: "UserBookBorrows",
        },
      ],
    });

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    const userBookBorrows = book.UserBookBorrows || [];
    let average = 0.0;

    const filteredList = userBookBorrows.filter((ubb) => ubb.return_date);
    const total = filteredList.reduce((sum, ubb) => sum + ubb.score, 0);
    if (filteredList.length !== 0) {
      average = total / filteredList.length;
    }

    res.status(200).json({
      id: book.id,
      name: book.name,
      score: average > 0 ? average.toFixed(2) : -1,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
