import express from "express";
import { addBook, getAllBook, getUpdateBook, getdDeleteBook, getSingleBook } from "../controllers/book.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addBook);
router.get("/", authMiddleware, getAllBook);
router.get("/single/:id", authMiddleware, getSingleBook);
router.put("/update/:id", authMiddleware, getUpdateBook)
router.delete("/delete/:id", authMiddleware, getdDeleteBook);

export default router;