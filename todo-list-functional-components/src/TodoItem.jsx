import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";
import { TodoContext } from "./context/TodoContext";


const TodoItem = ({ task, onDelete, onMove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const { edit } = useContext(TodoContext);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await edit(task.id, newText);
      } catch (error) {
        console.error("Error editing todo:", error);
      }
    }
    setIsEditing(!isEditing);
  };


  return (
    <div className="todo-item">
      {task.completed && (
        <button className="move-btn" onClick={() => onMove(task.id, false)}>
          <FaArrowLeft />
        </button>
      )}

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
      </div>

      {!task.completed && (
        <button className="move-btn" onClick={() => onMove(task.id, true)}>
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default React.memo(TodoItem);