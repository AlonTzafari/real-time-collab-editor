import { Decoration } from 'prosemirror-view'

export default function renderComment(comment: EditorComment) {
  const { from, to, data } = comment
  const userColor = data.user.color
  const decoColor = userColor + '80'
  return Decoration.inline(from, to, {
    style: `background-color: ${decoColor}`,
  })
}
