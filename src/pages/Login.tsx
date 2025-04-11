import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { LoginCredentials } from '../types';
import { ShoppingBag } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      setToken(data.token);
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 transition-all duration-300 hover:shadow-2xl">
    <div className="text-center">
      <ShoppingBag className="mx-auto h-12 w-12 text-blue-600" />
      <h2 className="mt-4 mb-4 text-2xl  font-bold text-gray-800">
        Login to your account
      </h2>
      <p className="mt-1 flex flex-col  justify-center text-sm text-gray-500">
        <p><b>User name:</b> johnd </p>
        <p><b>Password:</b> m38rmF$ </p>
      </p>
    </div>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
        >
          {isLoading && (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          )}
          {!isLoading && <span>Sign in</span>}
        </button>
      </div>
    </form>
  </div>
</div>


      {/* Right Side - Image */}
      <div className="w-1/2 hidden md:block">
      <img
  src="https://images.pexels.com/photos/5632383/pexels-photo-5632383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  alt="Shopping"
  className="object-cover w-full h-full"
/>


      </div>
    </div>
  );
}
