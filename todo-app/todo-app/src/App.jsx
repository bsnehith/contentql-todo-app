import React, { useState, useEffect } from "react";
import { getAllTodo, addTodo, updateTodo, deleteTodo, completeTodo } from "./utils/handleapi";

const Todo = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.text);

  const handleEditInputChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTodo(todo._id, editedTask, setTodos);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <li className="border border-gray-300 rounded-md overflow-hidden shadow-md mb-4">
      <div className="flex items-center justify-between bg-white p-4 transition duration-300 ease-in-out transform hover:scale-105">
        <div className="flex items-center">
          <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo._id, setTodos)} className="mr-4 cursor-pointer" />
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="flex items-center">
              <input type="text" value={editedTask} onChange={handleEditInputChange} className="bg-gray-100 rounded-md p-2 mr-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300" />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Save</button>
            </form>
          ) : (
            <div className="flex items-center">
              <span className={`${todo.completed ? 'line-through' : ''} text-gray-700`}>{todo.text}</span>
              <div className="flex ml-4">
                <button onClick={() => setIsEditing(true)} className="text-blue-500 mx-2 hover:text-blue-700">Edit</button>
                <button onClick={() => deleteTodo(todo._id, setTodos)} className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getAllTodo(setTodos);
  }, []);

  const handleAddTodo = async () => {
    if (text.trim() !== "") {
      try {
        await addTodo(text, setText, setTodos);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 py-8 px-4"> {/* Added background gradient animation */}
      <h1 className="text-3xl font-semibold text-center mb-8">Todo List</h1>
      <div className="max-w-md mx-auto">
        <div className="flex mb-4">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="flex-grow bg-gray-100 rounded-md p-3 mr-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300" placeholder="Add new todo..." />
          <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md font-semibold">Add Todo</button> {/* Added hover effect */}
        </div>
        <ul>
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
