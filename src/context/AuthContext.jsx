import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const { data } = await api.get('/user/me');
                    setUser(data);
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser(data);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
