import { DataTypes, Model, Optional } from "sequelize";
import { User } from "./user.model";
import { Book } from "./book.model";
import sequelize from "../config/database";

interface UserBookBorrowAttributes {
  id: number;
  user_id: number;
  book_id: number;
  borrow_date: Date;
  return_date: Date | null;
  score: number;
}

interface UserBookBorrowCreationAttributes
  extends Optional<UserBookBorrowAttributes, "id"> {}

export class UserBookBorrow
  extends Model<UserBookBorrowAttributes, UserBookBorrowCreationAttributes>
  implements UserBookBorrowAttributes
{
  public id!: number;
  public user_id!: number;
  public book_id!: number;
  public borrow_date!: Date;
  public return_date!: Date | null;
  public score!: number;

  public readonly User?: User;
  public readonly Book?: Book;
}

UserBookBorrow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: "id",
      },
      allowNull: false,
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_book_borrows",
  }
);

UserBookBorrow.belongsTo(User, { foreignKey: "user_id", as: "User" });
UserBookBorrow.belongsTo(Book, { foreignKey: "book_id", as: "Book" });
User.hasMany(UserBookBorrow, { foreignKey: "user_id", as: "UserBookBorrows" });
Book.hasMany(UserBookBorrow, { foreignKey: "book_id", as: "UserBookBorrows" });
