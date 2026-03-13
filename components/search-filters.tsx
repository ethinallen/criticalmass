'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'

const countries = [
  { code: '', label: 'All countries' },
  { code: 'AR', label: 'Argentina' },
  { code: 'AU', label: 'Australia' },
  { code: 'BR', label: 'Brazil' },
  { code: 'DE', label: 'Germany' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'HU', label: 'Hungary' },
  { code: 'MX', label: 'Mexico' },
  { code: 'NL', label: 'Netherlands' },
  { code: 'US', label: 'United States' },
]

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const q = searchParams.get('q') ?? ''
  const country = searchParams.get('country') ?? ''
  const status = searchParams.get('status') ?? ''

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`/find-a-ride?${params.toString()}`)
      })
    },
    [router, searchParams],
  )

  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        placeholder="Search by city or country..."
        defaultValue={q}
        onChange={(e) => updateParams('q', e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
      />
      <select
        value={country}
        onChange={(e) => updateParams('country', e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
      <select
        value={status}
        onChange={(e) => updateParams('status', e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="provisional">Provisional</option>
        <option value="dormant">Dormant</option>
      </select>
      {isPending && (
        <span className="self-center text-xs text-gray-400">Loading...</span>
      )}
    </div>
  )
}
