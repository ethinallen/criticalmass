'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ClaimReviewActions({ claimId }: { claimId: string }) {
  const router = useRouter()
  const [reviewNote, setReviewNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAction(status: 'approved' | 'rejected') {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/claims/${claimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, reviewNote: reviewNote || undefined }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update claim')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3 space-y-2">
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
      <textarea
        placeholder="Review note (optional)"
        value={reviewNote}
        onChange={(e) => setReviewNote(e.target.value)}
        rows={2}
        className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
      />
      <div className="flex gap-2">
        <button
          onClick={() => handleAction('approved')}
          disabled={loading}
          className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          onClick={() => handleAction('rejected')}
          disabled={loading}
          className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
        >
          Reject
        </button>
      </div>
    </div>
  )
}
