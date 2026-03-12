import type { ReactNode } from 'react'

const variants = {
  info: {
    border: 'border-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    icon: 'ℹ️',
  },
  warning: {
    border: 'border-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    icon: '⚠️',
  },
  tip: {
    border: 'border-green-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
    icon: '💡',
  },
  important: {
    border: 'border-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    icon: '📌',
  },
} as const

export function Callout({
  type = 'info',
  children,
}: {
  type?: keyof typeof variants
  children: ReactNode
}) {
  const v = variants[type]
  return (
    <div
      className={`my-6 rounded-lg border-l-4 ${v.border} ${v.bg} p-4`}
      role="note"
    >
      <div className="flex gap-3">
        <span className="shrink-0 text-lg" aria-hidden>
          {v.icon}
        </span>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
