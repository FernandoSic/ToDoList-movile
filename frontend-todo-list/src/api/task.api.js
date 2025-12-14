import api from './axios';

export const getTasksRequest = () =>
    api.get('/tasks');

export const getTaskDetailRequest = (id) =>
    api.get(`/tasks/${id}`);

export const createTaskRequest = (data) =>
    api.post('/tasks', data);

export const completeTaskRequest = (id) =>
    api.patch(`/tasks/${id}/complete`);

export const deleteTaskRequest = (id) =>
    api.delete(`/tasks/${id}`);