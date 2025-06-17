import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import noteRoutes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";




dotenv.config();

// Initialize the Express application


const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({origin: "http://localhost:5173",}));
app.use(rateLimiter);
app.use("/api/notes", noteRoutes);


connectDB().then(() => {
	app.listen(PORT,() =>{
		console.log("Server is running on Port: ",PORT);
	})
});


//app.listen(PORT, () => {
//	console.log("Server is running on PORT:", PORT);
//})

