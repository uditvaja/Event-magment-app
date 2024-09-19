import { createContext, useState, useEffect } from 'react';
import API from '../utils/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.get('/users   ')
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/users/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const register = async (username, email, password) => {
    const { data } = await API.post('/users/register', { username, email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
