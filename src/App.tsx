import './App.css'
import Editor from './components/Editor'
import MenuBar from './components/MenuBar'
import Header from './components/Header'

export default function App() {
  return (
    <div className="App">
      <div
        style={{
          margin: 'auto',
          width: '600px',
          border: '1px solid grey',
        }}
      >
        <Header />
        <Editor />
      </div>
    </div>
  )
}
