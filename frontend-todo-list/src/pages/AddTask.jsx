import { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Card,
    TextField,
    Button,
    Typography,
    Autocomplete,
    CircularProgress,
    Alert,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTaskRequest } from '../api/task.api';
import { getTaskTypesRequest, createTaskTypeRequest } from '../api/taskType.api';

export default function AddTask() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [taskTypes, setTaskTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [inputValue, setInputValue] = useState('');
    
    const [form, setForm] = useState({
        title: '',
        description: '',
        type: null
    });

    // Cargar tipos de tareas
    useEffect(() => {
        const loadTaskTypes = async () => {
            try {
                const res = await getTaskTypesRequest();
                const types = Array.isArray(res.data) ? res.data : [];
                const mappedTypes = types.map(t => ({ label: t.name, id: t._id }));
                setTaskTypes(mappedTypes.length > 0 ? mappedTypes : [
                    { label: 'Trabajo', id: null },
                    { label: 'Casa', id: null },
                    { label: 'Negocios', id: null }
                ]);
            } catch (err) {
                console.error('Error al cargar tipos:', err);
                // Tipos por defecto
                setTaskTypes([
                    { label: 'Trabajo', id: null },
                    { label: 'Casa', id: null },
                    { label: 'Negocios', id: null }
                ]);
            } finally {
                setLoadingTypes(false);
            }
        };
        loadTaskTypes();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleTypeChange = (event, newValue) => {
        console.log('Type changed to:', newValue);
        if (!newValue) {
            setForm({ ...form, type: null });
            setInputValue('');
        } else if (typeof newValue === 'string') {
            // El usuario escribió algo nuevo
            setForm({ ...form, type: { label: newValue, id: null, __isNew__: true } });
            setInputValue(newValue);
        } else {
            // El usuario seleccionó de la lista
            setForm({ ...form, type: newValue });
            setInputValue(newValue.label);
        }
    };

    const handleInputChange = (event, value) => {
        console.log('Input changed to:', value);
        setInputValue(value);
        if (value === '' || !value) {
            setForm({ ...form, type: null });
        } else if (value.trim()) {
            // Actualizar form.type mientras el usuario escribe
            setForm({ ...form, type: { label: value, id: null, __isNew__: true } });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        console.log('Form al submit:', form);

        if (!form.title.trim()) {
            setError('El nombre de la tarea es obligatorio');
            return;
        }

        if (!form.type || !form.type.label) {
            setError('Debe seleccionar o crear un tipo de tarea');
            return;
        }

        setLoading(true);
        try {
            // Crear nuevo tipo si no existe
            let typeId = form.type.id;
            if (form.type.__isNew__ || !form.type.id) {
                const typeRes = await createTaskTypeRequest({ name: form.type.label });
                typeId = typeRes.data._id;
            }

            // Crear tarea
            await createTaskRequest({
                title: form.title.trim(),
                description: form.description.trim(),
                type: typeId
            });

            setSuccess('¡Tarea creada exitosamente!');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear la tarea');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 3 }}>
                <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'primary.main' }}>
                        Crear nueva tarea
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            {/* Nombre */}
                            <TextField
                                label="Nombre de la tarea"
                                name="title"
                                fullWidth
                                required
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Ej: Ir al supermercado"
                                disabled={loading}
                            />

                            {/* Descripción */}
                            <TextField
                                label="Descripción"
                                name="description"
                                fullWidth
                                multiline
                                rows={4}
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Escribe los detalles de la tarea..."
                                disabled={loading}
                            />

                            {/* Tipo */}
                            {loadingTypes ? (
                                <Box display="flex" justifyContent="center" py={2}>
                                    <CircularProgress size={24} />
                                </Box>
                            ) : (
                                <Autocomplete
                                    options={taskTypes}
                                    value={form.type}
                                    inputValue={inputValue}
                                    onChange={handleTypeChange}
                                    onInputChange={handleInputChange}
                                    freeSolo
                                    getOptionLabel={(option) => {
                                        if (!option) return '';
                                        if (typeof option === 'string') return option;
                                        return option.label || '';
                                    }}
                                    isOptionEqualToValue={(option, value) => {
                                        if (!option || !value) return false;
                                        return option.id === value.id;
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tipo de tarea"
                                            placeholder="Selecciona o escribe un tipo"
                                            required
                                            helperText="Puedes crear un nuevo tipo escribiendo aquí"
                                            error={false}
                                        />
                                    )}
                                    disabled={loading}
                                    noOptionsText="No hay tipos disponibles"
                                />
                            )}

                            {/* Botones */}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading || loadingTypes}
                                    sx={{ position: 'relative' }}
                                >
                                    {loading ? (
                                        <>
                                            <CircularProgress size={20} sx={{ mr: 1 }} />
                                            Guardando...
                                        </>
                                    ) : (
                                        'Crear tarea'
                                    )}
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => navigate('/')}
                                    disabled={loading}
                                    sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                                >
                                    Cancelar
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
}
