if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  require('module-alias/register');
}

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { handleError } from './base/AppError';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/providers', require('./routes/providers'));
app.use('/products', require('./routes/products'));
app.use('/auth', require('./routes/auth'));

app.use(handleError);

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`App is running! Port ${port}`));
