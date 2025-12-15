const jwt = require('jsonwebtoken');

// CAMBIO 4 APLICADO: Extraer token de cookie en lugar de header
module.exports = (req, res, next) => {
    try {
        // Intentar obtener token de cookie (nuevo método seguro)
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token no válido o expirado' });
    }
};
