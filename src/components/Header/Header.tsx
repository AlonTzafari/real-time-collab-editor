import './Header.scss'
import { useState, useEffect } from 'react'
import UserAvatar from '../UserAvatar'
import { WebsocketProvider } from 'y-websocket'

export default function Header() {
  const [users, setUsers] = useState([] as { [key: string]: any }[])
  const yProvider = (window as any).yProvider as WebsocketProvider

  useEffect(() => {
    const changeListener = (changes: any) => {
      console.log(changes)
      const newUsers = Array.from(yProvider.awareness.getStates()).map(
        ([id, content]) => Object.assign(content.user, { id }),
      )
      setUsers(newUsers)
    }
    yProvider.awareness.on('change', changeListener)
    return () => yProvider.awareness.off('change', changeListener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="header">
      {Array.from(users).map((user) => (
        <UserAvatar key={user.id} user={user} />
      ))}
    </header>
  )
}
