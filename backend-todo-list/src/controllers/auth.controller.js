const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

//Vulnerabilidad 1: FALTA DE VALIDACIÓN DE ENTRADA
// Cambio: Agregar validación de email y password con librería 'validator'

// CAMBIO 1 APLICADO:
// Función helper para validar password: mínimo 8 caracteres, 1 mayúscula, 1 número
const isStrongPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // CAMBIO 1 APLICADO: VALIDACIÓN DE ENTRADA (WHITELIST)
        // Validar que email sea válido
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Error en el registro. Intenta de nuevo' });
        }
        
        // Validar que password sea fuerte: 8+ chars, 1 mayúscula, 1 número
        if (!isStrongPassword(password)) {
            return res.status(400).json({ message: 'Error en el registro. Intenta de nuevo' });
        }
        
        //Vulnerabilidad 2: ENUMERACIÓN DE USUARIOS
        // Cambio: Reemplazar mensaje específico "El usuario ya existe" por mensaje genérico "Error en el registro"
        
        
        // CAMBIO 2 APLICADO: PRIVACIDAD VISUAL - Mensaje genérico
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Error en el registro. Intenta de nuevo' }); 
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

        // CAMBIO 4 APLICADO: TOKEN EN httpOnly COOKIE
        // sameSite: 'Lax' permite enviar cookie en requests cross-origin de mismo sitio
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,      // true solo en HTTPS producción
            sameSite: 'Lax',    
            maxAge: 86400000    // 1 día
        });

        res.status(201).json({
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

        // CAMBIO 1: Validar email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' }); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' }); // CAMBIO 2: mensaje genérico
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // CAMBIO 4 APLICADO: TOKEN EN httpOnly COOKIE
        // sameSite: 'Lax' permite enviar cookie en requests cross-origin
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 86400000
        });

        // No devolver token en JSON, solo datos de usuario
        res.status(201).json({
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
