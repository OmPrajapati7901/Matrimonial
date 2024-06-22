// routes/match.js

const express = require("express");
const router = express.Router();
const UserProfile = require("../models/userProfile.model.js");
const asyncHandler = require("../utils/asyncHandler.js");

// A simple testing function to verify the route is working
const testing = (req, res) => {
  res.send("match route with controller is working");
};

// Function to check if age falls within the specified range
const ageInRange = (age, range, profileemail, userProfileemail) => {
  const [min, max] = range.split("-").map(Number);
  if (range === "61+") return age >= 61;
  return age >= min && age <= max;
};

// Function to check if gender matches user preference
const genderMatches = (userPreference, matchGender) => {
  return userPreference === "Any" || userPreference === matchGender;
};

// Function to check if education matches user preference
const educationMatches = (userPreference, matchEducation) => {
  return userPreference === "Any" || userPreference === matchEducation;
};

// Function to check if work status matches user preference
const workMatches = (userPreference, matchWork) => {
  return userPreference === "Any" || userPreference === matchWork;
};

// Function to calculate similarity score between user and match profiles
const calculateSimilarityScore = (user, match) => {
  // Helper function to find common elements in two arrays
  const intersect = (a, b) => a.filter((value) => b.includes(value));

  const interestScore =
    intersect(user.interests, match.interests).length / user.interests.length;
  const traitScore =
    intersect(user.mustHaveTraits, match.mustHaveTraits).length /
    user.mustHaveTraits.length;

  return (interestScore + traitScore) / 2;
};

// Main function to handle matching logic
const match = asyncHandler(async (req, res) => {
  // Extract user email from request
  const email = req.user.email;
  // Find user profile based on email
  const userProfile = await UserProfile.findOne({ email: email });

  // If user profile is not found, respond with 404
  if (!userProfile) {
    return res.status(404).json({ message: "User not found" });
  }

  // Find all other profiles except the current user profile
  const profiles = await UserProfile.find({ _id: { $ne: userProfile._id } });

  // Filter profiles based on various criteria and calculate similarity scores
  let filteredByAge = profiles.filter((profile) =>
    ageInRange(
      profile.age, // Age of the profile being checked
      userProfile.agePreference, // Age preference range of the user
      profile.email, // Email of the profile being checked (unused in function but kept for context)
      userProfile.email // Email of the user (unused in function but kept for context)
    )
  );

  let filteredByGender = filteredByAge.filter((profile) =>
    genderMatches(
      userProfile.preference, // Gender preference of the user
      profile.gender // Gender of the profile being checked
    )
  );

  let filteredByEducation = filteredByGender.filter((profile) =>
    educationMatches(
      userProfile.educationPreference, // Education preference of the user
      profile.highestEducation // Highest education level of the profile being checked
    )
  );

  let filteredByWork = filteredByEducation.filter((profile) =>
    workMatches(
      userProfile.workPreference, // Work status preference of the user
      profile.workStatus // Work status of the profile being checked
    )
  );

  let mappedWithScore = filteredByWork.map((profile) => {
    const score = calculateSimilarityScore(userProfile, profile); // Calculate similarity score between user and profile
    return {
      profile, // Include the profile in the result
      score, // Include the calculated similarity score
    };
  });

  const matches = mappedWithScore.sort((a, b) => b.score - a.score);

  // Log the matches after filtering
  console.log("after filter");
  console.log(matches);

  // Send the matched profiles as response
  res.send(matches);
});

// Export the testing and match functions
module.exports = {
  testing,
  match,
};
