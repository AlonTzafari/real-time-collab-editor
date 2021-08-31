import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export const yDoc = new Y.Doc()
export const yProvider = new WebsocketProvider(
  'ws://localhost:1234',
  'prosemirror',
  yDoc,
  {},
)
export const yType = yDoc.getXmlFragment('prosemirror')
