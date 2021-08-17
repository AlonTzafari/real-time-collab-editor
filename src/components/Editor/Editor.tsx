import './Editor.scss'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { useEffect, useRef, MutableRefObject, useContext } from 'react'
import MenuBar from '../MenuBar'
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror'
import yContext from '../../contexts/yContext'

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
    viewRef.current = new EditorView(viewHost.current, { state })
    const { current: view } = viewRef
    view.focus()
    return () => view.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editorActions = {
    setMark(mark: string) {
      const { current: view } = viewRef
      view.focus()
      toggleMark(schema.marks[mark])(view.state, view.dispatch)
    },
  }

  return (
    <>
      <MenuBar editorActions={editorActions} view={viewRef} />
      <div className="editor" ref={viewHost} />
    </>
  )
}
