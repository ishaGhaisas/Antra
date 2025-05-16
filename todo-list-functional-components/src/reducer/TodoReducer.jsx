export const initialState = {
  todos: [],
};

export function todoReducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };

    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.completed }
            : todo
        ),
      };

    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    default:
      return state;
  }
}
