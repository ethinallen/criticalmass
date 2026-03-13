import type { Metadata } from 'next'
import { db } from '@/src/db'
import { claims, users } from '@/src/db/schema'
import { eq } from 'drizzle-orm'
import { ClaimReviewActions } from '@/components/claim-review-actions'

export const metadata: Metadata = {
  title: 'Review Claims',
}

export const dynamic = 'force-dynamic'

export default async function AdminClaimsPage() {
  const claimsList = await db
    .select({
      id: claims.id,
      city: claims.city,
      state: claims.state,
      country: claims.country,
      rationale: claims.rationale,
      contactInfo: claims.contactInfo,
      type: claims.type,
      status: claims.status,
      createdAt: claims.createdAt,
      reviewNote: claims.reviewNote,
      userName: users.name,
      userEmail: users.email,
      userImage: users.image,
    })
    .from(claims)
    .innerJoin(users, eq(claims.userId, users.id))
    .orderBy(claims.createdAt)

  const pending = claimsList.filter((c) => c.status === 'pending')
  const reviewed = claimsList.filter((c) => c.status !== 'pending')

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight">
        Review claims
      </h1>

      <h2 className="mb-4 text-xl font-semibold">
        Pending ({pending.length})
      </h2>

      {pending.length === 0 ? (
        <p className="mb-8 text-gray-500">No pending claims.</p>
      ) : (
        <div className="mb-8 space-y-4">
          {pending.map((claim) => (
            <div
              key={claim.id}
              className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
            >
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">
                    {claim.city}
                    {claim.state ? `, ${claim.state}` : ''}, {claim.country}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {claim.type === 'reclaim' ? 'Reclaim' : 'New'} &middot;{' '}
                    {claim.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {claim.userImage && (
                    <img
                      src={claim.userImage}
                      alt=""
                      className="h-5 w-5 rounded-full"
                    />
                  )}
                  <span>{claim.userName ?? claim.userEmail}</span>
                </div>
              </div>
              <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">
                {claim.rationale}
              </p>
              <p className="text-xs text-gray-500">
                Contact: {claim.contactInfo}
              </p>
              <ClaimReviewActions claimId={claim.id} />
            </div>
          ))}
        </div>
      )}

      {reviewed.length > 0 && (
        <>
          <h2 className="mb-4 text-xl font-semibold">
            Reviewed ({reviewed.length})
          </h2>
          <div className="space-y-3">
            {reviewed.map((claim) => (
              <div
                key={claim.id}
                className="rounded-lg border border-gray-100 p-4 dark:border-gray-800"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm">
                    {claim.city}, {claim.country}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      claim.status === 'approved'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>
                {claim.reviewNote && (
                  <p className="mt-1 text-xs text-gray-500">
                    Note: {claim.reviewNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
