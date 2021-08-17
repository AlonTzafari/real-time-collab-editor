import { NodeSpec } from 'prosemirror-model'
const commentNodeSpec: NodeSpec = {
  group: 'inline',
  content: 'inline* text*',
  inline: true,
  selectable: true,
  toDOM: () => ['span.comment', 0],
  parseDOM: [{ tag: 'span.comment' }],
}
export default commentNodeSpec
