import { MarkSpec, Mark } from 'prosemirror-model'

const highlightMarkSpec: MarkSpec = {
  group: 'inline',
  content: 'inline* text*',
  inline: true,
  selectable: true,
  attrs: { color: { default: '#ff0000' } },
  toDOM: (mark: Mark, inline: boolean) => {
    const commentMark = document.createElement('span')
    commentMark.classList.add('highlight')
    commentMark.id = mark.attrs.id
    commentMark.style.backgroundColor = mark.attrs.color
    return commentMark
  },
  parseDOM: [{ tag: 'span.highlight' }],
}
export default highlightMarkSpec
