const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    bio: { type: String },
    highestEducation: { type: String },
    highestEducationMajor: { type: String },
    workStatus: { type: String },
    company: { type: String },
    workLocation: { type: String },
    interests: [String],
    profileImage: { type: String },
    motherName: { type: String },
    fatherName: { type: String },
    nativePlace: { type: String },
    preference: { type: String },
    agePreference: { type: String },
    educationPreference: { type: String },
    workPreference: { type: String },
    mustHaveTraits: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
