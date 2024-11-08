import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users?role=${
            user.role === "patient" ? "doctor" : "patient"
          }`
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [user.role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D0F0C0] to-[#90EE90] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#006400]">
            Hello, {user.name}!
          </h1>
          <div className="flex items-center space-x-4">
            {user.role === "patient" && (
              <Link
                to="/chatbot"
                className="px-4 py-2 bg-[#90EE90] text-[#006400] rounded-md hover:bg-[#7CFC00]"
              >
                Chat Bot
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        </div>
        <p className="text-lg mb-4 text-[#008000]">
          You are logged in as a {user.role}.
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-[#006400]">
            Available {user.role === "patient" ? "Doctors" : "Patients"}
          </h2>
          <div className="space-y-4">
            {users.map((otherUser) => (
              <div
                key={otherUser._id}
                className="flex items-center justify-between border-b-2 border-gray-500 pb-2"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {otherUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[#008000] font-medium">
                    {otherUser.name}
                  </span>
                </div>
                <Link
                  to={`/chat/${otherUser._id}`}
                  className="px-4 py-2 bg-[#90EE90] text-[#006400] rounded-md hover:bg-[#7CFC00]"
                >
                  Chat
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
