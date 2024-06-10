const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const UserProfile = require("../models/userProfile.model.js");


// Create a new user profile
const createUserProfile = asyncHandler(async (req, res) => {
    console.log('createUserProfile',req.body)
    const newUserProfile = new UserProfile(req.body);
    

    const createdUser =  await newUserProfile.save();

console.log(createdUser)
      if (createdUser) {
        res.status(201).send(newUserProfile);
    }

    // console.log(email, username, password)
    // Check if any of the required fields are empty
    if ([email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // // Check if the user already exists
    // const existedUser = await User.findOne({
    //     $or: [{ username }, { email }]
    // });

    // if (existedUser) {
    //     throw new ApiError(409, "User with email or username already exists");
    // }

    // // Create a new user
    // const user = await User.create({
    //     email, 
    //     password,
    //     username: username.toLowerCase()
    // });

    // // Fetch the newly created user excluding password and refresh token fields
    // const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // if (!createdUser) {
    //     throw new ApiError(500, "Something went wrong while registering the user");
    // }

    // // Send the response with the created user details
    // return res.status(201).json(
    //     new ApiResponse(200, createdUser, "User registered Successfully")
    // );
});

const getUserProfile = asyncHandler(async (req, res) => {

    // await User.findOne({
    //     $or: [{ username }, { email }]
    // });

    console.log('getUserProfile',req.user.email)
    const email=req.user.email
    const userProfile = await UserProfile.findOne({ email });
    console.log(userProfile)
    if (!userProfile) {
        throw new ApiError(404, "Please your create profile");
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200, userProfile, "User Profile fetched successfully"));

//     const newUserProfile = new UserProfile(req.body);
    

//     const createdUser =  await newUserProfile.save();

// console.log(createdUser)
//       if (createdUser) {
//         res.status(201).send(newUserProfile);
//     }

//     // console.log(email, username, password)
//     // Check if any of the required fields are empty
//     if ([email, username, password].some((field) => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

});


module.exports = {
    createUserProfile,
    getUserProfile
};
