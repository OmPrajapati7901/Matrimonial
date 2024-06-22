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


// Age Preference and Age
// // Age Preference
// const agePreference = [
//   "18-25",
//   "26-30",
//   "31-35",
//   "36-40",
//   "41-45",
//   "46-50",
//   "51-55",
//   "56-60",
//   "61+"
// ];


// preference and gender

// // // Preference
// const preference = ["Male", "Female", "Non-binary", "Any"];

// // Gender
// const gender = ["Male", "Female", "Non-binary"];


// educationPreference and highestEducation
// // Education Preference
// const educationPreference = [
//   "High School",
//   "Associate Degree",
//   "Bachelor's Degree",
//   "Master's Degree",
//   "Doctorate",
//   "Professional Degree",
//   "Any"
// ];

// // Highest Education
// const highestEducation = [
//   "High School",
//   "Associate Degree",
//   "Bachelor's Degree",
//   "Master's Degree",
//   "Doctorate",
//   "Professional Degree"
// ];

// workPreference and workStatus
// Work Preference
// const workPreference = [
//   "Employed Full-time",
//   "Employed Part-time",
//   "Self-employed",
//   "Unemployed",
//   "Student",
//   "Retired",
//   "Not important"
// ];

// // Work Status
const workStatus = [
  "Employed Full-time",
  "Employed Part-time",
  "Self-employed",
  "Unemployed",
  "Student",
  "Retired",
  "Homemaker"
];


// possible values 
// Interests = [
//   "Traveling",
//   "Reading",
//   "Cooking",
//   "Football",
//   "Cricket",
//   "Tennis",
//   "Basketball",
//   "Classical Music",
//   "Rock Music",
//   "Pop Music",
//   "Action Movies",
//   "Romance Movies",
//   "Comedy Movies",
//   "Drama Movies",
//   "Hiking",
//   "Camping",
//   "Fishing",
//   "Gym",
//   "Yoga",
//   "Running",
//   "Arts and Crafts",
//   "Photography",
//   "Gaming",
//   "Gardening",
//   "Dancing",
//   "Volunteering",
//   "Pet Lover",
//   "Fashion",
//   "DIY Projects"
// ]


// mustHaveTraits= [
//   "Honesty",
//   "Loyalty",
//   "Respectful",
//   "Family-Oriented",
//   "Career-Focused",
//   "Financial Stability",
//   "Compassionate",
//   "Sense of Humor",
//   "Ambitious",
//   "Kindness",
//   "Patience",
//   "Intelligence",
//   "Good Communication",
//   "Open-Minded",
//   "Trustworthiness",
//   "Vegetarian",
//   "Non-Smoker",
//   "Non-Drinker",
//   "Spiritual",
//   "Non-religious"
// ]
