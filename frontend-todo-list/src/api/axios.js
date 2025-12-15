import axios from 'axios';

// CAMBIO 4 APLICADO: Configurar axios para enviar cookies automáticamente
// Usa VITE_API_URL del .env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true  
});

export default api;