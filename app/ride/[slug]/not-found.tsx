import Link from 'next/link'

export default function RideNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
        Ride not found
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
        This ride doesn&apos;t exist yet. Want to start one?
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/start-a-ride"
          className="rounded-lg bg-cm-green px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          Start a ride
        </Link>
        <Link
          href="/find-a-ride"
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold dark:border-gray-600"
        >
          Browse rides
        </Link>
      </div>
    </div>
  )
}
