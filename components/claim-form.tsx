'use client'

import { useState } from 'react'

export function ClaimForm() {
  const [type, setType] = useState<'new' | 'reclaim'>('new')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const body = {
      city: form.get('city'),
      state: form.get('state') || null,
      country: form.get('country'),
      rationale: form.get('rationale'),
      contactInfo: form.get('contactInfo'),
      type,
      rideId: type === 'reclaim' ? form.get('rideId') || null : null,
    }

    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit claim')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
        <h3 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-400">
          Claim submitted!
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          Your claim has been submitted for review. A moderator will review it
          shortly. Check the{' '}
          <a href="/governance" className="underline">
            governance model
          </a>{' '}
          for details on the approval process.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="claimType"
            checked={type === 'new'}
            onChange={() => setType('new')}
          />
          New ride
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="claimType"
            checked={type === 'reclaim'}
            onChange={() => setType('reclaim')}
          />
          Reclaim existing
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium">
            City *
          </label>
          <input
            id="city"
            name="city"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
        <div>
          <label htmlFor="state" className="mb-1 block text-sm font-medium">
            State / Province
          </label>
          <input
            id="state"
            name="state"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="mb-1 block text-sm font-medium">
          Country *
        </label>
        <input
          id="country"
          name="country"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
        />
      </div>

      {type === 'reclaim' && (
        <div>
          <label htmlFor="rideId" className="mb-1 block text-sm font-medium">
            Ride to reclaim (ride ID)
          </label>
          <input
            id="rideId"
            name="rideId"
            placeholder="Enter the ride ID or slug"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
      )}

      <div>
        <label htmlFor="rationale" className="mb-1 block text-sm font-medium">
          Why should you steward this page? * (min 20 characters)
        </label>
        <textarea
          id="rationale"
          name="rationale"
          required
          minLength={20}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
        />
      </div>

      <div>
        <label htmlFor="contactInfo" className="mb-1 block text-sm font-medium">
          Contact method * (e.g. email, Instagram handle)
        </label>
        <input
          id="contactInfo"
          name="contactInfo"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-cm-green px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit claim'}
      </button>
    </form>
  )
}
