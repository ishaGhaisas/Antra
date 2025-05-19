import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Users from './components/Users'
import UsersHOC from './components/UsersHOC'
import Loading from './components/Loading'
import LoadingHoc from './components/LoadingHoc'
import Logger from './components/Logger'
import LoggerHoc from './components/LoggerHoc'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Users />
        <UsersHOC />
        <hr/>
        <Loading/>
        <LoadingHoc/>
        <hr/>
        <Logger/>
        <LoggerHoc/>
      </div>

    </>
  )
}

export default App
