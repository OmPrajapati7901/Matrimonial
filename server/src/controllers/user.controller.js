const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const User = require("../models/user.model.js");
const ApiResponse = require("../utils/ApiResponse.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Function to generate access and refresh tokens for a user
const generateAccessAndRefereshTokens = async(userId) => {
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        // Generate access and refresh tokens
        // console.log('userId',userId)
        // console.log(user)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        // console.log('accessToken',accessToken, refreshToken)

        // Save the refresh token in the user's record
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken, refreshToken};
    } catch (error) {
        // Handle errors and throw a custom error

        console.log('error',error)
        throw new ApiError(500, "Something went wrong while generating referesh and access token");
    }
}

// Function to register a new user
const registerUser = asyncHandler(async (req, res) => {
    const {email, username, password } = req.body;

    // Check if any of the required fields are empty
    if ([email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // Create a new user
    const user = await User.create({
        email, 
        password,
        username: username.toLowerCase()
    });

    // Fetch the newly created user excluding password and refresh token fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Send the response with the created user details
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    );
});

// Function to log in a user
const loginUser = asyncHandler(async (req, res) => {
    const {email, username, password} = req.body;
    console.log(email);

    // Check if username or email is provided
    if (!username && !email) {
        throw new ApiError(400, "username or email is required");
    }

    // Find the user by username or email
    const user = await User.findOne({
        $or: [{username}, {email}]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Validate the password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // Generate access and refresh tokens
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);

    // Fetch the logged in user details excluding password and refresh token fields
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    // Send the response with the user details and tokens
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {user: loggedInUser, accessToken, refreshToken},
            "User logged In Successfully"
        )
    );
});

// Function to log out a user
const logoutUser = asyncHandler(async(req, res) => {
    // Remove the refresh token from the user's record
    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 }},
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    // Clear the access and refresh tokens from cookies
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

// Function to refresh the access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try {
        // Verify the incoming refresh token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Find the user by ID from the decoded token
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        // Generate new access and refresh tokens
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id);

        // Send the response with the new tokens
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

// Function to change the current password
const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    console.log(oldPassword, newPassword)
    // Find the user by ID
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    // Update the password and save
    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Function to get the current user details
const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

// Function to update account details
const updateAccountDetails = asyncHandler(async(req, res) => {
    const { email} = req.body;
    
    // console.log(email,req.body)
    if (!email) {
        throw new ApiError(400, "All fields are required");
    }

    // Update the user details and return the updated user
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: {email: email }},
        { new: true }
    ).select("-password");

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

// Export all the functions as module exports
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails
};
