import './MenuBar.scss'
import { MouseEventHandler } from 'react'

interface MenuBarProps {
  editorActions: { [key: string]: Function }
}

export default function MenuBar({ editorActions }: MenuBarProps) {
  const boldHandler: MouseEventHandler = (e) => {
    editorActions.setBold()
    e.preventDefault()
  }

  return (
    <div className="menuBar">
      <button onClick={boldHandler}>B</button>
    </div>
  )
}
