import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB  from "./config/db.js";
import authRoute  from "./routes/auth.route.js";
import bookRoute from "./routes/book.route.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);



app.listen(process.env.PORT || 5000, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});