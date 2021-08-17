import { createContext } from 'react'
import { yProvider, yType } from '../adapters/yjs'

yProvider.awareness.setLocalStateField('user', { color: assignColor() })
const yContext = createContext({
  yProvider,
  yType,
})
export default yContext

function assignColor(): string {
  const colors = [
    '#ff0000',
    '#0000ff',
    '#008000',
    '#ffff00',
    '#ee82ee',
    '#008833',
  ]
  const randomColor = colors[Math.floor(colors.length * Math.random())]
  const userColors = Array.from(yProvider.awareness.getStates()).map(
    ([id, state]) => state.user?.color,
  )
  if (userColors.length === 1) return randomColor
  for (let i = 0; i < colors.length; i++) {
    if (userColors.includes(colors[i])) continue
    else return colors[i]
  }
  return randomColor
}