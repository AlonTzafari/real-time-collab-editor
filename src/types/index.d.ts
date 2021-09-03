interface user {
  id: number
  color: string
  name?: string
}

interface EditorComment {
  from: number
  to: number
  data: {
    id: string
    user: user
    text: string
  }
}

type PortalsSetter = Dispatch<SetStateAction<ReactPortal[]>>
