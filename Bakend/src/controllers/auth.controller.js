import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const SignUp = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            message: "User created successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })

    } catch (error) { res.status(500).json({ message: error.message })}
}


export const Login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User does not exist" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const Logout = async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        res.status(200).json({ message: "Logout successful" });
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}




