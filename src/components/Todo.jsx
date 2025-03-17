import React, { useState, useEffect } from "react";
import "./Todo.css";
import { motion as Motion } from "framer-motion";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
      userId: 1, // Default user ID
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" filter
  });

  if (loading) {
    return (
      <div className="todo-container">
        <h2>Loading todos...</h2>
        <div className="todo-loader">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="todo-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todo-container">
        <h2>Error</h2>
        <p className="todo-error">{error}</p>
        <button
          className="todo-retry-btn"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="todo-container">
      <h2>Todo List</h2>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" className="todo-add-btn">
          Add
        </button>
      </form>

      <div className="todo-filters">
        <button
          className={`todo-filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`todo-filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`todo-filter-btn ${
            filter === "completed" ? "active" : ""
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <Motion.li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="todo-content">
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-text">{todo.title}</span>
              </div>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {filteredTodos.length === 0 && (
        <p className="todo-empty">No todos found.</p>
      )}
    </div>
  );
};

export default Todo;
