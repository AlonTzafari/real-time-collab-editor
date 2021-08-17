import { schema as basicSchema } from 'prosemirror-schema-basic'
import { Schema, NodeSpec, MarkSpec } from 'prosemirror-model'
import OrderedMap from 'orderedmap'
import commentNodeSpec from './nodes/commentNode'
import commentMarkSpec from './marks/commentMark'

const basicNodes = basicSchema.spec.nodes as OrderedMap<NodeSpec>
const nodes = basicNodes //.append({ comment: commentNodeSpec })
const basicMarks = basicSchema.spec.marks as OrderedMap<MarkSpec>
const marks = basicMarks.append({ comment: commentMarkSpec })

const schema = new Schema({
  nodes,
  marks,
})

export default schema
