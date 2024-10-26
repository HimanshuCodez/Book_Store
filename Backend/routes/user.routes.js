import express from 'express';
import User from '../models/user.model.js';
import bcrypt from "bcrypt";
const router = express.Router();

// Signup route
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check for missing fields
        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Check if email already exists
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            username:username,
            email:email,
            password:hashPassword,
            address:address
        });

        // Save new user to the database
        await newUser.save();
        return res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error("Error during signup:", error); // Log the error to understand the issue
        res.status(500).json({ message: "Sign up error", error: error.message });
    }
});

export default router;
