import express from "express";
import aurhMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {addBook, getAllBook, getUpdateBook, getdDeleteBook, getSingleBook} from "../controllers/book.controller.js";
const router = express.Router();



router.post("/add", upload.single("image"), aurhMiddleware, addBook);
router.get("/", aurhMiddleware, getAllBook);
router.get("/single/:id", aurhMiddleware, getSingleBook);
router.put("/update/:id", upload.single("image"), aurhMiddleware, getUpdateBook);
router.delete("/delete/:id", aurhMiddleware, getdDeleteBook);


export default router;