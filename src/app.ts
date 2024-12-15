import express, { Application } from 'express';
import { json } from 'body-parser';

const app: Application = express();

// Middleware
app.use(json());

// Test Route
app.get('/', (req, res) => {
  res.send('API is working');
});

export default app;
