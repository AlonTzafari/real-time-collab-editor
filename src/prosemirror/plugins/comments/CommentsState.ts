import { EditorState, Transaction } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { YMap } from 'yjs/dist/src/internals'
import {
  ySyncPluginKey,
  relativePositionToAbsolutePosition,
  absolutePositionToRelativePosition,
} from 'y-prosemirror'
import commentsKey from './commentsKey'

function deco(comment: EditorComment) {
  const { from, to, data } = comment
  return Decoration.inline(
    from,
    to,
    { class: 'comment', style: `border-color: ${data.user.color}` },
    { data },
  )
}

interface RelativeComment {
  from: any
  to: any
  data: {
    id: string
    user: user
    text: string
  }
}

export default class CommentsState {
  map: YMap<RelativeComment>
  decorations = DecorationSet.empty

  constructor(map: YMap<RelativeComment>) {
    this.map = map
  }

  findComment(id: string) {
    return this.map.get(id)
  }

  addComment(comment: EditorComment, state: EditorState) {
    const yState = ySyncPluginKey.getState(state)
    const { type, binding } = yState
    const from = absolutePositionToRelativePosition(
      comment.from,
      type,
      binding.mapping,
    )
    const to = absolutePositionToRelativePosition(
      comment.to,
      type,
      binding.mapping,
    )
    const relativeComment: RelativeComment = {
      from,
      to,
      data: { ...comment.data },
    }
    const {
      data: { id },
    } = relativeComment
    this.map.set(id, relativeComment)
  }

  deleteComment(id: string) {
    this.map.delete(id)
  }

  createDecorations(state: EditorState) {
    const yState = ySyncPluginKey.getState(state)
    const { doc, type, binding } = yState
    const decorations: Decoration[] = []

    if (!binding) return this.decorations
    const commentIdsToRemove: string[] = []
    this.map.forEach((relativeComment, id) => {
      const from = relativePositionToAbsolutePosition(
        doc,
        type,
        relativeComment.from,
        binding.mapping,
      )
      const to = relativePositionToAbsolutePosition(
        doc,
        type,
        relativeComment.to,
        binding?.mapping,
      )

      if (!from || !to) {
        return
      }

      if (to <= from + 1) commentIdsToRemove.push(id)

      const comment: EditorComment = {
        from,
        to,
        data: relativeComment.data,
      }
      decorations.push(deco(comment))
    })

    commentIdsToRemove.forEach((id) => this.deleteComment(id))

    this.decorations = DecorationSet.create(state.doc, decorations)
    return this.decorations
  }
  apply(tr: Transaction, state: EditorState) {
    const action = tr.getMeta(commentsKey)
    const actionType = action && action.type
    if (action && actionType) {
      if (actionType === 'newComment') this.addComment(action.comment, state)
      else if (actionType === 'deleteComment') this.deleteComment(action.id)
      this.createDecorations(state)
    }
    const ystate = ySyncPluginKey.getState(state)
    if (ystate.isChangeOrigin) {
      this.createDecorations(state)

      return this
    }
    return this
  }

  static init(map: YMap<EditorComment>) {
    return new CommentsState(map)
  }
}
