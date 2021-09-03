import './Editor.scss'
import { EditorView } from 'prosemirror-view'
import 'prosemirror-view/style/prosemirror.css'
import {
  useEffect,
  useRef,
  MutableRefObject,
  useState,
  ReactPortal,
} from 'react'

import MenuBar from '../MenuBar'
import editor from '../../prosemirror/editor'

export default function Editor() {
  const viewHost = useRef() as MutableRefObject<HTMLDivElement>
  const viewRef = useRef() as MutableRefObject<EditorView>
  const actionsRef = useRef({} as { [key: string]: any })
  const [comments, setComments] = useState<{ [key: string]: ReactPortal }>({})

  const addComment = (comment: ReactPortal) => {
    comments[comment.key as string] = comment
    setComments({ ...comments })
  }
  const removeComment = (id: string) => {
    console.log('id to remove', id)

    delete comments[id]
    setComments({ ...comments })
  }

  useEffect(() => {
    const { view, editorActions } = editor(
      viewHost.current,
      addComment,
      removeComment,
    )
    viewRef.current = view
    actionsRef.current = editorActions
    return () => view.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [comments])

  return (
    <>
      <MenuBar editorActions={actionsRef} view={viewRef} />
      <div className="editor" ref={viewHost} />
      {Object.values(comments)}
    </>
  )
}
