import { Request, Response } from "express"
import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves all tasks from the database and sends them as a JSON response.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * 
 * @returns A JSON array of tasks with a 200 status code on success,
 *          or a 400 status code with an error message on failure.
 */
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks: Task[] = await prisma.task.findMany();

        res.status(200).json(tasks);

    } catch (err)  {
        res.status(400).json({ message: "Failed to fetch all tasks" });
    }
};

/**
 * Handles the retrieval of a task by its ID from the database.
 * 
 * @param req - The HTTP request object, containing the task ID in the URL parameters.
 * @param res - The HTTP response object used to send the response.
 * 
 * @returns A JSON response with the task data if found, an empty array if not found,
 *          or an error message if the retrieval fails.
 * 
 * @throws Returns a 401 status with a message if the task ID is missing.
 *         Returns a 400 status with a message if there is an error during retrieval.
 */
export const getTask = async (req: Request, res: Response) => {
    const taskId: number = parseInt(req.params.id);

    if (!taskId) {
        res.status(400).json({ message: "Missing taskId" });
        return;
    }

    try {
        const task: Task | null = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        });

        if (!task) {
            res.status(200).json([]);
            return;
        }

        res.status(200).json(task);

    } catch (err) {
        res.status(400).json({ message: "Failed to fetch the task" });
    }

};


/**
 * Handles the creation of a new task.
 * 
 * @param req - The HTTP request object, expected to contain a 'taskMessage' in the body.
 * @param res - The HTTP response object used to send back the appropriate response.
 * 
 * @returns A JSON response with the created task object and a 201 status code if successful,
 *          or an error message with a 400 status code if the task creation fails or if the
 *          'taskMessage' is missing.
 */
export const createTask = async (req: Request, res: Response) => {
    const { taskMessage }: { taskMessage: string } = req.body;

    if (!taskMessage) {
        res.status(400).json({ message: 'Missing message' });
        return;
    }

    try {
        const createdTask: Task = await prisma.task.create({
            data: {
                message: taskMessage
            }
        });

        if (!createdTask) {
            res.status(400).json({ message: "Something went wrong, try to create this task latter" });
            return;
        }

        res.status(201).json(createdTask);

    } catch (err) {
        res.status(400).json({ message: "Failed to create the task" });
    }
};

/**
 * Updates a task's message in the database.
 * 
 * @param req - The request object containing the task ID and new message.
 * @param res - The response object used to send back the updated task or error message.
 * 
 * @returns A JSON response with the updated task or an error message.
 * 
 * @throws Returns a 400 status code if parameters are missing or if the update fails.
 */
export const updateTask = async (req: Request, res: Response) => {
    const { taskId, newMessage }: { taskId: number, newMessage: string } = req.body;

    if (!taskId || !newMessage) {
        res.status(400).json({ message: 'Missing parameters' });
        return;
    }

    try {
        const updatedTask: Task = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                message: newMessage
            }
        });

        if (!updatedTask) {
            res.status(400).json({ message: "Something went wrong, try to update this task latter" });
            return;
        }

        res.status(200).json(updatedTask);

    } catch (err) {
        res.status(400).json({ message: "Failed to update the task" });
    }

};

/**
 * Deletes a task based on the provided task ID from the request body.
 * 
 * @param req - The HTTP request object containing the task ID in the body.
 * @param res - The HTTP response object used to send back the appropriate response.
 * 
 * @returns A JSON response indicating the success or failure of the task deletion.
 * 
 * If the task ID is missing or invalid, responds with a 400 status and an error message.
 * If the task is successfully deleted, responds with a 200 status and a success message.
 * If an error occurs during deletion, responds with a 400 status and an error message.
 */
export const deleteTask = async (req: Request, res: Response) => {
    const taskId: number = parseInt(req.body.id);

    if (!taskId) {
        res.status(400).json({ message: "Missing taskId" });
        return;
    }

    try {
        await prisma.task.delete({
            where: {
                id: taskId
            }
        });

        res.status(200).json({ message: "Task successfully deleted" });

    } catch (err) {
        res.status(400).json({ message: "Failed to fetch the task" });
    }
};


