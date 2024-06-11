import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';


const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API_URL}/api/v1/users/login`,
        { email, password },
        { withCredentials: true }
      );
      const { data } = response;
      if (data.success) {
        await login(data.data.user);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log('Login API error');
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin} action="#" method="POST" className="mt-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="text-base font-medium text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-base font-medium text-gray-900">
              Password
            </label>
            <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
          >
            Get started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SigninForm;
