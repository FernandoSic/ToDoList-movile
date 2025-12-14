import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    Container,
    CssBaseline,
    TextField,
    Typography
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.username || !form.email || !form.password || !form.confirmPassword) {
        setError('Todos los campos son obligatorios');
        return;
        }

        if (form.password !== form.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
        }

        try {
        await register({
            username: form.username,
            email: form.email,
            password: form.password
        });
        navigate('/login');
        } catch (err) {
        setError(err.response?.data?.message || 'Error al registrarse');
        }
    };

    return (
        <>
        <CssBaseline />
        <Container maxWidth="sm">
            <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
            <Card sx={{ p: 4, width: '100%' }}>
                <Typography variant="h4" textAlign="center" gutterBottom>
                Registro
                </Typography>

                {error && (
                <Typography color="error" textAlign="center" mb={2}>
                    {error}
                </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    fullWidth
                    margin="normal"
                    required
                    value={form.username}
                    onChange={handleChange}
                />

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                    value={form.email}
                    onChange={handleChange}
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    value={form.password}
                    onChange={handleChange}
                />

                <TextField
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Registrarse
                </Button>

                <Button
                    variant="text"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => navigate('/login')}
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </Button>
                </Box>
            </Card>
            </Box>
        </Container>
        </>
    );
}
