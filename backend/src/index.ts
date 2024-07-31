import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose, { mongo } from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// Test if the database is successfully connected to the backend
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully!');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});