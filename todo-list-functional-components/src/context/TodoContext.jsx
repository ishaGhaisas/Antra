import { createContext, useReducer, useEffect } from "react";
import { getTodos, addTodo, deleteTodo, toggleTodo, editTodo } from "../api";
import { initialState, todoReducer } from "../reducer/TodoReducer";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    getTodos().then((data) =>
      dispatch({ type: "SET_TODOS", payload: data })
    );
  }, []);

  const add = async (text) => {
    const newTodo = await addTodo(text);
    dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  const remove = async (id) => {
    await deleteTodo(id);
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const toggle = async (id, completed) => {
    const updated = await toggleTodo(id, completed);
    dispatch({ type: "TOGGLE_TODO", payload: updated });
  };

  const edit = async (id, text) => {
    const updated = await editTodo(id, text);
    dispatch({ type: "EDIT_TODO", payload: updated });
  };

  return (
    <TodoContext.Provider value={{ todos: state.todos, add, remove, toggle, edit }}>
      {children}
    </TodoContext.Provider>
  );
};
