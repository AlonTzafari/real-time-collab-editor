import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { useEffect, useRef, MutableRefObject } from 'react'
import MenuBar from '../MenuBar'

export default function Editor() {
  const viewHost = useRef() as MutableRefObject<HTMLDivElement>
  const view = useRef() as MutableRefObject<EditorView>

  useEffect(() => {
    // initial render
    console.log(schema)

    const state = EditorState.create({ schema })
    view.current = new EditorView(viewHost.current, { state })
    view.current.focus()
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
      <div style={{ overflow: 'hidden' }} ref={viewHost}></div>
    </>
  )
}
