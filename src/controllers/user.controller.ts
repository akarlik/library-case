import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserBookBorrow } from "../models/user-book-borrow.model";
import { Book } from "../models/book.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const user = await User.create({ name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: UserBookBorrow,
          as: "UserBookBorrows",
          include: [
            {
              model: Book,
              as: "Book",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const userBookBorrows = user.UserBookBorrows || [];

    const pastBooks = userBookBorrows.filter(
      (borrow: any) => borrow.return_date
    );

    const presentBooks = userBookBorrows.filter(
      (borrow: any) => !borrow.return_date
    );

    const result = {
      id: user.id,
      name: user.name,
      books: {
        past: pastBooks.map((borrow: any) => ({
          name: borrow.Book.name,
          userScore: borrow.score,
        })),
        present: presentBooks.map((borrow: any) => ({
          name: borrow.Book.name,
        })),
      },
    };

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user data" });
  }
};
