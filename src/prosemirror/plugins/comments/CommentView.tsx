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
  }

  init() {
    const comment = JSON.parse(this.node.attrs['data-comment']) as EditorComment
    this.dom = document.createElement('comment')
    this.dom.classList.add('comment-ref')
    this.dom.setAttribute('data-comment', this.node.attrs['data-comment'])
    const anchor = document.createElement('div')
    anchor.classList.add('comment-anchor')
    anchor.id = comment.data.id
    document.body.appendChild(anchor)
    const portal = createPortal(
      <Comment parent={this.dom} comment={comment} />,
      anchor,
      comment.data.id,
    )
    this.portal = portal
    this.addComment(portal)

    return this
  }

  destroy() {
    const comment = JSON.parse(this.node.attrs['data-comment']) as EditorComment
    const selector = `[id="${comment.data.id}"]`
    document.querySelector(selector)?.remove()
    if (this.portal?.key) this.removeComment(this.portal.key as string)
    this.view.dispatch(
      this.view.state.tr.setMeta(commentsKey, {
        type: 'deleteComment',
        id: comment.data.id,
      }),
    )
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
