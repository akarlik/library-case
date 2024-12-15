import { Request, Response } from "express";
import { Book } from "../models/book.model";

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
