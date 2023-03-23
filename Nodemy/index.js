// Import required modules
const express = require('express');

// Define the users data
const users = [
    {
        id: 1,
        name: 'Alex',
    },
    {
        id: 2,
        name: 'Barbara',
    },
    {
        id: 3,
        name: 'Clark',
    },
];

// Initialize the Express application
const app = express();
app.use(express.json());

// Define routes for CRUD operations
// Get all users
app.get('/users', (req, res) => {
    res.send(users);
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.send(user);
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(newUser);
    res.status(201).send(newUser);
});

// Update an existing user
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    user.name = req.body.name;
    res.send(user);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }
    users.splice(userIndex, 1);
    res.send('User deleted successfully');
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
