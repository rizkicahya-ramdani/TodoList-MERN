import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
});

// Fungsi-fungsi API

export const register = (userData: any) => api.post('users/register', userData);
export const login = (userData: any) => api.post('users/login', userData);

export const getTasks = () => api.get('tasks');
export const createTask = (taskData: { text: string }) => api.post('tasks', taskData);
export const updateTask = (id: string, taskData: { completed?: boolean; text?: string }) => api.put(`tasks/${id}`, taskData);
export const deleteTask = (id: string) => api.delete(`tasks/${id}`);

export default api;