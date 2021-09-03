import { Plugin } from 'prosemirror-state'
import { Doc } from 'yjs/dist/src/internals'
import CommentsState from './CommentsState'
import commentsKey from './commentsKey'
import { ReactPortal } from 'react'
import CommentView from './CommentView'

const commentsPlugin = (
  yDoc: Doc,
  addComment: (comment: ReactPortal) => void,
  removeComment: (id: string) => void,
) => {
  const map = yDoc.getMap('prosemirror-comments')
  return new Plugin({
    key: commentsKey,
    state: {
      init: () => CommentsState.init(map),
      apply: (tr, pluginState, state) => pluginState.apply(tr, state),
    },
    props: {
      nodeViews: {
        comment(node, view, getPos) {
          return new CommentView(
            node,
            view,
            getPos,
            addComment,
            removeComment,
          ).init()
        },
      },
      decorations(state) {
        return this.getState(state).createDecorations(state)
      },
    },
  })
}
export default commentsPlugin
