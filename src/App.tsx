import './App.scss'
import Editor from './components/Editor'
import MenuBar from './components/MenuBar'
import Header from './components/Header'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Editor />
    </div>
  )
}
