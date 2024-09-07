import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from './config/connectdb.js';
import homeRoutes from "./routes/homeRoute.js";
dotenv.config(); //Note You will not be needed Dotenv package if you are using latest 20 version of Nodejs;

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// For using Cors 
app.use(cors());

// For connecting Database 
connectdb(DATABASE_URL);
// For using json in our backend
app.use(express.json());
// Basic route 
app.get('/', (req, res) => {
    res.status(200).send("Welcome here");
});

// ROute for Scappring Data 
app.use('/api', homeRoutes);
app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`)
});