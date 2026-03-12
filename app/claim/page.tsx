import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claim Your City',
  description:
    'Request a community page for your city on the Critical Mass platform.',
}

export default function ClaimPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Claim your city page
      </h1>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
          The claim system is coming soon. When it launches, you&apos;ll be
          able to request a community page for your city, complete with ride
          details, contact info, and an optional subdomain.
        </p>
        <p className="mb-6 text-gray-500 dark:text-gray-500">
          Before claiming a page, we recommend reading through the{' '}
          <Link
            href="/governance"
            className="font-medium text-cm-green hover:underline"
          >
            governance model
          </Link>{' '}
          to understand how community pages are stewarded.
        </p>
        <Link
          href="/start-a-ride"
          className="rounded-lg bg-cm-green px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          Start a ride first &rarr;
        </Link>
      </div>
    </div>
  )
}
