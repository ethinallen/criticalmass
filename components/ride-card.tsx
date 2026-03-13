import Link from 'next/link'
import { RideStatusBadge } from './ride-status-badge'

interface RideCardProps {
  slug: string
  displayName: string
  city: string
  country: string
  frequency: string | null
  meetingPoint: string | null
  status: 'active' | 'provisional' | 'dormant'
}

export function RideCard({
  slug,
  displayName,
  city,
  country,
  frequency,
  meetingPoint,
  status,
}: RideCardProps) {
  return (
    <Link
      href={`/ride/${slug}`}
      className="block rounded-lg border border-gray-200 p-5 transition-colors hover:border-cm-green hover:bg-gray-50 dark:border-gray-700 dark:hover:border-cm-green dark:hover:bg-gray-800/50"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-semibold">{displayName}</h3>
        <RideStatusBadge status={status} />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {city}, {country}
      </p>
      {frequency && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          {frequency}
        </p>
      )}
      {meetingPoint && (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-600">
          {meetingPoint}
        </p>
      )}
    </Link>
  )
}
