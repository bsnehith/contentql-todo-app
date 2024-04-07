const Todo = require('../models/todomodels');

module.exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.saveTodo = async (req, res) => {
    try {
        const { text } = req.body;
        const newTodo = await Todo.create({ text });
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).send('Updated successfully');
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.deleteTodo = async (req, res) => {
    const { _id } = req.body;
    Todo.findByIdAndDelete(_id)
        .then(() => res.status(200).send("Deleted successfully"))
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error deleting todo");
        });
};

module.exports.completeTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).send('Todo completed successfully');
    } catch (error) {
        console.error('Error completing todo:', error);
        res.status(500).send('Internal Server Error');
    }
};
