import { EditorView } from 'prosemirror-view'
import commentsKey from './commentsKey'

export default function addComment(id: string, user: user, text: string) {
  return (view: EditorView) => {
    const { from, to } = view.state.selection
    if (to <= from || !from || !to) return false
    const data = { id, user, text }
    const comment: EditorComment = { from, to, data }
    //add comment node to doc
    const tr1 = view.state.tr.insert(
      from,
      view.state.schema.node('comment', {
        'data-comment': JSON.stringify(comment),
      }),
    )
    view.dispatch(tr1)
    //add comment range data after comment node changed doc
    const tr2 = view.state.tr.setMeta(commentsKey, {
      type: 'newComment',
      comment,
    })
    view.dispatch(tr2)

    //TODO: check if tr1 can be applied to state & change range accordingly to dispatch once
  }
}
