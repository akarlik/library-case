import { DataTypes, Model, Optional } from "sequelize";
import { User } from "./user.model";
import { Book } from "./book.model";
import sequelize from "../config/database";

interface UserBookBorrowAttributes {
  id: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  returnDate: Date | null;
  score: number;
}

interface UserBookBorrowCreationAttributes
  extends Optional<UserBookBorrowAttributes, "id"> {}

export class UserBookBorrow
  extends Model<UserBookBorrowAttributes, UserBookBorrowCreationAttributes>
  implements UserBookBorrowAttributes
{
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public borrowDate!: Date;
  public returnDate!: Date | null;
  public score!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserBookBorrow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: "id",
      },
      allowNull: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
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

UserBookBorrow.belongsTo(User, { foreignKey: "userId" });
UserBookBorrow.belongsTo(Book, { foreignKey: "bookId" });
User.hasMany(UserBookBorrow, { foreignKey: "userId" });
Book.hasMany(UserBookBorrow, { foreignKey: "bookId" });
