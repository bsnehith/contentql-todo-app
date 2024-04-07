const express = require('express');
const router = express.Router();
const { getTodo, saveTodo, updateTodo, deleteTodo, completeTodo } = require('../controllers/todocontrollers');

router.get('/', getTodo); // Route to get all todos
router.post('/save', saveTodo); // Route to save a new todo
router.put('/update/:id', updateTodo); // Route to update a todo by ID
router.post('/delete', deleteTodo); // Route to delete a todo
router.put('/complete/:id', completeTodo); // Route to complete a todo by ID

module.exports = router;
