import './Comment.scss'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
interface CommentProps {
  parent: HTMLElement
}

export default function Comment({ parent }: CommentProps) {
  useEffect(() => {
    console.log(parent.getBoundingClientRect())
  })
  return <div className="commentCard">comment</div>
}
