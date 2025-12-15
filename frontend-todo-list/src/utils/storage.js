// Vulnerabilidad 4: EXPOSICIÓN DE TOKEN EN localStorage (XSS - Cross-Site Scripting)

// CAMBIO 4 APLICADO: localStorage ELIMINADO
// El token ahora se almacena automáticamente en httpOnly cookie por el backend
// Solo guardamos datos del usuario (sin token) en localStorage para UI (avatar, nombre, etc)

const USER_KEY = 'user';

export const saveAuth = (user) => {
    // CAMBIO 4: Solo guardar usuario
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = () => {
    // CAMBIO 4: Token no es accesible desde frontend
    // Se envía automáticamente por el navegador en cada request HTTP
    return null;
};

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
    localStorage.removeItem(USER_KEY);
    // Cookie se limpia automáticamente al logout 
};
