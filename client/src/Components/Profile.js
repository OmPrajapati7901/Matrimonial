import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { checkAuth } from './auth';
import axios from 'axios';



const Profile = () => {

    const value = useContext(AppContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const API_BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL;

    
const verifyUser = async () => {
    const authenticatedUser = await checkAuth();
    if (!authenticatedUser) {
        // history.push('/login');
        navigate("*")
    } else {
        setUser(authenticatedUser);
    }
};

const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/profile/${user.email}`,
        { withCredentials: true }
      );
 
    //  console.log('sdcfasdbcvdksvbdksvdkf bnvjs',response)
    //   if (response.data) {
    //     setUserProfile(response.data);
    //   } else {
    //     setnewUser(true);
    //     console.log("nothing");
    //   }
    } catch (error) {
        if (error.response) { 
        console.error("Profile not found (404):", error.response.data);
        // console.log("User profile not found. Please ensure the email is correct.");


        }else if (error.request) {
            console.error("Failed to fetch profile:", error.response.status, error.response.data);
        }
        else {
            // Something else happened while setting up the request
            console.error("Failed to fetch profile:", error);
        }

    //   console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    verifyUser();
}, []);

useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

console.log(user)

if (!user) {
    return <div>Loading...</div>;
}

  return (
    <div>Profile

<h1>Welcome, {user.displayName}</h1>
    </div>
    
  )
}

export default Profile