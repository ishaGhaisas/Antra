import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { getTodos, addTodo, deleteTodo, toggleTodo } from "./api";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAdd = async () => {
    if (newTask.trim()) {
        const newTodo = await addTodo(newTask);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setNewTask("");
        inputRef.current.focus();
    }
  };

  const handleDelete = useCallback(async (id) => {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((task) => task.id !== id));
  }, []);

  const handleToggle = useCallback(async (id, completed) => {
      const updatedTask = await toggleTodo(id, completed);
      setTodos((prevTodos) =>
        prevTodos.map((task) =>
          task.id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
  }, []);

  const pendingTodos = useMemo(() => {
    return todos.filter((task) => !task.completed);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter((task) => task.completed);
  }, [todos]);

  return (
    <div className="todo-list-container">
      <div className="new-task-input">
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAdd}>Submit</button>
      </div>

      <div className="task-lists">
        <div className="task-section pending">
          <h3>Pending Tasks</h3>
          {pendingTodos.length === 0 ? (
            <p>No pending tasks available</p>
          ) : (
            pendingTodos.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onMove={handleToggle}
              />
            ))
          )}
        </div>

        <div className="task-section completed">
          <h3>Completed Tasks</h3>
          {completedTodos.length === 0 ? (
            <p>No completed tasks available</p>
          ) : (
            completedTodos.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
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
