import express from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController';
import { protect } from "../middleware/authMiddleware";

const taskRouter = express.Router();

taskRouter.route('/').get(protect, getTasks).post(protect, createTask);
taskRouter.route('/:id').put(protect, updateTasks).delete(protect, deleteTask);

export default taskRouter;