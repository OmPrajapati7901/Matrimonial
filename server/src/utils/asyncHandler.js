const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

module.exports =  asyncHandler ;


    // What it does:
    // It catches any errors in async route handlers and automatically passes them to the next middleware, usually an error handler.

    // How it works:

    // Takes an async function (requestHandler) as input.
    // Returns a new function that executes requestHandler and catches any errors.
    // If an error occurs, it calls next(err) to pass the error to the next middleware.
    
    // Why it's useful:
    // It simplifies error handling in async route handlers, so you don't need to write try-catch blocks in each handler.

