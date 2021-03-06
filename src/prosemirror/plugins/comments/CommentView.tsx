import { Node } from 'prosemirror-model'
import { EditorView, NodeView } from 'prosemirror-view'
import { createPortal } from 'react-dom'
import { ReactPortal } from 'react'
import Comment from '../../../components/Comment'
import commentsKey from './commentsKey'

export default class CommentView implements NodeView {
  node
  dom: HTMLElement | undefined
  contentDOM: HTMLElement | undefined
  view: EditorView
  portal: ReactPortal | undefined
  addComment: (portal: ReactPortal) => void
  removeComment: (id: string) => void
  getPos: () => number

  constructor(
    node: Node,
    view: EditorView,
    getPos: boolean | (() => number),
    addComment: (portal: ReactPortal) => void,
    removeComment: (id: string) => void,
  ) {
    this.node = node
    this.view = view
    this.addComment = addComment
    this.removeComment = removeComment
    this.getPos = getPos as () => number
  }

  init() {
    const comment = JSON.parse(this.node.attrs['data-comment']) as EditorComment
    //node rendering
    this.dom = document.createElement('comment')
    this.dom.classList.add('comment-ref')
    this.dom.setAttribute('data-comment', this.node.attrs['data-comment'])
    //portal anchor
    const anchor = document.createElement('div')
    anchor.classList.add('comment-anchor')
    anchor.id = comment.data.id
    document.body.appendChild(anchor)

    const deleteComment = () => {
      const pos = this.getPos()
      const state = this.view.state
      const tr = state.tr
        .delete(pos, pos + 1)
        .setMeta(commentsKey, { type: 'deleteComment', id: comment.data.id })
      this.view.dispatch(tr)
    }

    const portal = createPortal(
      <Comment
        parent={this.dom}
        comment={comment}
        close={deleteComment.bind(this)}
      />,
      anchor,
      comment.data.id,
    )
    this.portal = portal
    this.addComment(portal)

    return this
  }

  destroy() {
    //remove anchor
    const comment = JSON.parse(this.node.attrs['data-comment']) as EditorComment
    const selector = `[id="${comment.data.id}"]`
    document.querySelector(selector)?.remove()

    //remove portal from state
    if (this.portal?.key) this.removeComment(this.portal.key as string)

    //remove comment from shared map
    const tr = this.view.state.tr.setMeta(commentsKey, {
      type: 'deleteComment',
      id: comment.data.id,
    })
    this.view.dispatch(tr)
  }
}

export const commentView = (
  node: Node,
  view: EditorView,
  getPos: boolean | (() => number),
  addComment: (portal: ReactPortal) => void,
  removeComment: (id: string) => void,
) => {
  return new CommentView(node, view, getPos, addComment, removeComment)
}
