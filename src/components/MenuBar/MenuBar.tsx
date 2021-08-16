import './MenuBar.scss'
import { MouseEventHandler } from 'react'
import { Selection } from 'prosemirror-state'

interface MenuBarProps {
  editorActions: { [key: string]: Function }
  selection: null | Selection<any>
}

export default function MenuBar({ editorActions, selection }: MenuBarProps) {
  //   useEffect(() => {
  //     console.log(
  //       selection === null
  //         ? 'no selection'
  //         : selection.empty
  //         ? 'nothing selected'
  //         : 'content selected',
  //     )
  //   }, [selection])
  const boldHandler: MouseEventHandler = (e) => {
    editorActions.setMark('strong')
    e.preventDefault()
  }
  const italicHandler: MouseEventHandler = (e) => {
    editorActions.setMark('em')
    e.preventDefault()
  }

  return (
    <div className="menuBar">
      <button
        style={{ fontWeight: 'bold' }}
        className="menuBtn"
        onClick={boldHandler}
      >
        B
      </button>
      <button
        style={{ fontStyle: 'italic' }}
        className="menuBtn"
        onClick={italicHandler}
      >
        I
      </button>
    </div>
  )
}
