import './UserAvatar.scss'

interface userAvatarProps {
  user: {
    [key: string]: any
  }
}

export default function UserAvatar({ user }: userAvatarProps) {
  return (
    <div className="userAvatar" style={{ backgroundColor: user.color }}>
      {user.id.toString()}
    </div>
  )
}
