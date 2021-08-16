import './Editor.scss'
import { schema } from 'prosemirror-schema-basic'
import { EditorState, TextSelection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { useEffect, useRef, MutableRefObject } from 'react'
import MenuBar from '../MenuBar'

export default function Editor() {
  const viewHost = useRef() as MutableRefObject<HTMLDivElement>
  const viewRef = useRef() as MutableRefObject<EditorView>

  useEffect(() => {
    const state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap({ 'mod-z': undo, 'mod-y': redo }),
        keymap(baseKeymap),
      ],
    })
    viewRef.current = new EditorView(viewHost.current, { state })
    const { current: view } = viewRef
    view.focus()
    view.dispatch(view.state.tr.insertText('Hello World'))
    view.dispatch(
      view.state.tr.setSelection(TextSelection.atEnd(view.state.doc)),
    )
    return () => view.destroy()
  }, [])

  const editorActions = {
    setBold() {
      const { current: view } = viewRef
      view.focus()
      const { state } = view
      const isBold = state.doc
        .nodeAt(state.selection.$from.pos)
        ?.marks.some((mark) => mark.type.name === 'strong')
      view.dispatch(
        state.tr[isBold ? 'removeMark' : 'addMark'](
          state.selection.$from.pos,
          state.selection.$to.pos,
          schema.mark('strong'),
        ),
      )
    },
  }

  return (
    <>
      <MenuBar editorActions={editorActions} />
      <div className="editor" ref={viewHost}></div>
    </>
  )
}
