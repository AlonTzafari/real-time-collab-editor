import './CommentEditor.scss'
import { createPortal } from 'react-dom'
import { FormEventHandler, useRef, useContext } from 'react'
import UserAvatar from '../UserAvatar'
import yContext from '../../contexts/yContext'

interface CommentEditorProps {
  onClose: (text: string) => void
}

export default function CommentEditor({ onClose }: CommentEditorProps) {
  const textRef = useRef<HTMLInputElement>(null)
  const { yProvider } = useContext(yContext)

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    onClose(textRef.current?.value || '')
    e.preventDefault()
  }
  return createPortal(
    <div className="commentEditorCover">
      <div className="commentEditor">
        <UserAvatar user={yProvider.awareness.getLocalState()!.user} />
        <form onSubmit={submitHandler}>
          <input ref={textRef} type="text" />
          <button type="submit">➤</button>
        </form>
      </div>
    </div>,
    document.body,
  )
}
