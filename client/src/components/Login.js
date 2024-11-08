import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D0F0C0] to-[#90EE90]">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-[#006400] mb-6">
          Welcome to our Healthcare App
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-[#008000] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-[#90EE90] rounded-md focus:outline-none focus:ring focus:ring-[#90EE90]"
              required
              />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#008000] font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-[#90EE90] rounded-md focus:outline-none focus:ring focus:ring-[#90EE90]"
              required
              />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#90EE90] text-white rounded-md hover:bg-[#7CFC00] transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-[#008000]">
          Don't have an account?{' '}
          <a href="/register" className="text-[#006400] font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};



export default Login;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', {
//         email,
//         password
//       });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       navigate('/dashboard');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8">
//         <h1 className="text-2xl font-bold text-center">Login</h1>
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="w-full px-3 py-2 border rounded-md"
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="w-full px-3 py-2 border rounded-md"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
//           >
//             Login
//           </button>
//         </form>
//         <a href="/register" className="text-blue-600 text-center block">
//           Don't have an account? Register here
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Login; 