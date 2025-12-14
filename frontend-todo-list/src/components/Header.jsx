import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, useMediaQuery, useTheme } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROUTE_TITLES = {
    '/': 'Inicio',
    '/tasks': 'Mis tareas',
    '/tasks/add': 'Crear tarea',
    '/add-task': 'Crear tarea',
    'default': 'Detalles'
};

const getTitle = (pathname) => {
    return ROUTE_TITLES[pathname] || (pathname.startsWith('/tasks/') ? ROUTE_TITLES.default : 'Todo App');
};

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

    const title = getTitle(location.pathname);
    const displayName = user?.username || user?.email || 'Usuario';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" elevation={8} sx={{ background: 'linear-gradient(135deg, #1e88e5 0%, #3949ab 100%)' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: isMobile ? 0.75 : 1, px: { xs: 1, sm: 3 } }}>
                <Box display="flex" alignItems="center" gap={1} flex={1} minWidth={0}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: '#fff', color: '#1e88e5', fontWeight: 700, flexShrink: 0 }}>
                        {displayName.charAt(0).toUpperCase()}
                    </Avatar>
                    {!isMobile && (
                        <Typography variant="body1" fontWeight={800} noWrap>
                            {displayName}
                        </Typography>
                    )}
                </Box>

                <Typography variant={isMobile ? 'body1' : 'h5'} fontWeight={800} textAlign="center" noWrap sx={{ color: '#e3f2fd', flex: 1 }}>
                    {title}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="flex-end" flex={1}>
                    <IconButton 
                        color="inherit" 
                        onClick={handleLogout} 
                        sx={{ 
                            p: 0.5,
                            border: isMobile ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
                            borderRadius: '50%'
                        }} 
                        title="Cerrar sesión"
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}