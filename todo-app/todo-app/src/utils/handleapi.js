import axios from 'axios';

const baseurl = "http://localhost:5000";

const getAllTodo = (setTodo) => {
  axios
    .get(baseurl)
    .then(({ data }) => {
      console.log(`data --->`, data);
      setTodo(data);
    })
    .catch(error => console.error('Error fetching todos:', error));
};

const addTodo = (text, setText, setTodo) => {
  axios
    .post(`${baseurl}/save`, { text })
    .then(() => {
      setText("");
      getAllTodo(setTodo);
    })
    .catch(error => console.error('Error adding todo:', error));
};

const updateTodo = (todoId, text, setTodo) => {
  axios
    .put(`${baseurl}/update/${todoId}`, { text })
    .then(() => {
      getAllTodo(setTodo);
    })
    .catch(error => console.error('Error updating todo:', error));
};

const deleteTodo = (todoId, setTodo) => { // Corrected function name
  axios
    .post(`${baseurl}/delete`, { _id: todoId })
    .then(() => {
      getAllTodo(setTodo);
    })
    .catch(error => console.error('Error deleting todo:', error));
};

const completeTodo = (todoId, setTodo) => {
  axios
    .put(`${baseurl}/complete/${todoId}`, { completed: true })
    .then(() => {
      getAllTodo(setTodo);
    })
    .catch(error => console.error('Error completing todo:', error));
};

export { getAllTodo, addTodo, updateTodo, deleteTodo, completeTodo };
