const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Signup endpoint
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({
        name,
        email,
        password // For production, hash the password before saving
    });

    try {
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});



module.exports = router;
