import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = async ({ username, password }) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      const access_token = res.data.access_token;
      setToken(access_token);
      localStorage.setItem('token', access_token);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw new Error('Login failed');
    }
  };

  const register = async ({ username, password }) => {
    try {
      await axios.post('http://localhost:5000/auth/register', {
        username,
        password,
      });
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
