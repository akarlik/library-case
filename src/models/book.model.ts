import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface BookAttributes {
  id: number;
  name: string;
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

export class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public name!: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "books",
  }
);
