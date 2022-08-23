import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/providers', require('./routes/providers'));
app.use('/products', require('./routes/products'));
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`App is running! Port ${port}`));
