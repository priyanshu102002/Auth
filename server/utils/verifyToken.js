import jwt from "jsonwebtoken";
import { customErrorHandler } from "./error.utils.js";

export const verifyToken = (req, res, next) => {
    // every logged in user will have a cookies named access_token
    const token = req.cookies.access_token;

    // if there is no token
    if (!token) {
        next(customErrorHandler("You need to log in", 401));
    }

    // user access token should be verified with the secret key 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            next(customErrorHandler("Token is not valid", 403));
        }
        req.user = user;
        next();
    });

}