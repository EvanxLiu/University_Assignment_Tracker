const express = require('express'); 
const mysql = require('mysql'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const app = express(); 
const port = 3000; 

const db = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: 'S8MtA@kmDw', 
    database: 'task_tracker' 
}); 

// Connect to the database 
db.connect((err) => { 
    if (err) { 
        console.error('Error connecting to the database:', err); 
        return; 
    } 
    console.log('Connected to the MySQL database!'); 
}); 

app.use(express.json()); // Parses incoming JSON requests

// Register a new user
app.post('/users', async (req, res) => { 
    const { username, userpassword } = req.body; 
    try { 
        const securePassword = await bcrypt.hash(userpassword, 10); 
        const query = 'INSERT INTO users (username, userpassword) VALUES (?, ?)'; 
        db.query(query, [username, securePassword], (err, results) => { 
            if (err) { 
                console.error('Error with app.post for adding a user'); 
                return res.status(500).send('Error adding a user'); 
            } 
            res.send('User added'); 
        }); 
    } catch (err) { 
        console.error('Error hashing password:', err); 
        return res.status(500).send('Error creating user'); 
    } 
}); 

// User login
app.post('/login', (req, res) => { 
    const { username, userpassword } = req.body; 
    const query = 'SELECT * FROM users WHERE username = ?'; 
    db.query(query, [username], (err, results) => { 
        if (err) { 
            console.error('Error retrieving user'); 
            return res.status(500).send('Error retrieving user'); 
        } 
        if (results.length === 0) { 
            return res.status(404).send('User not found'); 
        } 
        res.json(results[0]); 
    }); 
}); 

// Get all users
app.get('/users', (req, res) => { 
    const query = 'SELECT * FROM users'; 
    db.query(query, (err, results) => { 
        if (err) { 
            console.error('Error retrieving users'); 
            return res.status(500).send('Error retrieving users'); 
        } 
        res.json(results); 
    }); 
}); 

// Get tasks for a user
app.get('/users/:userID/tasks', (req, res) => { 
    const userID = req.params.userID; 
    const query = 'SELECT * FROM tasks WHERE userID = ?'; 
    db.query(query, [userID], (err, results) => { 
        if (err) { 
            console.error('Error retrieving tasks'); 
            return res.status(500).send('Error retrieving tasks'); 
        } 
        if (results.length === 0) { 
            return res.status(404).send('No tasks found for this user'); 
        } 
        res.json(results); 
    }); 
}); 

// Get a specific task for a user
app.get('/users/:userID/tasks/:taskID', (req, res) => { 
    const { userID, taskID } = req.params; 
    const query = 'SELECT * FROM tasks WHERE userID = ? AND taskID = ?'; 
    db.query(query, [userID, taskID], (err, results) => { 
        if (err) { 
            console.error('Error retrieving specific task'); 
            return res.status(500).send('Error retrieving specific task'); 
        } 
        if (results.length === 0) { 
            return res.status(404).send('Task not found'); 
        } 
        res.json(results[0]); 
    }); 
}); 

// Add a new task for a user
app.post('/users/:userID/tasks', (req, res) => { 
    const { userID } = req.params; 
    const { taskTitle, taskStatus, dueDate, priority } = req.body; 
    const query = 'INSERT INTO tasks (taskTitle, taskStatus, dueDate, priority, userID) VALUES (?, ?, ?, ?, ?)'; 
    db.query(query, [taskTitle, taskStatus, dueDate, priority, userID], (err, results) => { 
        if (err) { 
            console.error('Error adding task'); 
            return res.status(500).send('Error adding task'); 
        } 
        res.send('Task added'); 
    }); 
}); 

// Update a specific task
app.put('/users/:userID/tasks/:taskID', (req, res) => { 
    const { userID, taskID } = req.params; 
    const { taskTitle, taskStatus, dueDate, priority } = req.body; 
    const query = 'UPDATE tasks SET taskTitle = ?, taskStatus = ?, dueDate = ?, priority = ? WHERE userID = ? AND taskID = ?'; 
    db.query(query, [taskTitle, taskStatus, dueDate, priority, userID, taskID], (err, results) => { 
        if (err) { 
            console.error('Error updating task'); 
            return res.status(500).send('Error updating task'); 
        } 
        res.send('Task updated'); 
    }); 
}); 

// Delete a specific task
app.delete('/users/:userID/tasks/:taskID', (req, res) => { 
    const { userID, taskID } = req.params; 
    const query = 'DELETE FROM tasks WHERE userID = ? AND taskID = ?'; 
    db.query(query, [userID, taskID], (err, results) => { 
        if (err) { 
            console.error('Error deleting task'); 
            return res.status(500).send('Error deleting task'); 
        } 
        res.send('Task deleted'); 
    }); 
}); 

// Home route
app.get('/', (req, res) => { 
    res.send('Welcome to the Task Tracker API!'); 
}); 

// Start the server
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`); 
});
