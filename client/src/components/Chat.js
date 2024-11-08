import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${user.id}/${receiverId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [receiverId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/messages', {
        senderId: user.id,
        receiverId,
        content: newMessage
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 border-4 border-slate-500 rounded-3xl">
      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`mb-2 ${
              message.sender === user.id ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === user.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 