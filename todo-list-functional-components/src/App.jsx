import './App.css'
import { TodoProvider } from './context/TodoContext'
import TodoList from './TodoList'

function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  )
}

export default App
