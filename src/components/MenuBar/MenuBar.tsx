import './MenuBar.scss'
import { MouseEventHandler, MutableRefObject, useContext } from 'react'
import { EditorView } from 'prosemirror-view'
import yContext from '../../contexts/yContext'

interface MenuBarProps {
  editorActions: { [key: string]: Function }
  view: MutableRefObject<EditorView>
}

export default function MenuBar({ editorActions, view }: MenuBarProps) {
  const { yProvider } = useContext(yContext)
  const boldHandler: MouseEventHandler = (e) => {
    editorActions.setMark('strong')
    e.preventDefault()
  }
  const italicHandler: MouseEventHandler = (e) => {
    editorActions.setMark('em')
    e.preventDefault()
  }
  const paragraphHandler: MouseEventHandler = (e) => {
    editorActions.setBlock('paragraph')
    e.preventDefault()
  }
  const headingHandler: MouseEventHandler = (e) => {
    editorActions.setBlock('heading')
    e.preventDefault()
  }
  const commentHandler: MouseEventHandler = (e) => {
    console.log(yProvider.awareness.getLocalState()!.user.color)

    editorActions.setMark('comment', {
      color: yProvider.awareness.getLocalState()!.user.color,
    })
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
      <button className="menuBtn" onClick={paragraphHandler}>
        P
      </button>
      <button className="menuBtn" onClick={headingHandler}>
        H
      </button>
      <button className="menuBtn" onClick={commentHandler}>
        c+
      </button>
    </div>
  )
}
