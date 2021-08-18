import { Node } from 'prosemirror-model'
import { EditorView, NodeView } from 'prosemirror-view'
import { createPortal } from 'react-dom'
import { ReactPortal } from 'react'
import Comment from '../../components/Comment'

export class CommentView implements NodeView {
  node
  dom: HTMLElement | undefined
  contentDOM: HTMLElement | undefined
  view: EditorView
  portal: ReactPortal | undefined
  addComment: (portal: ReactPortal) => void

  constructor(
    node: Node,
    view: EditorView,
    getPos: boolean | (() => number),
    addComment: (portal: ReactPortal) => void,
  ) {
    this.node = node
    this.view = view
    this.addComment = addComment
  }

  init() {
    this.dom = document.createElement('span')
    this.dom.classList.add('comment')
    this.dom.id = this.node.attrs.id
    this.dom.style.borderColor = this.node.attrs.user.color
    const commentCard = document.createElement('div')
    commentCard.classList.add('comment-anchor')
    document.body.append(commentCard)
    const portal = createPortal(
      <Comment parent={this.dom as HTMLElement} />,
      commentCard,
      this.node.attrs.id,
    )
    this.portal = portal
    this.addComment(portal)

    return this
  }
}
