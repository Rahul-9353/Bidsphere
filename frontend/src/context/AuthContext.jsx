import React, { createContext, useContext, useState } from 'react'
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('bidsphere-user');
        return stored ? JSON.parse(stored) : null;
    });

    const login = async (username, password) => {
        const response = await axiosClient.post('/users/login', { username, password });
        const { token, username: returnedUsername, role } = response.data;

        localStorage.setItem('bidsphere-token', token);
        const userData = { username: returnedUsername, role };
        localStorage.setItem('bidsphere-user', JSON.stringify(userData));
        setUser(userData);

        return userData;
    };

    const register = async (formData) => {
        const response = await axiosClient.post('/users/register', formData);
        const { token, username: returnedUsername, role } = response.data;

        localStorage.setItem('bidsphere-token', token);
        const userData = { username: returnedUsername, role };
        localStorage.setItem('bidsphere-user', JSON.stringify(userData));
        setUser(userData);

        return userData;
    };

    const logout = () => {
        localStorage.removeItem('bidsphere-token');
        localStorage.removeItem('bidsphere-user');
        setUser(null);
    };

  return (
   <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
    {children}
   </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext);
}
