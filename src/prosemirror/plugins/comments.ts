// import { AddMarkStep } from 'prosemirror-transform'
import { Transaction } from 'prosemirror-state'
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view'

//     export default new Plugin({
//         state: {
//             init() {},
//             apply(tr, prev) {
//                 const commentMarkSteps = tr.steps
//                 .filter(step => step instanceof AddMarkStep || step instanceof RemoveMarkStep)
//                 //@ts-ignore
//                 .filter(step.mark.type.name === 'comment')
//                 for(const commentMark of commentMarkSteps) {

//                 }
//             },
//         },
//         props: {
//             decorations(state) {
//                 return this.getState(state).comments.decorations
//             },
//         },
//         key: new PluginKey('comments'),
//     })
// }

export function addComment(
  user: { id: number; color: string },
  view: EditorView,
  dispatch?: (tr: Transaction) => boolean,
) {
  const { state } = view
  const { from, to } = state.selection
  const textDecoration = Decoration.inline(from, to, {
    class: 'comment',
    style: `border-color:${user.color}`,
  })
  const widgetElement = document.createElement('div')
  widgetElement.classList.add('commentWidget')

  const widget = Decoration.widget(from, widgetElement)
  const curDecorations = view.props.decorations
    ? view.props.decorations(state)
    : view.props.decorations
  const newDecorations = curDecorations
    ? curDecorations.add(state.doc, [textDecoration, widget])
    : DecorationSet.create(state.doc, [textDecoration, widget])
  view.setProps({ decorations: () => newDecorations })
}
