import { EditorView } from 'prosemirror-view'
import { EditorState } from 'prosemirror-state'
import schema from '../schema'
import { keymap } from 'prosemirror-keymap'
import {
  baseKeymap,
  toggleMark,
  setBlockType,
  wrapIn,
} from 'prosemirror-commands'
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror'
import { commentsPlugin, commentsKey } from '../../prosemirror/plugins/comments'
import { yProvider, yType, yDoc } from '../../adapters/yjs'

export const editor = (mount: Node) => {
  const state = EditorState.create({
    schema,
    plugins: [
      ySyncPlugin(yType),
      yCursorPlugin(yProvider.awareness),
      yUndoPlugin(),
      keymap({ 'mod-z': undo, 'mod-y': redo }),
      keymap(baseKeymap),
      commentsPlugin(yDoc),
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
    wrapSelection(
      node: 'comment' | 'someInline',
      attrs?: { [key: string]: any },
    ) {
      view.focus()
      wrapIn(schema.nodes[node], attrs)(view.state, view.dispatch)
    },
    comment(id: string, user: user, text: string) {
      const { state } = view
      const { from, to } = state.selection
      const data = { id, user, text }
      const comment: EditorComment = { from, to, data }
      const tr = state.tr.setMeta(commentsKey, { type: 'newComment', comment })
      view.dispatch(tr)
    },
    renderComments() {
      view.dispatch(
        view.state.tr.setMeta(commentsKey, { type: 'createDecorations' }),
      )
    },
  }
  return { view, editorActions }
}
