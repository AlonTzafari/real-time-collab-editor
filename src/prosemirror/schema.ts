import { schema as basicSchema } from 'prosemirror-schema-basic'
import { Schema, NodeSpec, MarkSpec } from 'prosemirror-model'
import OrderedMap from 'orderedmap'
import commentNodeSpec from './nodes/commentNode'
import highlightMarkSpec from './marks/highlightMark'

const basicNodes = basicSchema.spec.nodes as OrderedMap<NodeSpec>
const basicMarks = basicSchema.spec.marks as OrderedMap<MarkSpec>
const nodes = basicNodes
const marks = basicMarks.append({
  highlight: highlightMarkSpec,
  comment: commentNodeSpec,
})

const schema = new Schema({
  nodes,
  marks,
})

export default schema
