import './Editor.scss'
import { schema } from 'prosemirror-schema-basic'
import { EditorState, Selection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import MenuBar from '../MenuBar'

export default function Editor() {
  const viewHost = useRef() as MutableRefObject<HTMLDivElement>
  const viewRef = useRef() as MutableRefObject<EditorView>
  const [selection, setSelection] = useState(null as null | Selection)

  useEffect(() => {
    const state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap({ 'mod-z': undo, 'mod-y': redo }),
        keymap(baseKeymap),
      ],
    })
    let prevSelection: null | Selection<any> = null
    viewRef.current = new EditorView(viewHost.current, {
      state,
      dispatchTransaction(transaction) {
        const changed = !prevSelection?.eq(transaction.selection)
        prevSelection = transaction.selection
        if (changed) setSelection(prevSelection)

        const newState = viewRef.current.state.apply(transaction)
        viewRef.current.updateState(newState)
      },
    })
    const { current: view } = viewRef
    view.focus()
    return () => view.destroy()
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
      <MenuBar editorActions={editorActions} selection={selection} />
      <div className="editor" ref={viewHost} />
    </>
  )
}
