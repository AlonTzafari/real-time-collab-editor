import './Editor.scss'
import schema from '../../prosemirror/schema' //'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap, toggleMark, setBlockType } from 'prosemirror-commands'
import { useEffect, useRef, MutableRefObject, useContext } from 'react'
import { addComment } from '../../prosemirror/plugins/comments'

import MenuBar from '../MenuBar'
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror'
import yContext from '../../contexts/yContext'
import CommentView from '../../prosemirror/nodeViews/CommentView'

export default function Editor() {
  const viewHost = useRef() as MutableRefObject<HTMLDivElement>
  const viewRef = useRef() as MutableRefObject<EditorView>
  const { yProvider, yType } = useContext(yContext)

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
      //   nodeViews: {
      //     //@ts-ignore
      //     comment(node, view, getPos) {
      //       return new CommentView(node, view, getPos)
      //     },
      //   },
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
    setBlock(node: string) {
      const { current: view } = viewRef
      view.focus()
      setBlockType(schema.nodes[node])(view.state, view.dispatch)
    },
    setComment() {
      const { current: view } = viewRef
      view.focus()
      const user = {
        id: yProvider.awareness.clientID,
        color: yProvider.awareness.getLocalState()!.user.color,
      }
      addComment(user, view)
    },
  }

  return (
    <>
      <MenuBar editorActions={editorActions} view={viewRef} />
      <div className="editor" ref={viewHost} />
    </>
  )
}
