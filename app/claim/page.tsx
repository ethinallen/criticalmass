import Link from 'next/link'
import type { Metadata } from 'next'
import { auth } from '@/src/lib/auth'
import { db } from '@/src/db'
import { claims } from '@/src/db/schema'
import { eq, and } from 'drizzle-orm'
import { ClaimForm } from '@/components/claim-form'
import { AuthButton } from '@/components/auth-button'

export const metadata: Metadata = {
  title: 'Claim Your City',
  description:
    'Request a community page for your city on the Critical Mass platform.',
}

export default async function ClaimPage() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
          Claim your city page
        </h1>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
            Sign in to submit a claim for your city&apos;s Critical Mass page.
          </p>
          <AuthButton />
          <p className="mt-6 text-sm text-gray-500">
            Before claiming, read the{' '}
            <Link
              href="/governance"
              className="font-medium text-cm-green hover:underline"
            >
              governance model
            </Link>{' '}
            to understand how pages are stewarded.
          </p>
        </div>
      </div>
    )
  }

  // Check for pending claims
  const pendingClaim = await db.query.claims.findFirst({
    where: and(
      eq(claims.userId, session.user.id),
      eq(claims.status, 'pending'),
    ),
  })

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Claim your city page
      </h1>

      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Submit a request to steward your city&apos;s Critical Mass page. Read the{' '}
        <Link
          href="/governance"
          className="font-medium text-cm-green hover:underline"
        >
          governance model
        </Link>{' '}
        for details on the process.
      </p>

      {pendingClaim && (
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
          You have a pending claim for <strong>{pendingClaim.city}</strong>,
          submitted on{' '}
          {pendingClaim.createdAt.toLocaleDateString()}. A moderator
          will review it shortly.
        </div>
      )}

      <ClaimForm />
    </div>
  )
}
