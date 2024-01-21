import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { customErrorHandler } from "../utils/error.utils.js";

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

export const signin = async (req, res, next) => {

    // Taking the data from user
    const { email, password } = req.body;

    try {
        // Checking if the user exists or not
        const validUser = await User.findOne({ email });

        // If the user doesn't exist
        if (!validUser) {
            return next(customErrorHandler("User not found", 404));
        }

        // comparing the password
        const isValidPassword = await bcryptjs.compare(password, validUser.password);

        // If the password is not correct
        if (!isValidPassword) {
            return next(customErrorHandler("Wrong credentials", 401));
        }

        // Removing password from the user object to send it to the client
        const { password: hashedPassword, ...rest } = validUser._doc;

        // generating the token
        const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // If email and password is correct then we will send the token via cookie 
        const cookieOptions = {
            expires: new Date(Date.now() + 60 * 60 * 1000), //1hr
            httpOnly: true
        }
        res.cookie("access_token", token, cookieOptions).status(200).json(rest)


    } catch (error) {
        next(error);
    }
};