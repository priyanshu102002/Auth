import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/user.routes.js';
import authRoute from "./routes/auth.routes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/user",router)
app.use("/api/auth",authRoute)

mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('Connected to MongoDB') }).catch((err) => { console.log(err) });

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });