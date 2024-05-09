import axios from 'axios';

// Deployment URL
const deploymentURL = "https://todo-backend-xwr1.onrender.com";

// Base URL for local development
const baseurl = "http://localhost:5000";

// Function to determine base URL based on environment
const getBaseURL = () => {
  return process.env.NODE_ENV === 'production' ? deploymentURL : baseurl;
};

const getAllTodo = (setTodo) => {
  axios
    .get(`${getBaseURL()}`)
    .then(({ data }) => {
      console.log(`data --->`, data);
      setTodo(data);
    })
    .catch(error => console.error('Error fetching todos:', error));
};

const addTodo = (text, setText, setTodo) => {
  axios
    .post(`${getBaseURL()}/save`, { text })
    .then(() => {
      setText("");
      getAllTodo(setTodo);
    })
    .catch(error => console.error('Error adding todo:', error));
};

const updateTodo = (todoId, text, setTodo) => {
  axios
    .put(`${getBaseURL()}/update/${todoId}`, { text })
    .then(() => {
      getAllTodo(setTodo);
    })
    .catch(error => console.error('Error updating todo:', error));
};

const deleteTodo = (todoId, setTodo) => {
  axios
    .post(`${getBaseURL()}/delete`, { _id: todoId })
    .then(() => {
      getAllTodo(setTodo);
    })
    .catch(error => console.error('Error deleting todo:', error));
};

const completeTodo = (todoId, setTodo) => {
  axios
    .put(`${getBaseURL()}/complete/${todoId}`, { completed: true })
    .then(() => {
      getAllTodo(setTodo);
    })
    .catch(error => console.error('Error completing todo:', error));
};

export { getAllTodo, addTodo, updateTodo, deleteTodo, completeTodo }; // Export the functions
