import User from "../models/user.model.js";
import { customErrorHandler } from "../utils/error.utils.js"
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({ message: 'Hello World!' })
}

export const updateUser = async (req, res, next) => {
    // check if the user is updating his own data
    if (req.user._id !== req.params.id) {
        return next(customErrorHandler('You are not allowed to update this user', 403));
    }

    try {
        // if user want to change the password hash it first 
        if (req.body.password) {
            req.body.password = await bcryptjs.hash(req.body.password, 12);
        }

        // update the user
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
            }
        }, { new: true });

        // Removing the password 
        const { password, ...rest } = updatedUser._doc;

        // send the response without password
        res.status(200).json(rest);

    } catch (error) {
        next(customErrorHandler(error.message, 500));
    }
} 