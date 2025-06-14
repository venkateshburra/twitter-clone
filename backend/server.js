import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.routes.js'
import connectDB from './db/connectMongoDb.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})