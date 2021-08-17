import './App.scss'
// import Editor from '../../components/Editor'
import Header from './components/Header'
import usersContext from './contexts/usersContext'
import Main from './pages/Main'
import { useState } from 'react'

export default function App() {
  const [users, setUsers] = useState(
    new Map() as Map<
      number,
      {
        [x: string]: any
      }
    >,
  )

  return (
    <div className="App">
      <usersContext.Provider value={{ users, setUsers }}>
        <Header />
        <Main />
      </usersContext.Provider>
    </div>
  )
}
