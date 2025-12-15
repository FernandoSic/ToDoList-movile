// Vulnerabilidad 4: EXPOSICIÓN DE TOKEN EN localStorage (XSS - Cross-Site Scripting)
// Definición: Guardar JWT en localStorage, accesible a cualquier script JS en la página.
// Repercusiones: Un ataque XSS roba token instantáneamente, session hijacking completo, impersonación de usuario, acceso total a datos.
// Mitigación: Almacenar token en cookie httpOnly/Secure/SameSite (inaccesible a JS), usar validación de autenticación en backend.
// Práctica de seguridad aplicable: PRIVACIDAD VISUAL (token oculto en httpOnly cookie) + COOKIES (httpOnly/Secure/SameSite).
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const saveAuth = (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = () =>
    localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};
