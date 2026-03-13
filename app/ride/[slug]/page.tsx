import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { db } from '@/src/db'
import { rides, maintainers, users } from '@/src/db/schema'
import { eq } from 'drizzle-orm'
import { RideStatusBadge } from '@/components/ride-status-badge'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const ride = await db.query.rides.findFirst({
    where: eq(rides.slug, slug),
  })

  if (!ride) return { title: 'Ride Not Found' }

  return {
    title: ride.displayName,
    description: ride.description || `Critical Mass ${ride.city}, ${ride.country}`,
  }
}

export default async function RidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const ride = await db.query.rides.findFirst({
    where: eq(rides.slug, slug),
  })

  if (!ride) notFound()

  const rideMaintainers = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      role: maintainers.role,
    })
    .from(maintainers)
    .innerJoin(users, eq(maintainers.userId, users.id))
    .where(eq(maintainers.rideId, ride.id))

  const daysUntilDeadline = ride.provisionalDeadline
    ? Math.ceil(
        (ride.provisionalDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      )
    : null

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {ride.status === 'provisional' && daysUntilDeadline !== null && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
          This page is provisional. The organizer has{' '}
          <strong>{Math.max(0, daysUntilDeadline)} days</strong> to publish the
          required information.
        </div>
      )}

      {ride.status === 'dormant' && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          This ride appears to be dormant. If you&apos;re actively organizing
          this ride, you can{' '}
          <Link href="/claim" className="font-medium text-cm-green hover:underline">
            reclaim this page
          </Link>
          .
        </div>
      )}

      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {ride.displayName}
        </h1>
        <RideStatusBadge status={ride.status} />
      </div>

      <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
        {ride.city}
        {ride.state ? `, ${ride.state}` : ''}, {ride.country}
      </p>

      <div className="space-y-6">
        {ride.description && (
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
              About
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{ride.description}</p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {ride.frequency && (
            <div>
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Frequency
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{ride.frequency}</p>
            </div>
          )}

          {ride.meetingTime && (
            <div>
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Meeting time
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{ride.meetingTime}</p>
            </div>
          )}

          {ride.meetingPoint && (
            <div>
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Meeting point
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {ride.meetingPoint}
              </p>
            </div>
          )}

          {ride.contactMethod && (
            <div>
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Contact
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {ride.contactMethod}
              </p>
            </div>
          )}
        </div>

        {ride.websiteUrl && (
          <div>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Website
            </h2>
            <a
              href={ride.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cm-green hover:underline"
            >
              {ride.websiteUrl}
            </a>
          </div>
        )}

        {rideMaintainers.length > 0 && (
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Maintainers
            </h2>
            <div className="flex flex-wrap gap-3">
              {rideMaintainers.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  {m.image && (
                    <img
                      src={m.image}
                      alt=""
                      className="h-6 w-6 rounded-full"
                    />
                  )}
                  <span className="text-sm">
                    {m.name}
                    {m.role === 'primary' && (
                      <span className="ml-1 text-xs text-gray-400">
                        (primary)
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12">
        <Link
          href="/find-a-ride"
          className="text-sm text-gray-500 hover:text-cm-green"
        >
          &larr; Back to all rides
        </Link>
      </div>
    </div>
  )
}
