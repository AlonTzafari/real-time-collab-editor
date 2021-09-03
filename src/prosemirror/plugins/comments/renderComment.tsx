import { Decoration } from 'prosemirror-view'

export default function renderComment(comment: EditorComment) {
  const { from, to, data } = comment
  const decoColor = data.user.color + '80'
  return Decoration.inline(from, to, {
    style: `background-color: ${decoColor}`,
  })
}
