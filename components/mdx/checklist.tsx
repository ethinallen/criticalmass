'use client'

import { useState } from 'react'

export function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <ul className="my-6 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={checked.has(i)}
            onChange={() => toggle(i)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-green-600"
          />
          <span
            className={
              checked.has(i)
                ? 'text-gray-400 line-through dark:text-gray-500'
                : ''
            }
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
