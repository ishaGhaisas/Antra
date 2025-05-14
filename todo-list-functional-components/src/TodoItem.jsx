import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa"; 

const TodoItem = ({ task, onDelete, onToggle, onMove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const updatedTodo = await editTodo(task.id, newText);
        task.text = updatedTodo.text; 
      } catch (error) {
        console.error("Error editing todo:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <span>{task.text}</span>
      )}

      <div className="button-group">
        <button className="edit-btn" onClick={handleEdit}>
          <FaEdit />
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          <FaTrashAlt />
        </button>
        <button className="move-btn" onClick={() => onMove(task.id, !task.completed)}>
          {task.completed ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
