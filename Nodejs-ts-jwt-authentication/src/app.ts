import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user.route';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * Database connection
 */
const URI = process.env.DATABASE_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established');
});

/**
 * Routes
 */
app.use('/users', userRouter);

/**
 * Listen
 */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});