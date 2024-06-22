const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const UserProfile = require("../models/userProfile.model.js");

// Create a new user profile
const createUserProfile = asyncHandler(async (req, res) => {
  // console.log('createUserProfile',req.body)
  // const newUserProfile = new UserProfile(req.body);

    console.log("getUserProfile", req.user.email);
    const email = req.user.email;
    const userProfile = await UserProfile.findOne({ email });

    console.log(userProfile);
    if (userProfile) {
      console.log("inside Profile already exist ");
      throw new ApiError(403, "Profile already exist");
    }
    
    console.log("email",email)
    console.log("req.body",req.body)
    if(email!=req.body.email)
        {
            throw new ApiError(401, "Please ensure the email entered matches the email used to create the account.");
        }

    const createdUser = await UserProfile.create(req.body);
    console.log("created user", createdUser);

    if (!createdUser) {
        throw new ApiError(403, "Somethinf went wrong while creating user");
      }

    if (createdUser) {
      res.status(201).send(createdUser);
    }

  // return res.status(200).send(createdUser);
});

const getUserProfile = asyncHandler(async (req, res) => {
  // await User.findOne({
  //     $or: [{ username }, { email }]
  // });

  console.log("getUserProfile", req.user.email);
  const email = req.user.email;
  const userProfile = await UserProfile.findOne({ email });
  console.log(userProfile);
  if (!userProfile) {
    throw new ApiError(404, "Please your create profile");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userProfile, "User Profile fetched successfully")
    );

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





// // Create a new user profile
// const updateUserProfile = asyncHandler(async (req, res) => {
//   // console.log('createUserProfile',req.body)
//   // const newUserProfile = new UserProfile(req.body);

//   try {

//     const email = req.user.email;

//     if(email!=req.body.email)
//       {
//           throw new ApiError(401, "Please ensure the email entered matches the email used to create the account.");
//       }


//     const userProfile = await UserProfile.findOneAndUpdate(
//       { email: req.body.email },
//       req.body,
//       { new: true }

//     );
//     if (!userProfile) return res.status(404).json({ statusCode: 404, message: 'User not found' });
//     res.status(200).json({ statusCode: 200, data: userProfile });
//   } catch (error) {
//     res.status(500).json({ statusCode: 500, message: error.message });
//   }


// //
//     console.log("getUserProfile", req.user.email);
//     const email = req.user.email;
//     const userProfile = await UserProfile.findOne({ email });

//     console.log(userProfile);
//     if (userProfile) {
//       console.log("inside Profile already exist ");
//       throw new ApiError(403, "Profile already exist");
//     }
    
//     console.log("email",email)
//     console.log("req.body",req.body)
//     if(email!=req.body.email)
//         {
//             throw new ApiError(401, "Please ensure the email entered matches the email used to create the account.");
//         }

//     const createdUser = await UserProfile.create(req.body);
//     console.log("created user", createdUser);

//     if (!createdUser) {
//         throw new ApiError(403, "Somethinf went wrong while creating user");
//       }

//     if (createdUser) {
//       res.status(201).send(createdUser);
//     }

//   // return res.status(200).send(createdUser);
//   //
// });

module.exports = {
  createUserProfile,
  getUserProfile,
};
