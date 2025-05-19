import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Users from './components/Users'
import UsersHOC from './components/UsersHOC'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Users />
        <UsersHOC />
      </div>

    </>
  )
}

export default App
