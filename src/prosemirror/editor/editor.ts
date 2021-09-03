import { EditorView } from 'prosemirror-view'
import { EditorState } from 'prosemirror-state'
import schema from '../schema'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap, toggleMark, setBlockType } from 'prosemirror-commands'
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror'
import {
  commentsPlugin,
  addComment as pluginAddComment,
} from '../../prosemirror/plugins/comments'
import { yProvider, yType, yDoc } from '../../adapters/yjs'
import { ReactPortal } from 'react'

export const editor = (
  mount: Node,
  addComment: (comment: ReactPortal) => void,
  removeComment: (id: string) => void,
) => {
  const state = EditorState.create({
    schema,
    plugins: [
      ySyncPlugin(yType),
      yCursorPlugin(yProvider.awareness),
      yUndoPlugin(),
      keymap({ 'mod-z': undo, 'mod-y': redo }),
      keymap(baseKeymap),
      commentsPlugin(yDoc, addComment, removeComment),
    ],
  })

  const view = new EditorView(mount, { state })
  view.focus()

  const editorActions = {
    setMark(mark: string, attrs?: { [key: string]: any }) {
      view.focus()
      toggleMark(schema.marks[mark], attrs)(view.state, view.dispatch)
    },
    setBlock(node: 'paragraph' | 'heading', attrs?: { [key: string]: any }) {
      view.focus()
      setBlockType(schema.nodes[node], attrs)(view.state, view.dispatch)
    },
    comment(id: string, user: user, text: string) {
      view.focus()
      pluginAddComment(id, user, text)(view)
    },
  }
  return { view, editorActions }
}
