import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const yDoc = new Y.Doc()
export const yProvider = new WebsocketProvider(
  'ws://localhost:8080',
  'prosemirror',
  yDoc,
)
export const yType = yDoc.getXmlFragment('prosemirror')
