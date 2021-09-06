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
import CommentEditor from '../CommentEditor'

interface MenuBarProps {
  editorActions: MutableRefObject<{ [key: string]: (...args: any[]) => any }>
  view: MutableRefObject<EditorView>
}
export default function MenuBar({ editorActions, view }: MenuBarProps) {
  const [highlightColor, setHighlightColor] = useState('#ffff00') // TODO: Add marker color selector
  const [isCommentEditorOpen, setCommentEditor] = useState(false)
  const { yProvider } = useContext(yContext)
  const boldHandler: MouseEventHandler = (e) => {
    editorActions.current.setMark('strong')
    e.preventDefault()
  }
  const italicHandler: MouseEventHandler = (e) => {
    editorActions.current.setMark('em')
    e.preventDefault()
  }
  const paragraphHandler: MouseEventHandler = (e) => {
    editorActions.current.setBlock('paragraph')
    e.preventDefault()
  }
  const headingHandler: MouseEventHandler = (e) => {
    editorActions.current.setBlock('heading')
    e.preventDefault()
  }
  const commentHandler: MouseEventHandler = (e) => {
    setCommentEditor(true)
    e.preventDefault()
  }

  const createComment = (text: string) => {
    const id = uuidv4()
    const user = yProvider.awareness.getLocalState()!.user
    editorActions.current.comment(id, user, text)
    setCommentEditor(false)
  }

  const highlightHandler: MouseEventHandler = (e) => {
    editorActions.current.setMark('highlight', {
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
      {isCommentEditorOpen && <CommentEditor onClose={createComment} />}
    </div>
  )
}
