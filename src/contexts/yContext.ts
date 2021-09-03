import { createContext } from 'react'
import { yProvider, yType } from '../adapters/yjs'

yProvider.awareness.setLocalStateField('user', {
  color: assignColor(),
  name: assignName(),
})
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
  return randomColor
}

function assignName(): string {
  const names = ['Jhon', 'Roy', 'Raje', 'Olaf', 'Jake', 'Bolt']
  const randomName = names[Math.floor(names.length * Math.random())]
  return randomName
}
