import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB  from "./config/db.js";
import authRoute  from "./routes/auth.route.js";
import bookRoute from "./routes/book.route.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);



app.listen(process.env.PORT || 5000, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});