import api from "./axiosConfig";

type Task = {
    id?: number;
    message: string;
}

export const createNewTask = async (data: Task) => {
    if (data.message.length < 1) {
        throw new Error('Input data is missing!');
    }
    
    return await api.post('/task', data);
}

export const listTasks = async (page: number = 1, limit: number = 20) => {
    return await api.get(`/tasks?page=${page}&limit=${limit}`);
};

export const concludeTask = async (taskId: number) => {
    return await api.put('/task/conclude',  {
        taskId
    });
}