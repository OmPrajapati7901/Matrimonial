import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { AppContext } from '../contexts/AppContext';
import { checkAuth } from './auth';

const Headers = () => {
    const value = useContext(AppContext);
    const [userdata, setUserdata] = useState({});
    console.log("response", userdata)
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // const getUser = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

    //         setUserdata(response.data.user)
    //         value.setuserData(response.data.user)
    //     } catch (error) {
    //         console.log("error", error)
    //     }
    // }
    // useEffect(() => {
    //     getUser()
    // }, [])

    // logout
    const logout = () => {
        window.open("http://localhost:6005/auth/logout", "_self")
    }


    const verifyUser = async () => {
        const authenticatedUser = await checkAuth();
        if (!authenticatedUser) {
            // history.push('/login');
            // navigate("*")
            console.log("not authenticatedUser")
        } else {
            setUser(authenticatedUser);
               setUserdata(authenticatedUser)
     value.setuserData(authenticatedUser)
        }
    };
    
    
      useEffect(() => {
      
        verifyUser();
    }, []);
    return (
        <>
            {/* <header>
                <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                    <div className="left">
                        <h1 className="text-2xl font-bold">Matrimonial</h1>
                    </div>
                    <div className="right">
                        <ul className="flex space-x-4">
                            <li>
                                <NavLink to="/" className="hover:text-gray-300">
                                    Home
                                </NavLink>
                            </li>
                            {Object?.keys(userdata)?.length > 0 ? (
                                <>
                                    <li className="text-black font-bold">{userdata?.displayName}</li>
                                    <li>
                                        <NavLink to="/dashboard" className="hover:text-gray-300">
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li onClick={logout} className="cursor-pointer hover:text-gray-300">Logout</li>
                                    <li>
                                        <img src={userdata?.image} className="w-12 h-12 rounded-full" alt="User" />
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <NavLink to="/login" className="hover:text-gray-300">
                                        Login
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </header> */}
            <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl">Tailblocks</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <NavLink to="/" className="mr-5 hover:text-gray-900">Home</NavLink>
      <NavLink to="/second" className="mr-5 hover:text-gray-900">Second Link</NavLink>
      <NavLink to="/third" className="mr-5 hover:text-gray-900">Third Link</NavLink>
      <NavLink to="/fourth" className="mr-5 hover:text-gray-900">Fourth Link</NavLink>
    </nav>
    {Object?.keys(userdata)?.length > 0 ? (
      <div className="flex items-center">
        <span className="mr-5 text-black font-bold">{userdata?.displayName}</span>
        <NavLink to="/dashboard" className="mr-5 hover:text-gray-900">Dashboard</NavLink>
        <span onClick={logout} className="mr-5 cursor-pointer hover:text-gray-900">Logout</span>
        <img src={userdata?.image} className="w-12 h-12 rounded-full" alt="User" />
      </div>
    ) : (
      <NavLink to="/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </NavLink>
    )}
  </div>
</header>

        </>
    )
}

export default Headers;
