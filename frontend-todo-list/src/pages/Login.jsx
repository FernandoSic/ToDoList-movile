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

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
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

        try {
        await login(form);
        navigate('/');
        } catch (err) {
        setError(err.response?.data?.message || 'Error al iniciar sesión');
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
                Iniciar sesión
                </Typography>

                {error && (
                <Typography color="error" textAlign="center" mb={2}>
                    {error}
                </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit}>
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

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Entrar
                </Button>

                <Button
                    variant="text"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => navigate('/register')}
                >
                    ¿No tienes cuenta? Regístrate
                </Button>
                </Box>
            </Card>
            </Box>
        </Container>
        </>
    );
}

