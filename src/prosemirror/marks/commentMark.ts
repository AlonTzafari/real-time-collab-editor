import { MarkSpec, Mark } from 'prosemirror-model'
const commentMarkSpec: MarkSpec = {
  group: 'inline',
  content: 'inline* text*',
  inline: true,
  selectable: true,
  attrs: { color: { default: '#ff0000' } },
  toDOM: (mark: Mark, inline: boolean) => {
    const comment = document.createElement('span')
    comment.classList.add('comment')
    comment.style.borderColor = mark.attrs.color
    return comment
  },
  parseDOM: [{ tag: 'span.comment' }],
}
export default commentMarkSpec
