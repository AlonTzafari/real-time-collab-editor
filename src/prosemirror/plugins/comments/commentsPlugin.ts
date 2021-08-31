import { Plugin } from 'prosemirror-state'
import { Doc } from 'yjs/dist/src/internals'
import CommentsState from './CommentsState'
import commentsKey from './commentsKey'

const commentsPlugin = (yDoc: Doc) => {
  const map = yDoc.getMap('prosemirror-comments')
  return new Plugin({
    key: commentsKey,
    state: {
      init: () => {
        return CommentsState.init(map)
      },
      apply: (transaction, commentState, state) =>
        commentState.apply(transaction, state),
    },
    props: {
      decorations(state) {
        return this.getState(state).createDecorations(state)
      },
    },
  })
}
export default commentsPlugin
