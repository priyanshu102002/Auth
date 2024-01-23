import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/user.routes.js';
import authRoute from "./routes/auth.routes.js"
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// For handling CORS error
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// For parsing the request body
app.use(express.json());
// For parsing the cookie
app.use(cookieParser());

// Routes
app.use("/api/user", router)
app.use("/api/auth", authRoute)

// For handling error we will use this middleware -> next(error)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('Connected to MongoDB') }).catch((err) => { console.log(err) });

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });