const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Vulnerabilidad 1: FALTA DE VALIDACIÓN DE ENTRADA
// Definición: No validar formato/longitud de inputs (email, password). Acepta cualquier cadena sin verificar reglas de negocio.
// Repercusiones: Credenciales débiles, inyecciones de código, datos malformados en BD, facilita fuerza bruta.
// Mitigación: Usar librería validator, aplicar regex, establecer min/max longitud, sanitizar entradas.
// Práctica de seguridad aplicable: WHITELIST Y BLACKLIST
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //Vulnerabilidad 2: ENUMERACIÓN DE USUARIOS
        // Definición: Mensajes diferenciados que revelan si un email está registrado en el sistema.
        // Repercusiones: Atacante descubre usuarios válidos, construye directorio, facilita phishing dirigido y credential stuffing.
        // Mitigación: Usar mensajes genéricos para todos los errores de autenticación/registro.
        // Práctica de seguridad aplicable: PRIVACIDAD VISUAL, DATOS SENSIBLES OCULTOS
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' }); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { register, login };
