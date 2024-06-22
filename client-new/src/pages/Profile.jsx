import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { AlertTriangle, ArrowRight, X } from "lucide-react";
import ShowUserProfile from "../components/ShowUserProfile";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const routeChange = (path) => {
    // let path = `/login`;
    navigate(path);
  };

  useEffect(() => {
    // console.log("user",user)
    if (!user) return; // Ensure there is a user provided

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BUSINESS_API_URL}/api/v1/userprofile/getuserprofile`,
          // `http://localhost:6005/api/v1/userprofile/getuserprofile`,
          { withCredentials: true }
        );
        // console.log(response);
        // console.log(response.response);
        if (response?.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // console.log("data",response.data.data)
        const { data } = response;
        // console.log("data",data.statusCode);
        // const data = await response.json();
        if (data?.statusCode != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const profile = data.data;
        // console.log("profile",profile)
        // console.log("data",data)
        setUserProfile(profile);
        setError(null); // Reset error state if previous fetch had errors
      } catch (e) {
        // setError("Failed to fetch user profile",e.response.data);
        if (e.response?.status === 404) {
          // console.log('ferbib',e.response.data.message);
          // setError(e.response.data.message)
        } else {
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
  if (!userProfile)
    return (
      <div>
        <div
          class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div class="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p class="font-bold">Please create your profile.</p>
              <p class="text-sm">
                Make sure you know how these changes affect you.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={() => {
              routeChange("/create-profile");
            }}
            className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
          >
            Button Text
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={() => {
              routeChange("/change-password");
            }}
            className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
          >
            Change Password
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  // JSON.stringify(error.data, null, 2)
  return (
    <div>
      <ShowUserProfile userProfile={userProfile} />
      <div className="mt-4 space-y-4">
        <button
          type="button"
          onClick={() => {
            routeChange("/change-password");
          }}
          className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
        >
          Change Password
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
