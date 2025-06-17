import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import noteRoutes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";




dotenv.config();

// Initialize the Express application


const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

app.use(express.json()); // Middleware to parse JSON bodies

if(process.env.NODE_ENV !== "production"){
	app.use(cors({origin: "http://localhost:5173",}));
};

app.use(rateLimiter);
app.use("/api/notes", noteRoutes);

if(process.env.NODE_ENV === "production"){
	app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res) => {
	res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
});
}


connectDB().then(() => {
	app.listen(PORT,() =>{
		console.log("Server is running on Port: ",PORT);
	})
});


//app.listen(PORT, () => {
//	console.log("Server is running on PORT:", PORT);
//})

