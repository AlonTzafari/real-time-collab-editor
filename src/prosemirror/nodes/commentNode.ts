import { MarkSpec } from 'prosemirror-model'
const commentNodeSpec: MarkSpec = {
  content: 'text*',
  attrs: {
    id: { default: 0 },
    user: { default: { id: 0, color: '#FFF' } },
  },
  parseDOM: [{ tag: 'span.comment' }],
}
export default commentNodeSpec
