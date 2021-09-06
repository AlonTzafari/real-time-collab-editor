import './Comment.scss'
import { useEffect, useState } from 'react'
import UserAvatar from '../UserAvatar'

interface CommentProps {
  parent: HTMLElement
  comment: EditorComment
  close: () => void
}

export default function Comment({ parent, comment, close }: CommentProps) {
  const [position, setPosition] = useState(getPos())

  useEffect(() => {
    setPosition(getPos())

    const resizeListener = (e: UIEvent) => {
      setPosition(getPos())
    }

    window.addEventListener('resize', resizeListener)

    return () => window.removeEventListener('resize', resizeListener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={position} className="commentCard">
      <UserAvatar user={comment.data.user} />
      <button onClick={() => close()}>X</button>
      {comment.data.text}
    </div>
  )

  function getPos(): { top: number; right: number } {
    try {
      const { top } = parent.getBoundingClientRect()
      const { right } = document
        .querySelector('.editor')!
        .getBoundingClientRect()
      return { top, right: right - 990 }
    } catch (e) {
      return position || { top: 0, right: 0 }
    }
  }
}
