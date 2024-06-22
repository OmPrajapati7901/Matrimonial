import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API_URL}/api/v1/users/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      const { data } = response;
      console.log("response from change password", data);
      if (data.success) {
        navigate("/signin");
      } else {
        alert("Something went wrong", data);
      }
    } catch (error) {
      console.log("Change Password API error", error);
    }
  };

  return (
    <form onSubmit={handleChangePassword} action="#" method="POST" className="mt-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="oldPassword" className="text-base font-medium text-gray-900">
            Current Password
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Current Password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setoldPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="newPassword" className="text-base font-medium text-gray-900">
            New Password
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="New Password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="confirmNewPassword" className="text-base font-medium text-gray-900">
            Confirm New Password
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Confirm New Password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
          >
            Change Password <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
