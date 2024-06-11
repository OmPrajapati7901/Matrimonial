import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../form/ProfileForm";

const CreateProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    bio: "",
    highestEducation: "",
    highestEducationMajor: "",
    workStatus: "",
    company: "",
    workLocation: "",
    interests: "",
    profileImage: "",
    motherName: "",
    fatherName: "",
    nativePlace: "",
    preference: "",
    agePreference: "",
    educationPreference: "",
    workPreference: "",
    mustHaveTraits: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedformData = {
        ...formData,
        email: user.email,
        username: user.username,
        interests: formData.interests.split(","),
        mustHaveTraits: formData.mustHaveTraits.split(","),
      };
      console.log("formData on handleSubmit", updatedformData);
      const response = await axios.post(
        `${process.env.REACT_APP_BUSINESS_API_URL}/api/v1/userprofile/create-userprofile`,
        updatedformData,
        { withCredentials: true }
      );
      console.log(response.data);
      console.log(response);
      navigate("/profile", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Responsive Form
          </h2>
          <p className="text-gray-500 mb-6">
            Form is mobile responsive. Give it a try.
          </p>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              <div className="lg:col-span-2">
                <ProfileForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
