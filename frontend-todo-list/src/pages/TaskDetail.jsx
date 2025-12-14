import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Card,
    Button,
    Typography,
    CircularProgress,
    Alert,
    Stack,
    Chip,
    Divider
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { getTaskDetailRequest, completeTaskRequest, deleteTaskRequest } from '../api/task.api';
import ConfirmDialog from '../components/ConfirmDialog';

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    // Cargar detalles de la tarea
    useEffect(() => {
        const loadTask = async () => {
            try {
                setLoading(true);
                const res = await getTaskDetailRequest(id);
                setTask(res.data);
                setError('');
            } catch (err) {
                setError(err.response?.data?.message || 'Error al cargar la tarea');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        loadTask();
    }, [id]);

    const handleComplete = async () => {
        try {
            setActionLoading(true);
            await completeTaskRequest(id);
            setSuccess('¡Tarea completada!');
            // Actualizar el estado local
            setTask({ ...task, completed: true });
            setTimeout(() => {
                setSuccess('');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al completar la tarea');
            console.error('Error:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setActionLoading(true);
            await deleteTaskRequest(id);
            setSuccess('¡Tarea eliminada!');
            setTimeout(() => navigate('/tasks'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar la tarea');
            console.error('Error:', err);
        } finally {
            setActionLoading(false);
            setOpenDeleteDialog(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Container maxWidth="sm">
                <Box sx={{ py: 3, display: 'flex', justifyContent: 'center', minHeight: '60vh', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (!task) {
        return (
            <Container maxWidth="sm">
                <Box sx={{ py: 3 }}>
                    <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
                        <Alert severity="error">Tarea no encontrada</Alert>
                        <Button
                            startIcon={<ArrowBackIosNewIcon />}
                            onClick={() => navigate('/tasks')}
                            sx={{ mt: 2 }}
                        >
                            Volver a tareas
                        </Button>
                    </Card>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 3 }}>
                <Card sx={{ p: { xs: 2.5, sm: 3 }, position: 'relative' }}>
                    {/* Barra superior con gradiente */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: 'linear-gradient(90deg, #1e88e5 0%, #3949ab 100%)',
                            borderRadius: '16px 16px 0 0'
                        }}
                    />

                    {/* Botón volver */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Button
                            startIcon={<ArrowBackIosNewIcon />}
                            onClick={() => navigate('/tasks')}
                            size="small"
                            sx={{
                                textTransform: 'none',
                                color: 'primary.main',
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                padding: { xs: '4px 8px', sm: '6px 12px' },
                                '&:hover': {
                                    backgroundColor: 'rgba(30, 136, 229, 0.08)'
                                }
                            }}
                        >
                            Volver
                        </Button>
                    </Box>

                    {/* Alertas */}
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    {/* Título */}
                    <Box sx={{ mb: 2.5 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: task.completed ? 'text.secondary' : 'primary.main',
                                textDecoration: task.completed ? 'line-through' : 'none',
                                wordBreak: 'break-word'
                            }}
                        >
                            {task.title}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Estado y Tipo */}
                    <Stack direction="row" spacing={1} sx={{ mb: 2.5, flexWrap: 'wrap' }}>
                        {task.completed && (
                            <Chip
                                icon={<CheckCircleIcon />}
                                label="Completada"
                                color="success"
                                variant="outlined"
                            />
                        )}
                        {!task.completed && (
                            <Chip
                                label="Pendiente"
                                variant="outlined"
                                sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                            />
                        )}
                        {task.type?.name && (
                            <Chip
                                label={task.type.name}
                                variant="filled"
                                sx={{
                                    backgroundColor: 'rgba(30, 136, 229, 0.2)',
                                    color: 'primary.main',
                                    fontWeight: 600
                                }}
                            />
                        )}
                    </Stack>

                    {/* Descripción */}
                    <Box sx={{ mb: 2.5 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.5 }}
                        >
                            Descripción
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: task.completed ? 'text.secondary' : 'text.primary',
                                opacity: task.completed ? 0.7 : 1,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                lineHeight: 1.6
                            }}
                        >
                            {task.description || 'Sin descripción'}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Fechas */}
                    <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                        <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Creada el:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                {formatDate(task.createdAt)}
                            </Typography>
                        </Box>
                        {task.completed && task.dateCompleted && (
                            <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                    Completada el:
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'success.main' }}>
                                    {formatDate(task.dateCompleted)}
                                </Typography>
                            </Box>
                        )}
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    {/* Botones de acción */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                        {!task.completed && (
                            <Button
                                variant="contained"
                                startIcon={<CheckCircleIcon />}
                                onClick={handleComplete}
                                disabled={actionLoading}
                                sx={{
                                    flex: 1,
                                    background: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: 4
                                    }
                                }}
                            >
                                {actionLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
                                Completar
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => setOpenDeleteDialog(true)}
                            disabled={actionLoading}
                            sx={{
                                flex: 1,
                                borderColor: 'error.main',
                                color: 'error.main',
                                '&:hover': {
                                    backgroundColor: 'rgba(239, 83, 80, 0.08)',
                                    borderColor: 'error.main'
                                }
                            }}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </Card>
            </Box>

            {/* Diálogo de confirmación para eliminar */}
            <ConfirmDialog
                open={openDeleteDialog}
                title="Eliminar tarea"
                message={`¿Estás seguro de que deseas eliminar la tarea "${task.title}"? Esta acción no se puede deshacer.`}
                onConfirm={handleDelete}
                onCancel={() => setOpenDeleteDialog(false)}
                confirmText="Eliminar"
                confirmColor="error"
            />
        </Container>
    );
}
