import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../api';

interface Task {
    _id: string;
    text: string;
    completed: boolean;
}

const TaskPage: React.FC = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.getTasks();
                setTasks(data);
            } catch (err) {
                setError("Gagal memuat tugas.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim() === "") return;

        try {
            const { data } = await api.createTask({ text: newTask });
            setTasks([...tasks, data]);
            setNewTask("");
        } catch (err) {
            setError("Gagal menambah tugas.");
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            console.log('Deleting task with ID:', id);
            await api.deleteTask(id);
            console.log('Task deleted successfully');
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (err) {
            console.error('Delete error:', err);
            setError("Gagal menghapus tugas.");
        }
    };

    const handleToggleComplete = async (id: string, currentStatus: boolean) => {
        try {
            console.log('Toggling task:', id, 'from', currentStatus, 'to', !currentStatus);
            const { data } = await api.updateTask(id, { completed: !currentStatus });
            console.log('Task updated successfully:', data);
            setTasks(tasks.map((task) => (task._id === id ? data : task)));
        } catch (err) {
            console.error('Toggle error:', err);
            setError("Gagal memperbarui tugas.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
                {/* Header dengan nama pengguna dan tombol logout */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-purple-700">
                        Halo, {user?.name}!
                    </h2>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition">
                        Logout
                    </button>
                </div>

                <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Tambah task baru..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Tambah
                    </button>
                </form>

                {error && <p className="text-center text-red-500 text-sm mb-4">{error}</p>}

                <ul className="space-y-2">
                    {isLoading ? (
                        <p className="text-center text-gray-500">Memuat tugas...</p>
                    ) : tasks.length === 0 ? (
                        <p className="text-center text-gray-500">Belum ada task.</p>
                    ) : (
                        tasks.map((task) => (
                            <li
                                key={task._id}
                                className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100"
                            >
                                <span
                                    onClick={() => handleToggleComplete(task._id, task.completed)}
                                    className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                                >
                                    {task.text}
                                </span>
                                <button
                                    onClick={() => handleDeleteTask(task._id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-semibold ml-4"
                                >
                                    Hapus
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TaskPage;