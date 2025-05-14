import React, { useState, useEffect } from "react";
import { getTodos, addTodo, deleteTodo, toggleTodo } from "./api"; 
import TodoItem from "./TodoItem";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");  
  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []); 

  const handleAdd = async () => {
    if (newTask.trim()) {
      try {
        const newTodo = await addTodo(newTask);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setNewTask("");  
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const updatedTask = await toggleTodo(id, completed);
      setTodos((prevTodos) =>
        prevTodos.map((task) =>
          task.id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div className="todo-list-container">
      <div className="new-task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAdd}>Submit</button>
      </div>

      <div className="task-lists">
        <div className="task-section pending">
          <h2>Pending Tasks</h2>
          {todos.filter((task) => !task.completed).length === 0 ? (
            <p>No pending tasks available</p>
          ) : (
            todos
              .filter((task) => !task.completed)
              .map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onMove={handleToggle}
                />
              ))
          )}
        </div>

        <div className="task-section completed">
          <h2>Completed Tasks</h2>
          {todos.filter((task) => task.completed).length === 0 ? (
            <p>No completed tasks available</p>
          ) : (
            todos
              .filter((task) => task.completed)
              .map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onMove={handleToggle}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
