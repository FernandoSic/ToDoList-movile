// Vulnerabilidad 4: EXPOSICIÓN DE TOKEN EN localStorage (XSS - Cross-Site Scripting)

// Cambio: Modificar backend para enviar token en httpOnly cookie; eliminar saveAuth/getToken del frontend (axios usa cookies automáticamente)
// Por qué: Token no accesible a JavaScript; protege contra robo por XSS; 
// Cómo mitigará: Atacante XSS no podrá leer localStorage; cookie solo se envía en requests HTTP automáticos, no accesible a JS malicioso
// Tiempo estimado: 20 minutos
// Archivos a modificar: 3 (auth.controller.js backend, auth.middleware.js backend, storage.js frontend)
// Responsable: Fernando Jose Sic
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
