import express, { Application, Request, Response } from "express";
import { json } from 'body-parser';
import sequelize from "./config/database";

const app: Application = express();

app.use(json());

app.get('/', (req, res) => {
  res.send('API is working');
});

app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const result = await sequelize.authenticate();
    res.json({ success: true, });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Database query failed" });
  }
});
export default app;
