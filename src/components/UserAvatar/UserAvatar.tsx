import './UserAvatar.scss'

interface userAvatarProps {
  user: {
    [key: string]: any
  }
}

export default function UserAvatar({ user }: userAvatarProps) {
  return (
    <div className="userAvatar" style={{ borderColor: user.color }}>
      {user.name}
    </div>
  )
}
