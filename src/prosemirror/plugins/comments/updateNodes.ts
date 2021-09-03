import { Transaction } from 'prosemirror-state'
import { Node } from 'prosemirror-model'

export default function updateNodes(tr: Transaction) {
  let resultTr = tr
  for (let i = 0; i < tr.doc.nodeSize; i++) {
    let node: Node<any> | null | undefined
    try {
      node = tr.doc.nodeAt(i)
    } catch (e) {
      node = null
    }

    if (node && node.type.name === 'comment') {
      const commentStr = node.attrs['data-comment']
      const comment = JSON.parse(commentStr) as EditorComment
      const range = comment.to - comment.from
      comment.from = i
      comment.to = resultTr.mapping?.map(i + range)
      console.log({ from: comment.from, to: comment.to }, -1)
      resultTr = resultTr.setNodeMarkup(i, undefined, {
        'data-comment': JSON.stringify(comment),
      })
    }
  }
  return resultTr
}
