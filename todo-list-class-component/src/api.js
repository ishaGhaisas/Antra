const BASE_URL = "http://localhost:3001/todos";

export async function getTodos() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function addTodo(text) {
  const newTodo = {
    text,
    completed: false,
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });

  return res.json();
}

export async function deleteTodo(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
}

export async function toggleTodo(id, completed) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });

  return res.json();
}

