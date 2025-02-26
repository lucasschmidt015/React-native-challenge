import { Router } from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask, concludeTask } from '../controllers/task';

const router = Router();

router.get("/tasks", getTasks);

router.get("/task/:id", getTask);

router.post("/task", createTask);

router.put('/task/conclude', concludeTask);

router.put("/task", updateTask);

router.delete("/task", deleteTask);

export default router;