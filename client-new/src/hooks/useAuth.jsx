import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/profile");
  };

  // call this function to sign out logged in user
  const logout = async () => {
    try {
      console.log(
        "process.env.REACT_APP_AUTH_API_URL",
        process.env.REACT_APP_AUTH_API_URL
      );
      // const response = await axios.post(
      //   `${process.env.REACT_APP_AUTH_API_URL}/api/v1/users/logout`,
      //   {},
      //   { withCredentials: true }
      // );
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API_URL}/api/v1/users/logout`,
        {}, // Empty data object
        { withCredentials: true } // Configuration object
      );
      // console.log(response);
      if (response.status === 200) {
        setUser(null);
        navigate("/", { replace: true });
        console.log("User Logged out");
      } else {
        console.log("Something wrong please try again!");
      }
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
