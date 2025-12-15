const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Vulnerabilidad 1: FALTA DE VALIDACIÓN DE ENTRADA
// Cambio: Agregar validación de email y password con librería 'validator'
// Por qué: Evita credenciales inválidas y débiles; mitiga fuerza bruta y ataques de inyección
// Cómo mitigará: Solo aceptará emails con formato válido y passwords con 8+ caracteres, 1 mayúscula y 1 número
// Tiempo estimado: 10 minutos
// Archivos a modificar: 1 (auth.controller.js)
// Responsable: Fernando Jose Sic
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //Vulnerabilidad 2: ENUMERACIÓN DE USUARIOS
        // Cambio: Reemplazar mensaje específico "El usuario ya existe" por mensaje genérico "Error en el registro"
        // Por qué: Oculta información sensible; evita que atacantes descubran emails válidos
        // Cómo mitigará: Atacante no podrá enumerar usuarios; todos los errores verán el mismo mensaje genérico
        // Tiempo estimado: 2 minutos
        // Archivos a modificar: 1 (auth.controller.js)
        // Responsable: Fernando Joñse Sic
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
