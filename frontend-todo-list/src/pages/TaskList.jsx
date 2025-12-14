import { useEffect, useState } from 'react';
import { Typography, Box, Divider, Stack, CircularProgress, Card } from '@mui/material';
import TaskCard from '../components/TaskCard';
import { getTasksRequest } from '../api/task.api';

export default function TaskList() {
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
        <Box>
        {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
                <CircularProgress />
            </Box>
        ) : (
            <>
            {/* Pendientes */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
                    Pendientes ({pendingTasks.length})
                </Typography>

                {pendingTasks.length === 0 ? (
                    <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
                        <Typography color="text.secondary">
                            ¡Sin tareas pendientes! 
                        </Typography>
                    </Card>
                ) : (
                    <Stack spacing={2}>
                        {pendingTasks.map(task => (
                            <TaskCard key={task._id} task={task} onUpdate={loadTasks} />
                        ))}
                    </Stack>
                )}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Completadas */}
            <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
                    Completadas ({completedTasks.length})
                </Typography>

                {completedTasks.length === 0 ? (
                    <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
                        <Typography color="text.secondary">
                            Ninguna tarea completada
                        </Typography>
                    </Card>
                ) : (
                    <Stack spacing={2}>
                        {completedTasks.map(task => (
                            <TaskCard key={task._id} task={task} onUpdate={loadTasks} />
                        ))}
                    </Stack>
                )}
            </Box>
            </>
        )}
        </Box>
    );
}
