const variants = {
  available: {
    bg: 'bg-green-100 dark:bg-green-900/40',
    text: 'text-green-800 dark:text-green-300',
    label: 'Available',
  },
  'coming-soon': {
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    text: 'text-amber-800 dark:text-amber-300',
    label: 'Coming Soon',
  },
  beta: {
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-800 dark:text-blue-300',
    label: 'Beta',
  },
} as const

export function StatusBadge({
  status,
}: {
  status: keyof typeof variants
}) {
  const v = variants[status]
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${v.bg} ${v.text}`}
    >
      {v.label}
    </span>
  )
}
