"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface User {
    _id: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        const token = Cookies.get('token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await api.get('/auth/user');
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user", error);
            Cookies.remove('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = (token: string) => {
        Cookies.set('token', token, { expires: 1 }); // 1 day
        fetchUser();
        router.push('/dashboard');
        toast.success('Logged in successfully!');
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/login');
        toast.success('Logged out successfully!');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
