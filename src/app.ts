import express, { Application, Request, Response } from "express";
import { json } from 'body-parser';
import pool from "./config/database";

const app: Application = express();

app.use(json());

app.get('/', (req, res) => {
  res.send('API is working');
});

app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Database query failed" });
  }
});
export default app;
