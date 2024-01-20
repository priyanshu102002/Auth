import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {

    // Taking the data from user
    const { username, email, password } = req.body;

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Creating a new user using the User model
    const user = new User({ username, email, password: hashedPassword });

    // Saving the user to the database
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }

};