import { schema as basicSchema } from 'prosemirror-schema-basic'
import { Schema, NodeSpec, MarkSpec } from 'prosemirror-model'
import OrderedMap from 'orderedmap'
import { commentNodeSpec } from './plugins/comments'
import highlightMarkSpec from './marks/highlightMark'

const basicNodes = basicSchema.spec.nodes as OrderedMap<NodeSpec>
const basicMarks = basicSchema.spec.marks as OrderedMap<MarkSpec>
const nodes = basicNodes.append({
  comment: commentNodeSpec,
})
const marks = basicMarks.append({
  highlight: highlightMarkSpec,
})

const schema = new Schema({
  nodes,
  marks,
})

export default schema
