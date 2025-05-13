import React from "react";
import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
} from "./api";

class App extends React.Component {
  state = {
    todos: [],
    newTodo: "",
  };

  async componentDidMount() {
    const todos = await getTodos();
    this.setState({ todos });
  }

  handleChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleAdd = async () => {
    const trimmed = this.state.newTodo.trim();
    if (!trimmed) return;

    const newItem = await addTodo(trimmed);
    this.setState((prev) => ({
      todos: [...prev.todos, newItem],
      newTodo: "",
    }));
  };

  handleDelete = async (id) => {
    await deleteTodo(id);
    this.setState((prev) => ({
      todos: prev.todos.filter((todo) => todo.id !== id),
    }));
  };

  handleToggle = async (id, currentStatus) => {
    const updated = await toggleTodo(id, !currentStatus);
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? updated : todo
      ),
    }));
  };

  renderTodos = (todos, isCompletedList) =>
    todos.map((todo) => (
      <div
        key={todo.id}
        style={{
          background: "#eee8d5",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{todo.text}</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              background: "green",
              border: "none",
              padding: "5px 10px",
              fontWeight: "bold",
            }}
            onClick={() => this.handleToggle(todo.id, todo.completed)}
          >
            {isCompletedList ? "⬅" : "➡"}
          </button>
          <button
            style={{
              background: "#dc3545",
              color: "white",
              border: "none",
              padding: "5px 10px",
            }}
            onClick={() => this.handleDelete(todo.id)}
          >
            🗑
          </button>
        </div>
      </div>
    ));

  render() {
    const { todos, newTodo } = this.state;
    const pending = todos.filter((t) => !t.completed);
    const completed = todos.filter((t) => t.completed);

    return (
  <div
  style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#ffffff",
  }}
>
  <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
    <input
      type="text"
      value={this.state.newTodo}
      onChange={this.handleChange}
      style={{ padding: "8px", width: "300px" }}
    />
    <button
      onClick={this.handleAdd}
      style={{
        padding: "8px 16px",
        fontWeight: "bold",
        border: "1px solid #333",
        borderRadius: "5px",
      }}
    >
      Submit
    </button>
  </div>

  <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginTop: "20px",
    flexWrap: "wrap",
  }}
>
  <div style={{ width: "350px" }}>

      <h3 style={{ textAlign: "center" }}>Pending Tasks</h3>
      {this.renderTodos(this.state.todos.filter((t) => !t.completed), false)}
    </div>
    <div style={{ flex: 1, minWidth: "300px" }}>
      <h3 style={{ textAlign: "center" }}>Completed Tasks</h3>
      {this.renderTodos(this.state.todos.filter((t) => t.completed), true)}
    </div>
  </div>
</div>

);

  }
}

export default App;
