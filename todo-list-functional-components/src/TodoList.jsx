import { useContext, useRef, useState, useMemo } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "./context/TodoContext";

const TodoList = () => {
  const { todos, add, toggle, remove } = useContext(TodoContext);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  const handleAdd = async () => {
    if (newTask.trim()) {
      await add(newTask);
      setNewTask("");
      inputRef.current.focus();
    }
  };

  const pendingTodos = useMemo(() => todos.filter((t) => !t.completed), [todos]);
  const completedTodos = useMemo(() => todos.filter((t) => t.completed), [todos]);

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
                onDelete={remove}
                onMove={toggle}
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
                onDelete={remove}
                onMove={toggle}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
