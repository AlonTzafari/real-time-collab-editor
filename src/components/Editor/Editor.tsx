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
  const view = useRef() as MutableRefObject<EditorView>

  useEffect(() => {
    // initial render
    const state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap({ 'mod-z': undo, 'mod-y': redo }),
        keymap(baseKeymap),
      ],
    })
    view.current = new EditorView(viewHost.current, { state })
    view.current.focus()
    view.current.dispatch(view.current.state.tr.insertText('Hello World'))
    view.current.dispatch(
      view.current.state.tr.setSelection(
        TextSelection.atEnd(view.current.state.doc),
      ),
    )
    return () => view.current!.destroy()
  }, [])

  //   useEffect(() => {
  //     // every render
  //     const tr = view.current.state.tr.setMeta(reactPropsKey, props)
  //     view.current.dispatch(tr)
  //   })

  return (
    <>
      <MenuBar />
      <div className="editor" ref={viewHost}></div>
    </>
  )
}
