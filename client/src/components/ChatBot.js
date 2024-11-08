import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ChatBot() {
  const [messages, setMessages] = useState([
    { id: Date.now(), text: "Hi, how may I help you?", isBot: true },
    {
      id: Date.now() + 1,
      text: "If it's your first time, fill out this form",
      isBot: true,
      link: "https://docs.google.com/forms/d/e/1FAIpQLSfnNhbs6vHAcpi1IEIgj4o_FJLHRMARh0tGNdXwkEY5yo72IA/viewform?pli=1",
    },
  ]);

  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    const userMessage = { id: Date.now(), text: userInput, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/get-gemini-response",
        { userInput: userInput }
      );

      const botResponse = {
        id: Date.now(),
        text: response.data.answer,
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
      const errorMessage = {
        id: Date.now(),
        text: "Sorry, I'm having trouble retrieving information right now.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-200 to-green-50 w-full h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-3xl mx-auto border border-green-300">
        <div className="flex justify-between items-center gap-5">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
            Healthcare Assistant
          </h2>
          <Link
            to="/dashboard"
            className="text-2xl font-semibold text-green-700 mb-4 text-center"
          >
            Dashboard
          </Link>
        </div>
        <div className="overflow-y-auto max-h-80 mb-4 p-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`my-2 p-3 rounded-xl shadow-inner ${
                msg.isBot
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.link ? (
                <a
                  href={msg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-medium underline"
                >
                  {msg.text}
                </a>
              ) : (
                msg.text
              )}
            </div>
          ))}
          {loading && (
            <div className="my-2 p-3 rounded-xl bg-gray-200 text-gray-600 italic">
              Generating response...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex mt-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 flex-grow focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg ml-2 transition duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
