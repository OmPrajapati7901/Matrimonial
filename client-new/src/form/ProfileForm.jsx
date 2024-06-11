import React from 'react';

const ProfileForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
      <div className="md:col-span-5">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          name="dob"
          id="dob"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="gender">Gender</label>
        <input
          type="text"
          name="gender"
          id="gender"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.gender}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="addressLine1">Address Line 1</label>
        <input
          type="text"
          name="addressLine1"
          id="addressLine1"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.addressLine1}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="addressLine2">Address Line 2</label>
        <input
          type="text"
          name="addressLine2"
          id="addressLine2"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.addressLine2}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="state">State</label>
        <input
          type="text"
          name="state"
          id="state"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-1">
        <label htmlFor="zip">Zip</label>
        <input
          type="text"
          name="zip"
          id="zip"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.zip}
          onChange={handleChange}
          required
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          id="bio"
          className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="md:col-span-5">
        <label htmlFor="highestEducation">Highest Education</label>
        <input
          type="text"
          name="highestEducation"
          id="highestEducation"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.highestEducation}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="highestEducationMajor">Highest Education Major</label>
        <input
          type="text"
          name="highestEducationMajor"
          id="highestEducationMajor"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.highestEducationMajor}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="workStatus">Work Status</label>
        <input
          type="text"
          name="workStatus"
          id="workStatus"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.workStatus}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          name="company"
          id="company"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="workLocation">Work Location</label>
        <input
          type="text"
          name="workLocation"
          id="workLocation"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.workLocation}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="interests">Interests (comma separated)</label>
        <input
          type="text"
          name="interests"
          id="interests"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.interests}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="profileImage">Profile Image URL</label>
        <input
          type="text"
          name="profileImage"
          id="profileImage"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.profileImage}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="motherName">Mother's Name</label>
        <input
          type="text"
          name="motherName"
          id="motherName"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.motherName}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="fatherName">Father's Name</label>
        <input
          type="text"
          name="fatherName"
          id="fatherName"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.fatherName}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="nativePlace">Native Place</label>
        <input
          type="text"
          name="nativePlace"
          id="nativePlace"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.nativePlace}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="preference">Preference</label>
        <input
          type="text"
          name="preference"
          id="preference"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.preference}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="agePreference">Age Preference</label>
        <input
          type="text"
          name="agePreference"
          id="agePreference"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.agePreference}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="educationPreference">Education Preference</label>
        <input
          type="text"
          name="educationPreference"
          id="educationPreference"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.educationPreference}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="workPreference">Work Preference</label>
        <input
          type="text"
          name="workPreference"
          id="workPreference"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.workPreference}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5">
        <label htmlFor="mustHaveTraits">Must Have Traits (comma separated)</label>
        <input
          type="text"
          name="mustHaveTraits"
          id="mustHaveTraits"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={formData.mustHaveTraits}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-5 text-right">
        <div className="inline-flex items-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
