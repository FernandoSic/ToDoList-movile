
import { useEffect, useState } from 'react';
import { Box, Typography, Card, Stack, CircularProgress, Chip } from '@mui/material';
import { getTasksRequest } from '../api/task.api';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTasks = async () => {
        try {
        const res = await getTasksRequest();
        setTasks(res.data);
        } catch (error) {
        console.error('Error al cargar tareas', error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <Box sx={{ width: '100%' }}>
        {/* Mensaje de bienvenida */}
        <Box sx={{ mb: 3 }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    fontWeight: 800, 
                    background: 'linear-gradient(135deg, #1e88e5 0%, #3949ab 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}
            >
                Hola, {user?.username}!
            </Typography>
        </Box>

        {/* Cards resumen */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
            <Card sx={{ p: 3, flex: 1, background: 'linear-gradient(135deg, #e3f2fd 0%, #f5f7fa 100%)', border: '2px solid', borderColor: 'primary.light' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Pendientes
                </Typography>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 800 }}>
                    {pendingTasks.length}
                </Typography>
            </Card>

            <Card sx={{ p: 3, flex: 1, background: 'linear-gradient(135deg, #c8e6c9 0%, #f5f7fa 100%)', border: '2px solid', borderColor: 'success.light' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Completadas
                </Typography>
                <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 800 }}>
                    {completedTasks.length}
                </Typography>
            </Card>
        </Stack>

        {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        ) : (
            <>
            {/* Pendientes - Listado simple */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
                Tareas pendientes
            </Typography>

            {pendingTasks.length === 0 ? (
                <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
                    <Typography color="text.secondary">
                        ¡No hay tareas pendientes!
                    </Typography>
                </Card>
            ) : (
                <Stack spacing={1.5} sx={{ mb: 4 }}>
                    {pendingTasks.slice(0, 5).map(task => (
                        <Card key={task._id} sx={{ p: 2, position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' } }}>
                            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(135deg, #1e88e5 0%, #3949ab 100%)' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                                        {task.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
                                        {task.description || 'Sin descripción'}
                                    </Typography>
                                </Box>
                                <Chip label={task.type?.name || 'Sin tipo'} size="small" variant="outlined" sx={{ flexShrink: 0 }} />
                            </Box>
                        </Card>
                    ))}
                </Stack>
            )}

            
            
            </>
        )}
        </Box>
    );
}
