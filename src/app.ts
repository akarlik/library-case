import express, { Application } from "express";
import { json } from "body-parser";
import userRoutes from "./routes/user.route";
import bookRoutes from "./routes/book.route";

const app: Application = express();

app.use(json());

app.use("/", userRoutes);
app.use("/", bookRoutes);

export default app;
