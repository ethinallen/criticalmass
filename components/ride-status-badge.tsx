const statusStyles = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  provisional:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  dormant: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

export function RideStatusBadge({
  status,
}: {
  status: 'active' | 'provisional' | 'dormant'
}) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}
