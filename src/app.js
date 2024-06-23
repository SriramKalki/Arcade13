const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// ToDo model
const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const ToDo = mongoose.model('ToDo', todoSchema);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.post('/todos', async (req, res) => {
    const todo = new ToDo({
        title: req.body.title,
        completed: false
    });

    try {
        const savedToDo = await todo.save();
        res.status(201).send(savedToDo);
    } catch (error) {
        res.status(400).send(error);
    }
});

