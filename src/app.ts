import express, { Application } from "express";
import { json } from 'body-parser';
import userRoutes from './routes/user.route';

const app: Application = express();

app.use(json());

app.use('/', userRoutes);

export default app;
