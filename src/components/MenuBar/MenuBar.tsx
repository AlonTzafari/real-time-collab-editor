import './MenuBar.scss'
import {
  MouseEventHandler,
  MutableRefObject,
  useContext,
  useState,
} from 'react'
import { EditorView } from 'prosemirror-view'
import yContext from '../../contexts/yContext'
import { v4 as uuidv4 } from 'uuid'

interface MenuBarProps {
  editorActions: { [key: string]: Function }
  view: MutableRefObject<EditorView>
}
export default function MenuBar({ editorActions, view }: MenuBarProps) {
  const [highlightColor, setHighlightColor] = useState('#ffff00') // TODO: Add marker color selector
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
    const user = yProvider.awareness.getLocalState()!.user
    const text = prompt('Write Comment')
    editorActions.setMark('comment', {
      id: uuidv4(),
      user,
      text,
    })
    e.preventDefault()
  }
  const highlightHandler: MouseEventHandler = (e) => {
    editorActions.setMark('highlight', {
      color: highlightColor,
    })
    e.preventDefault()
  }

  return (
    <div className="menuBar">
      <button
        title="Bold"
        style={{ fontWeight: 'bold' }}
        className="menuBtn"
        onClick={boldHandler}
      >
        B
      </button>
      <button
        title="Italic"
        style={{ fontStyle: 'italic' }}
        className="menuBtn"
        onClick={italicHandler}
      >
        I
      </button>
      <button title="Paragraph" className="menuBtn" onClick={paragraphHandler}>
        P
      </button>
      <button title="Header" className="menuBtn" onClick={headingHandler}>
        H
      </button>
      <button title="Marker" className="menuBtn" onClick={highlightHandler}>
        🖌
      </button>
      <button title="Comment" className="menuBtn" onClick={commentHandler}>
        💬
      </button>
    </div>
  )
}
