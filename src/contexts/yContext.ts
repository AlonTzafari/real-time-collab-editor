import { createContext } from 'react'
import { yProvider, yType } from '../adapters/yjs'

const localState = yProvider.awareness.getLocalState()
if (
  !localState ||
  !localState.user ||
  !localState.user.color ||
  !localState.user.name
) {
  yProvider.awareness.setLocalStateField('user', {
    color: assignColor(),
    name: assignName(),
  })
}

const yContext = createContext({
  yProvider,
  yType,
})
export default yContext

function assignColor(): string {
  const colors = [
    '#b61010',
    '#0d0dbb',
    '#096809',
    '#9b9b08',
    '#914091',
    '#9c620b',
  ]
  const randomColor = colors[Math.floor(colors.length * Math.random())]
  return randomColor
}

function assignName(): string {
  const names = ['Jhon', 'Roy', 'Raje', 'Olaf', 'Jake', 'Bolt']
  const randomName = names[Math.floor(names.length * Math.random())]
  return randomName
}
