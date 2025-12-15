import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest } from '../api/auth.api';
import { saveAuth, getToken, getUser, clearAuth } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // CAMBIO 4 APLICADO: Ya no verificar token en localStorage
        // El token está en httpOnly cookie y se envía automáticamente
        const storedUser = getUser();

        if (storedUser) {
            setUser(storedUser);
            setToken('authenticated'); // Indicador de autenticación
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const res = await loginRequest(credentials);
        // CAMBIO 4: Solo enviar usuario (token está en httpOnly cookie)
        saveAuth(res.data.user);
        // Token viene en httpOnly cookie, no en response JSON
        setToken('authenticated'); // Indicador de que está autenticado
        setUser(res.data.user);
    };
    const register = async (credentials) => {
        const res = await registerRequest(credentials);
        // CAMBIO 4: Solo enviar usuario (token está en httpOnly cookie)
        saveAuth(res.data.user);
        // Token viene en httpOnly cookie, no en response JSON
        setToken('authenticated'); // Indicador de que está autenticado
        setUser(res.data.user);
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