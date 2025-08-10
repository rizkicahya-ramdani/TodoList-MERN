const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for tasks
let tasks = [
    { _id: '1', text: 'Test task 1', completed: false },
    { _id: '2', text: 'Test task 2', completed: true }
];

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Mock login route
app.post('/api/users/login', (req, res) => {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    
    // Mock authentication
    if (email === 'test@test.com' && password === 'password') {
        res.json({
            _id: '123',
            name: 'Test User',
            email: email,
            token: 'mock-jwt-token'
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Mock register route
app.post('/api/users/register', (req, res) => {
    console.log('Register attempt:', req.body);
    const { name, email, password } = req.body;
    
    res.status(201).json({
        _id: '123',
        name: name,
        email: email,
        token: 'mock-jwt-token'
    });
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
    console.log('Getting tasks:', tasks);
    res.json(tasks);
});

// Create new task
app.post('/api/tasks', (req, res) => {
    console.log('Create task:', req.body);
    const newTask = {
        _id: Date.now().toString(),
        text: req.body.text,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
    console.log('Update task:', req.params.id, req.body);
    const taskIndex = tasks.findIndex(task => task._id === req.params.id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...req.body
    };
    
    res.status(200).json(tasks[taskIndex]);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    console.log('Delete task:', req.params.id);
    const taskIndex = tasks.findIndex(task => task._id === req.params.id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    
    tasks.splice(taskIndex, 1);
    res.status(200).json({ id: req.params.id });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Simple server running on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/api/test`);
    console.log('Mock credentials: test@test.com / password');
    console.log('Initial tasks:', tasks);
}); 