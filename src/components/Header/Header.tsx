import React from 'react'

export default function Header() {
  return (
    <header
      style={{
        height: 50,
        display: 'grid',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        boxSizing: 'border-box',
        borderBottom: '1px solid grey',
      }}
    ></header>
  )
}
