import './MenuBar.scss'
import { MouseEventHandler, MutableRefObject } from 'react'
import { EditorView } from 'prosemirror-view'

interface MenuBarProps {
  editorActions: { [key: string]: Function }
  view: MutableRefObject<EditorView>
}

export default function MenuBar({ editorActions, view }: MenuBarProps) {
  const boldHandler: MouseEventHandler = (e) => {
    editorActions.setMark('strong')
    e.preventDefault()
  }
  const italicHandler: MouseEventHandler = (e) => {
    editorActions.setMark('em')
    e.preventDefault()
  }

  return (
    <div className="menuBar">
      <button
        style={{ fontWeight: 'bold' }}
        className="menuBtn"
        onClick={boldHandler}
      >
        B
      </button>
      <button
        style={{ fontStyle: 'italic' }}
        className="menuBtn"
        onClick={italicHandler}
      >
        I
      </button>
    </div>
  )
}
