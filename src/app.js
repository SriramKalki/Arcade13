const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const ToDo = mongoose.model('ToDo', todoSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
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

app.get('/todos', async (req, res) => {
    try {
        const todos = await ToDo.find();
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const todo = await ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await ToDo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
