"use client"

import { useFounderContext } from "../contexts/founder-context"
import AppLayout from "../layout/app-layout"
import { useEffect, useRef, useState } from "react"
import "gridstack/dist/gridstack.min.css"

// Allowed sizes in grid units: [w, h]
const allowedSizes = [
  { w: 2, h: 2 },   // 250x250
  { w: 4, h: 2 },   // 520x250
  { w: 4, h: 4 },   // 520x520
  { w: 8, h: 4 },   // 1060x520
]

function snapToAllowedSize(w: number, h: number) {
  // Find the allowed size with the smallest distance
  let minDist = Infinity
  let best = allowedSizes[0]
  for (const size of allowedSizes) {
    const dist = Math.abs(size.w - w) + Math.abs(size.h - h)
    if (dist < minDist) {
      minDist = dist
      best = size
    }
  }
  return best
}

export default function Dashboard() {
  const { state } = useFounderContext()
  const gridRef = useRef<HTMLDivElement>(null)
  const [cards, setCards] = useState([
    { id: 1, x: 0, y: 0, w: 2, h: 2, label: "Card 1" },
    { id: 2, x: 2, y: 0, w: 4, h: 2, label: "Card 2" },
    { id: 3, x: 4, y: 0, w: 4, h: 4, label: "Card 3" },
  ])
  const [nextId, setNextId] = useState(4)

  useEffect(() => {
    let grid: any
    if (typeof window !== "undefined" && gridRef.current) {
      // Dynamically import gridstack only on client
      import("gridstack").then(({ GridStack }) => {
        grid = GridStack.init({
          float: true,
          cellHeight: 80,
          margin: 24,
        }, gridRef.current!)
        // Snap resizing to allowed sizes only
        grid.on('resizestop', (event: any, el: any) => {
          const node = el.gridstackNode
          if (!node) return
          const { w, h } = snapToAllowedSize(node.w, node.h)
          if (node.w !== w || node.h !== h) {
            grid.update(el, { w, h })
          }
        })
        // Optionally, you can load widgets dynamically here
      })
    }
    return () => {
      if (grid) grid.destroy(false)
    }
  }, [cards])

  function getNextPosition() {
    // Find the next available y position (stack below the lowest card)
    let maxY = 0
    for (const card of cards) {
      const bottom = card.y + card.h
      if (bottom > maxY) maxY = bottom
    }
    return { x: 0, y: maxY }
  }

  const handleAddCard = () => {
    const pos = getNextPosition()
    setCards([
      ...cards,
      {
        id: nextId,
        x: pos.x,
        y: pos.y,
        w: 2,
        h: 2,
        label: `Card ${nextId}`,
      },
    ])
    setNextId(nextId + 1)
  }

  return (
    <AppLayout title="Dashboard">
      {/* Custom style to increase the resize handle area */}
      <style>{`
        .grid-stack .ui-resizable-se {
          width: 32px !important;
          height: 32px !important;
          right: -16px !important;
          bottom: -16px !important;
        }
      `}</style>
      <div className="mb-4 flex justify-start">
        <button
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition font-medium text-sm"
          onClick={handleAddCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 3.5v13m6.5-6.5h-13" />
          </svg>
          Add New Card
        </button>
      </div>
      <div ref={gridRef} className="grid-stack" style={{ minHeight: 600 }}>
        {cards.map(card => (
          <div
            key={card.id}
            className="grid-stack-item"
            gs-x={card.x}
            gs-y={card.y}
            gs-w={card.w}
            gs-h={card.h}
            gs-min-w="2" gs-max-w="8"
            gs-min-h="2" gs-max-h="4"
            gs-resize-handles="e, se, s"
          >
            <div className="grid-stack-item-content bg-white border border-gray-300 rounded-xl flex items-center justify-center p-4">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
