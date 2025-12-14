import { Container, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Container>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">Página Principal</Typography>
            <Button variant="contained" color="error" onClick={handleLogout}>
                Cerrar Sesión
            </Button>
        </Box>
        </Container>
    );
}
