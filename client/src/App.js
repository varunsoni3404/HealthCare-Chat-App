import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ChatRoom from './pages/ChatRoom';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:receiverId"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App; 