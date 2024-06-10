import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user, logout } = useAuth();

  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return; // Ensure there is a user provided

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:6005/api/v1/userprofile/getuserprofile`,
          { withCredentials: true }
        );
        console.log(response.status);
        if (response.status!=200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserProfile(data);
        setError(null); // Reset error state if previous fetch had errors
      } catch (e) {
        // setError("Failed to fetch user profile",e.response.data);
        if(e.response.status===404){
          // console.log('ferbib',e.response.data.message);
          // setError(e.response.data.message)
        }
        else{
        setError(e);
        }
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // This effect runs whenever the userId changes

  const handleLogout = () => {
    logout();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching profile: {error}</p>;  
  if (!userProfile) return <p>No profile found.</p>;
  // JSON.stringify(error.data, null, 2)
  return (
    <div>
      <h1>{userProfile.username}'s Profile</h1>
      <p>
        Name: {userProfile.firstName} {userProfile.lastName}
      </p>
      <p>Age: {userProfile.age}</p>
      <p>Gender: {userProfile.gender}</p>
      <p>City: {userProfile.city}</p>
      {/* Additional fields can be added here as needed */}
    </div>
  );
};

export default Profile;
