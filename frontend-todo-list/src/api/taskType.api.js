import api from './axios';

export const getTaskTypesRequest = () =>
    api.get('/task-types');

export const createTaskTypeRequest = (data) =>
    api.post('/task-types', data);
