const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Test login route
app.post('/api/users/login', (req, res) => {
    console.log('Login attempt:', req.body);
    res.json({ 
        message: 'Test login endpoint',
        data: req.body 
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/api/test`);
}); 