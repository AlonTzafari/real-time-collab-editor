import { EditorState, Transaction } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { YMap } from 'yjs/dist/src/internals'
import {
  ySyncPluginKey,
  relativePositionToAbsolutePosition,
  absolutePositionToRelativePosition,
} from 'y-prosemirror'
import commentsKey from './commentsKey'
import { Node } from 'prosemirror-model'
import renderComment from './renderComment'

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

  getCommentPos(comment: EditorComment, state: EditorState) {
    for (let i = 0; i < state.doc.nodeSize; i++) {
      const node = state.doc.nodeAt(i)
      if (
        node &&
        node.type.name === 'comment' &&
        node.attrs.id === comment.data.id
      )
        return i
    }
    return -1
  }

  findCommentNodes(state: EditorState) {
    const commentNodes: Node[] = []
    findInChildren(state.doc)
    function findInChildren(node: Node) {
      if (node.type.name === 'comment') commentNodes.push(node)
      else node.content.forEach((childNode) => findInChildren(childNode))
    }
    return commentNodes
  }

  addComment(comment: EditorComment, state: EditorState) {
    const yState = ySyncPluginKey.getState(state)
    const { type, binding } = yState

    const from = absolutePositionToRelativePosition(
      comment.from,
      type,
      binding?.mapping,
    )
    const to = absolutePositionToRelativePosition(
      comment.to,
      type,
      binding?.mapping,
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
    if (!binding) return this.decorations

    //find all comment nodes in document
    const commentNodes = this.findCommentNodes(state)

    const decorations: Decoration[] = []
    commentNodes.forEach((commentNode) => {
      const comment = JSON.parse(
        commentNode.attrs['data-comment'],
      ) as EditorComment
      const relativeComment = this.map.get(comment.data.id)

      if (!relativeComment) return

      //get absolute from, to values from shared map
      const from = relativePositionToAbsolutePosition(
        doc,
        type,
        relativeComment.from,
        binding?.mapping,
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
      comment.from = from
      comment.to = to

      const decoration = renderComment(comment)

      decorations.push(decoration)
    })

    this.decorations = DecorationSet.create(state.doc, decorations)
    return this.decorations
  }

  apply(tr: Transaction, state: EditorState) {
    const action = tr.getMeta(commentsKey)
    const actionType = action && action.type
    if (action && actionType) {
      if (actionType === 'newComment') this.addComment(action.comment, state)
      else if (actionType === 'deleteComment') this.deleteComment(action.id)
    }
    return this
  }

  static init(map: YMap<EditorComment>) {
    return new CommentsState(map)
  }
}
