import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Critical Mass — Start, Find, and Sustain Rides Worldwide',
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <section className="mb-20 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight">
          Critical Mass is a bike ride.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
          Critical Mass is a global movement of cyclists riding together to
          celebrate bikes, reclaim streets, and build community. This platform
          helps you find a ride, start a ride, and keep it going.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/find-a-ride"
            className="rounded-lg bg-cm-green px-6 py-3 text-lg font-semibold text-white hover:opacity-90"
          >
            Find a Ride
          </Link>
          <Link
            href="/start-a-ride"
            className="rounded-lg border-2 border-cm-green px-6 py-3 text-lg font-semibold text-cm-green hover:bg-cm-green hover:text-white"
          >
            Start a Ride
          </Link>
          <Link
            href="/claim"
            className="rounded-lg border-2 border-gray-300 px-6 py-3 text-lg font-semibold text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300"
          >
            Claim Your City
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold">What is Critical Mass?</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Critical Mass is a monthly bike ride that happens in hundreds of
          cities worldwide. There&apos;s no organization, no registration, no
          fee. Riders meet at a set time and place and ride together through the
          streets. It started in San Francisco in 1992 and has since spread to
          every continent.
        </p>
        <Link
          href="/what-is-critical-mass"
          className="font-medium text-cm-green hover:underline"
        >
          Learn more about the movement &rarr;
        </Link>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold">Organizer Toolkit</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Everything you need to start and sustain a ride: checklists, route
          planning guides, outreach templates, design assets, and lessons from
          cities around the world.
        </p>
        <Link
          href="/toolkit"
          className="font-medium text-cm-green hover:underline"
        >
          Browse the toolkit &rarr;
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Community stewardship</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          This platform provides a fair system for local communities to claim
          and maintain their city page. We protect against squatting, support
          leadership transitions, and keep ride information current.
        </p>
        <Link
          href="/governance"
          className="font-medium text-cm-green hover:underline"
        >
          Read the governance model &rarr;
        </Link>
      </section>
    </div>
  )
}
