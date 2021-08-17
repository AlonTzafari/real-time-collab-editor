import { createContext, Dispatch, SetStateAction } from 'react'

const setUsers: Dispatch<
  SetStateAction<
    Map<
      number,
      {
        [x: string]: any
      }
    >
  >
> = () => {}

const usersContext = createContext({
  users: new Map() as Map<
    number,
    {
      [x: string]: any
    }
  >,
  setUsers,
})
export default usersContext
