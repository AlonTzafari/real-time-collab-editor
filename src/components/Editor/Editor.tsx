import './Editor.scss'
import schema from '../../prosemirror/schema' //'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { keymap } from 'prosemirror-keymap'
import {
  baseKeymap,
  toggleMark,
  setBlockType,
  wrapIn,
} from 'prosemirror-commands'
import React, {
  useEffect,
  useRef,
  MutableRefObject,
  useContext,
  useState,
  ReactPortal,
} from 'react'

import MenuBar from '../MenuBar'
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror'
import yContext from '../../contexts/yContext'
import { CommentView } from '../../prosemirror/nodeViews/CommentView'

export default function Editor() {
  const viewHost = useRef() as MutableRefObject<HTMLDivElement>
  const viewRef = useRef() as MutableRefObject<EditorView>
  const { yProvider, yType } = useContext(yContext)
  const [comments, setComments] = useState([] as ReactPortal[])

  const addComment = (comment: ReactPortal) => {
    setComments([...comments, comment])
  }

  useEffect(() => {
    const state = EditorState.create({
      schema,

      plugins: [
        ySyncPlugin(yType),
        yCursorPlugin(yProvider.awareness),
        yUndoPlugin(),
        keymap({ 'mod-z': undo, 'mod-y': redo }),
        keymap(baseKeymap),
      ],
    })
    viewRef.current = new EditorView(viewHost.current, {
      state,
      nodeViews: {
        comment(node, view, getPos) {
          return new CommentView(node, view, getPos, addComment).init()
        },
      },
    })
    const { current: view } = viewRef
    view.focus()
    return () => view.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editorActions = {
    setMark(mark: string, attrs?: { [key: string]: any }) {
      const { current: view } = viewRef
      view.focus()
      toggleMark(schema.marks[mark], attrs)(view.state, view.dispatch)
    },
    setBlock(node: 'paragraph' | 'heading', attrs?: { [key: string]: any }) {
      const { current: view } = viewRef
      view.focus()
      setBlockType(schema.nodes[node], attrs)(view.state, view.dispatch)
    },
    wrapSelection(
      node: 'comment' | 'someInline',
      attrs?: { [key: string]: any },
    ) {
      const { current: view } = viewRef
      view.focus()
      wrapIn(schema.nodes[node], attrs)(view.state, view.dispatch)
    },
  }

  return (
    <>
      <MenuBar editorActions={editorActions} view={viewRef} />
      <div className="editor" ref={viewHost} />
      {comments}
    </>
  )
}
