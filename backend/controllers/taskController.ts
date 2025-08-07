import { Request, Response } from 'express';
import Task from '../models/taskModel';
import { IUser } from '../models/userModel'; // Impor interface IUser

// 2. Buat Interface khusus untuk Request yang sudah diautentikasi
// Ini memberitahu TypeScript bahwa objek 'req' akan memiliki properti 'user'.
interface AuthenticatedRequest extends Request {
    user?: IUser; // Properti user bersifat opsional dan memiliki tipe IUser
}

// @desc    Get tasks for a user
// @route   GET /api/tasks
// 3. Gunakan AuthenticatedRequest sebagai tipe untuk 'req'
export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // TypeScript sekarang tahu bahwa req.user ada dan memiliki properti 'id'
        const tasks = await Task.find({ user: req.user!.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a task
// @route   POST /api/tasks
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.body.text) {
        return res.status(400).json({ message: 'Please add a text field' });
    }
    try {
        const task = await Task.create({
            text: req.body.text,
            user: req.user!.id, // Tanda seru (!) memberitahu TS bahwa kita yakin user tidak null
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== req.user!.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== req.user!.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await task.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};