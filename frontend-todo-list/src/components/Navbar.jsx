import { Paper, BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getValueFromPath = () => {
        if (location.pathname === '/tasks/add' || location.pathname === '/add-task') return 'add';
        if (location.pathname === '/tasks' || location.pathname.startsWith('/tasks/')) return 'tasks';
        if (location.pathname === '/' ) return 'home';
    };

    return (
        <Paper
        sx={{
            position: 'fixed',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: '94%', sm: '90%' },
            maxWidth: 420,
            borderRadius: 6,
            boxShadow: 8,
            zIndex: 1000,
            pb: 'env(safe-area-inset-bottom)',
            background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.95) 0%, rgba(57, 73, 171, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
        }}
        elevation={3}
        >
        <BottomNavigation
            showLabels
            value={getValueFromPath()}
            onChange={(event, newValue) => {
            if (newValue === 'tasks') navigate('/tasks');
            if (newValue === 'home') navigate('/');
            if (newValue === 'add') navigate('/tasks/add');
            }}
            sx={{
                background: 'transparent',
                '& .MuiBottomNavigationAction-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 700,
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    '&.Mui-selected': {
                        color: '#fff',
                        fontWeight: 800,
                    }
                }
            }}
        >
            <BottomNavigationAction
            label="Tareas"
            value="tasks"
            icon={<ListIcon />}
            />
            <BottomNavigationAction
            label="Inicio"
            value="home"
            icon={<HomeIcon />}
            />
            <BottomNavigationAction
            label="Crear"
            value="add"
            icon={<AddCircleIcon />}
            />
        </BottomNavigation>
        </Paper>
    );
}
