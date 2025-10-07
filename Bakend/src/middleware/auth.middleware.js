import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ message: "Invalid or Expired Token"});
    }
}

export default authMiddleware


