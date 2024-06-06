import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { checkAuth } from './auth';


const Dashboard = () => {
  const value = useContext(AppContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


  //   const getUser = async () => {
  //     try {
  //         const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });
  
  //         console.log("response",response)
  //     } catch (error) {
  //       navigate("*")
  //     }
  // }
  
  const verifyUser = async () => {
    const authenticatedUser = await checkAuth();
    if (!authenticatedUser) {
        // history.push('/login');
        navigate("*")
    } else {
        setUser(authenticatedUser);
    }
};


  useEffect(() => {
  
    verifyUser();
}, []);


  // useEffect(() => {
  //   getUser()
  // }, [])


  if (!user) {
    return <div>Loading...</div>;
}

return (
  <div>
      <h1>Welcome, {user.displayName}</h1>
      <h2>How are you {user.isAdmin?('Admin'):('User')}</h2>
  </div>
);
}

export default Dashboard;