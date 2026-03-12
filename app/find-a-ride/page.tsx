import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find a Ride',
  description:
    'Find a Critical Mass ride near you. Searchable directory of rides worldwide.',
}

export default function FindARidePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Find a ride
      </h1>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
          The ride directory is coming soon. When it launches, you&apos;ll be
          able to search for Critical Mass rides by city, country, or status.
        </p>
        <p className="text-gray-500 dark:text-gray-500">
          In the meantime, try searching for &quot;Critical Mass [your
          city]&quot; on social media, or{' '}
          <Link
            href="/start-a-ride"
            className="font-medium text-cm-green hover:underline"
          >
            start a ride
          </Link>{' '}
          in your city.
        </p>
      </div>
    </div>
  )
}
