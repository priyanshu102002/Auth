// this is a custom error handler, we can use this next(customErrorHandler(message,statusCode)) in any controller to handle the error

export const customErrorHandler = (message, statusCode) => {
    const error = new Error();
    error.message = message;
    error.statusCode = statusCode;
    return error;
};