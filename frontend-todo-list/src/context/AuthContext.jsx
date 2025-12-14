import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest } from '../api/auth.api';
import { saveAuth, getToken, getUser, clearAuth } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = getToken();
        const storedUser = getUser();

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const res = await loginRequest(credentials);
        saveAuth(res.data.token, res.data.user);
        setToken(res.data.token);
        setUser(res.data.user);
    };
    const register = async (data) => {
        await registerRequest(data);
    };

    const logout = () => {
        clearAuth();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuth: !!token,
                login,
                logout,
                loading,
                register,
            }}
            >
            {children}
        </AuthContext.Provider>
        );
    };

export const useAuth = () => useContext(AuthContext);