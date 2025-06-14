import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB databse connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error connnection to mongoDB: ${error.message}`)
        process.exit(1);
    }
}

export default connectDB;