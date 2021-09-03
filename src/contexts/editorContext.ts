import { createContext, MutableRefObject } from 'react'
import { EditorView } from 'prosemirror-view'

const view: MutableRefObject<EditorView> | null = null

const editorContext = createContext({
  view,
})
