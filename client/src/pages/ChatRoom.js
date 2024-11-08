import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chat from '../components/Chat';

const ChatRoom = () => {
  const { receiverId } = useParams();
  const navigate = useNavigate();
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    // Fetch receiver details
    const fetchReceiver = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${receiverId}`);
        setReceiver(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReceiver();
  }, [receiverId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D0F0C0] to-[#90EE90] flex items-center justify-center">
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4 gap-20">
        <h2 className="text-2xl font-bold">
          Chat with {receiver?.name || 'Loading...'}
        </h2>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
      <Chat receiverId={receiverId} />
    </div>
  </div>
  
  );
};

export default ChatRoom; 