const ApiError = require("../utils/ApiError");
const asyncHandler  = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const User  = require("../models/user.model");

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decodedToken)
        // console.log('decodedToken?._id',decodedToken?._id)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        // console.log(decodedToken)
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

module.exports = { verifyJWT };
