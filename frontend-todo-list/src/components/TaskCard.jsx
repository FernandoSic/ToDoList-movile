import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Box,
    IconButton
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { completeTaskRequest, deleteTaskRequest} from '../api/task.api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function TaskCard({ task, onUpdate }) {
    const navigate = useNavigate();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleComplete = async () => {
        try {
        await completeTaskRequest(task._id);
        onUpdate();
        } catch (error) {
        console.error('Error al completar tarea', error);
        }
    };

    const handleDelete = async () => {
        try {
        await deleteTaskRequest(task._id);
        onUpdate();
        setOpenDeleteDialog(false);
        } catch (error) {
        console.error('Error al eliminar tarea', error);
        }
    };

    return (
        <>
            <Card 
                sx={{ 
                    position: 'relative', 
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: task.completed ? 0.7 : 1,
                    '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)' }
                }}
                onClick={() => navigate(`/tasks/${task._id}`)}
            >
            <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                height: 4, 
                background: task.completed 
                    ? 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)' 
                    : 'linear-gradient(135deg, #1e88e5 0%, #3949ab 100%)'
            }} />
            <CardContent sx={{ pb: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1, gap: 1 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            sx={{ 
                                mb: 0.5,
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? 'text.secondary' : 'inherit'
                            }}
                        >
                            {task.title}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                                mb: 1,
                                textDecoration: task.completed ? 'line-through' : 'none'
                            }}
                        >
                            {task.description || 'Sin descripción'}
                        </Typography>
                        <Chip label={task.type?.name || 'Sin tipo'} size="small" variant="outlined" />
                    </Box>

                    <Box display="flex" gap={0.5}>
                        {!task.completed && (
                            <IconButton 
                                size="small"
                                onClick={(e) => { e.stopPropagation(); handleComplete(); }}
                                sx={{ color: 'success.main' }}
                                title="Completar"
                            >
                                <CheckCircleIcon />
                            </IconButton>
                        )}
                        <IconButton 
                            size="small"
                            onClick={(e) => { e.stopPropagation(); setOpenDeleteDialog(true); }}
                            sx={{ color: 'error.main' }}
                            title="Eliminar"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </CardContent>
            </Card>

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
        </>
    );
}
