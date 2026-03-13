import Link from 'next/link'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { db } from '@/src/db'
import { rides } from '@/src/db/schema'
import { like, eq, or, sql, count } from 'drizzle-orm'
import { RideCard } from '@/components/ride-card'
import { SearchFilters } from '@/components/search-filters'

export const metadata: Metadata = {
  title: 'Find a Ride',
  description:
    'Find a Critical Mass ride near you. Searchable directory of rides worldwide.',
}

export const dynamic = 'force-dynamic'

async function RideDirectory({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) {
  const q = searchParams.q
  const country = searchParams.country
  const status = searchParams.status

  const conditions = []

  if (q) {
    const pattern = `%${q}%`
    conditions.push(
      or(
        like(rides.city, pattern),
        like(rides.country, pattern),
        like(rides.displayName, pattern),
      ),
    )
  }

  if (country) {
    conditions.push(eq(rides.countryCode, country.toUpperCase()))
  }

  if (status && ['active', 'provisional', 'dormant'].includes(status)) {
    conditions.push(
      eq(rides.status, status as 'active' | 'provisional' | 'dormant'),
    )
  }

  const where =
    conditions.length > 0
      ? sql`${sql.join(
          conditions.map((c) => c!),
          sql` AND `,
        )}`
      : undefined

  const [ridesList, totalResult] = await Promise.all([
    db.select().from(rides).where(where).orderBy(rides.city),
    db.select({ count: count() }).from(rides).where(where),
  ])

  const total = totalResult[0]?.count ?? 0

  if (ridesList.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
          No rides found matching your search.
        </p>
        <Link
          href="/start-a-ride"
          className="font-medium text-cm-green hover:underline"
        >
          Start a ride in your city &rarr;
        </Link>
      </div>
    )
  }

  return (
    <>
      <p className="mb-4 text-sm text-gray-500">
        Showing {ridesList.length} of {total} rides
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {ridesList.map((ride) => (
          <RideCard
            key={ride.id}
            slug={ride.slug}
            displayName={ride.displayName}
            city={ride.city}
            country={ride.country}
            frequency={ride.frequency}
            meetingPoint={ride.meetingPoint}
            status={ride.status}
          />
        ))}
      </div>
    </>
  )
}

export default async function FindARidePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const params = await searchParams

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Find a ride
      </h1>
      <Suspense>
        <SearchFilters />
      </Suspense>
      <Suspense
        fallback={
          <div className="py-8 text-center text-gray-400">Loading rides...</div>
        }
      >
        <RideDirectory searchParams={params} />
      </Suspense>
    </div>
  )
}
