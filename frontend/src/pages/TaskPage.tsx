import { useState } from "react";

const TaskPage = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState("");

    const handleAddTask = () => {
        if (newTask.trim() === "") return;
        setTasks([...tasks, newTask]);
        setNewTask("");
    };

    const handleDeleteTask = (index: number) => {
        const updated = tasks.filter((_, i) => i !== index);
        setTasks(updated);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Task Page</h2>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Tambah task baru..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Tambah
                    </button>
                </div>

                <ul className="space-y-2">
                    {tasks.length === 0 ? (
                        <p className="text-center text-gray-500">Belum ada task.</p>
                    ) : (
                        tasks.map((task, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                            >
                                <span>{task}</span>
                                <button
                                    onClick={() => handleDeleteTask(index)}
                                    className="text-red-500 hover:text-red-700 text-sm"
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
