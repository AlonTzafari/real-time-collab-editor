import './Header.scss'
import { useState, useEffect, useContext } from 'react'
import yContext from '../../contexts/yContext'
import UserAvatar from '../UserAvatar'

export default function Header() {
  const [users, setUsers] = useState([] as { [key: string]: any }[])
  const { yProvider } = useContext(yContext)

  useEffect(() => {
    const changeListener = (changes: any) => {
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
