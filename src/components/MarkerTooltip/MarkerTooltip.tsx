import './MarkerTooltip.scss'
import { useState } from 'react'

interface MarkerTooltipProps {
  current: string
  onSelect: (color: string) => void
}

export default function MarkerTooltip({
  current,
  onSelect,
}: MarkerTooltipProps) {
  const [open, setOpen] = useState(false)
  const select = (color: string) => {
    onSelect(color)
    setOpen(false)
  }
  return (
    <div className="markerTooltip">
      <div
        className="color"
        style={{ backgroundColor: current }}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="pallet">
          <div
            className="color"
            style={{ backgroundColor: 'yellow' }}
            onClick={() => select('yellow')}
          />
          <div
            className="color"
            style={{ backgroundColor: 'cyan' }}
            onClick={() => select('cyan')}
          />
          <div
            className="color"
            style={{ backgroundColor: 'lime' }}
            onClick={() => select('lime')}
          />
          <div
            className="color"
            style={{ backgroundColor: 'red' }}
            onClick={() => select('red')}
          />
        </div>
      )}
    </div>
  )
}

// interface PalletProps {
//     onSelect: (color: string) => void
//   }

// function Pallet({onSelect}: PalletProps) {
//     return (
//         <div>

//         </div>
//     )
// }
