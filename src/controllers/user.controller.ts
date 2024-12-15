import { Request, Response } from "express";
import { User } from "../models/user.model";

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
