import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Ride',
  description:
    'How to start a Critical Mass ride in your city — a step-by-step guide.',
}

export default function StartARidePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Start a ride in your city
      </h1>

      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p className="text-xl">
          Starting a Critical Mass ride is simpler than you think. You don&apos;t
          need permission, a formal organization, or a large group. You just
          need a time, a place, and people who want to ride.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Step 1: Check if a ride already exists
        </h2>
        <p>
          Before starting a new ride,{' '}
          <Link
            href="/find-a-ride"
            className="font-medium text-cm-green hover:underline"
          >
            check the directory
          </Link>{' '}
          to see if your city already has a Critical Mass. If it does but
          it&apos;s inactive, you may be able to revive it.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Step 2: Pick a date, time, and meeting point
        </h2>
        <p>
          The last Friday of every month is the traditional Critical Mass date
          worldwide. Choose an evening start time (5:00–6:30 PM works well) and
          a well-known public location as your meeting point — a park, a plaza,
          or a landmark.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Step 3: Spread the word
        </h2>
        <p>
          Create a simple social media post or flyer with your ride details.
          Post it in local cycling groups, community boards, and neighborhood
          forums. See the{' '}
          <Link
            href="/toolkit/messaging-and-outreach"
            className="font-medium text-cm-green hover:underline"
          >
            Messaging & Outreach guide
          </Link>{' '}
          for tips.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Step 4: Show up and ride
        </h2>
        <p>
          Arrive early, greet people, and ride. That&apos;s it. Your first ride
          might be 5 people. That&apos;s fine. Consistency builds community —
          keep showing up every month.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Step 5: Claim your city page
        </h2>
        <p>
          Once your ride is running, you can{' '}
          <Link
            href="/claim"
            className="font-medium text-cm-green hover:underline"
          >
            claim a community page
          </Link>{' '}
          on this platform. This gives you a public page to share your ride
          information, meeting point, schedule, and contact details with riders.
        </p>

        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-gray-100">
            Dive deeper with the toolkit
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/toolkit/first-ride-checklist"
                className="font-medium text-cm-green hover:underline"
              >
                First Ride Checklist
              </Link>{' '}
              — detailed step-by-step guide
            </li>
            <li>
              <Link
                href="/toolkit/route-planning"
                className="font-medium text-cm-green hover:underline"
              >
                Route Planning
              </Link>{' '}
              — how to plan safe, inclusive routes
            </li>
            <li>
              <Link
                href="/toolkit/graphics-and-materials"
                className="font-medium text-cm-green hover:underline"
              >
                Graphics & Materials
              </Link>{' '}
              — flyers, spoke cards, and social templates
            </li>
            <li>
              <Link
                href="/toolkit/growth-and-continuity"
                className="font-medium text-cm-green hover:underline"
              >
                Growth & Continuity
              </Link>{' '}
              — sustaining your ride long-term
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
