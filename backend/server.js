import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import notificationRoutes from './routes/notification.routes.js'

import connectDB from './db/connectMongoDb.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE
});

const app = express();

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ limit: "5mb"}));

// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("/*splat", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}



app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})