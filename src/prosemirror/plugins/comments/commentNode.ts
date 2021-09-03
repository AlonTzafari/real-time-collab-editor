import { NodeSpec } from 'prosemirror-model'
const commentNodeSpec: NodeSpec = {
  group: 'inline',
  inline: true,
  atom: true,
  selectable: false,

  content: '',
  attrs: {
    'data-comment': { default: '' },
  },
  toDOM: (node) => [
    'span',
    { class: 'comment-ref', 'data-comment': node.attrs['data-comment'] },
  ],
  parseDOM: [
    {
      tag: 'span.comment-ref',
      getAttrs(dom) {
        return {
          'data-comment': (dom as HTMLElement).getAttribute('data-comment'),
        }
      },
    },
  ],
}
export default commentNodeSpec
