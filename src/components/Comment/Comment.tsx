import './Comment.scss'
import { useEffect, useState, MutableRefObject } from 'react'
interface CommentProps {
  parent: HTMLElement
  viewHost: MutableRefObject<HTMLDivElement>
  user: { id: number; color: string }
  text: string
}

export default function Comment({
  parent,
  viewHost,
  user,
  text,
}: CommentProps) {
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
    <div
      style={{ ...position, borderColor: user.color }}
      className="commentCard"
    >
      {text}
    </div>
  )

  function getPos() {
    const { top } = parent.getBoundingClientRect()
    const { left: editorLeft } = viewHost.current.getBoundingClientRect()
    return { top, left: editorLeft - 210 }
  }
}
