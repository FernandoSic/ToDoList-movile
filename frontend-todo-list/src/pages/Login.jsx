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
                justifyContent: 'center',
                py: 4
            }}
            >
            <Card sx={{ p: { xs: 3, sm: 4 }, width: '100%' }}>
                <Typography variant="h4" textAlign="center" gutterBottom sx={{ mb: 3 }}>
                Iniciar sesión
                </Typography>

                {error && (
                <Box sx={{ p: 2, bgcolor: 'error.light', borderRadius: 1, mb: 2 }}>
                    <Typography color="error" textAlign="center" variant="body2">
                        {error}
                    </Typography>
                </Box>
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
                    sx={{ mt: 3, mb: 2 }}
                >
                    Entrar
                </Button>

                <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/register')}
                    sx={{ borderColor: 'primary.main', color: 'primary.main' }}
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

