import { MarkSpec } from 'prosemirror-model'
const commentNodeSpec: MarkSpec = {
  content: 'text*',
  attrs: {
    id: { default: 0 },
    user: { default: { id: 0, color: '#FFF' } },
    text: { default: '' },
  },
  parseDOM: [{ tag: 'span.comment' }],
}
export default commentNodeSpec
