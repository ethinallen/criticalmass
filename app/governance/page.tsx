import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Governance',
  description:
    'How community pages are claimed, maintained, and transferred on the Critical Mass platform.',
}

export default function GovernancePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Governance & Stewardship
      </h1>

      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p className="text-xl">
          This platform provides community pages for local Critical Mass rides.
          These pages are a shared resource — not owned, but stewarded. This
          page explains how that stewardship works.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Claiming a community page
        </h2>
        <p>
          Anyone actively organizing or planning to start a Critical Mass ride
          can request a community page. The process:
        </p>
        <ol className="list-inside list-decimal space-y-2">
          <li>Submit a claim with your city, a short rationale, and contact info</li>
          <li>A moderator reviews your request</li>
          <li>If approved, your page enters a provisional period (60 days)</li>
          <li>
            During the provisional period, publish at minimum: a display name,
            city, ride frequency, and contact method
          </li>
          <li>Once published, your page becomes active</li>
        </ol>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Anti-squatting protections
        </h2>
        <p>
          Community pages are not permanent reservations. To prevent squatting:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            Provisional claims expire if the page isn&apos;t published within 60
            days
          </li>
          <li>
            Active pages require an annual activity confirmation
          </li>
          <li>
            Pages without updates for an extended period may be marked dormant
          </li>
          <li>
            Dormant pages become available for reclaiming by new organizers
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Maintainers and continuity
        </h2>
        <p>
          Each community page should have at least two maintainers. This ensures
          the page survives if one person steps away. Maintainers can:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Edit the community page information</li>
          <li>Update the next ride details</li>
          <li>Invite additional maintainers</li>
          <li>Respond to activity checks</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Reclaiming an inactive page
        </h2>
        <p>
          If a community page appears abandoned, a new organizer can submit a
          reclaim request. The process:
        </p>
        <ol className="list-inside list-decimal space-y-2">
          <li>Submit a reclaim request with your rationale</li>
          <li>Existing maintainers are notified and given 30 days to respond</li>
          <li>
            If maintainers respond and wish to keep the page, the request is
            declined
          </li>
          <li>
            If no response, a moderator may approve the transfer of stewardship
          </li>
          <li>All actions are logged for transparency</li>
        </ol>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Disputes
        </h2>
        <p>
          If there is a disagreement about a community page, a moderator will
          review the situation. The platform does not implement a voting system
          — disputes are resolved through transparent moderator review guided by
          this policy.
        </p>
        <p>
          Reclaim applicants may be asked to provide endorsements from 2–3 local
          riders to support their request.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Principles
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Local autonomy is respected — the platform doesn&apos;t dictate how rides are run</li>
          <li>Pages are stewarded, not owned</li>
          <li>Transparency over bureaucracy</li>
          <li>Continuity matters — rides should outlast any single organizer</li>
          <li>Good faith is assumed until demonstrated otherwise</li>
        </ul>

        <div className="mt-8">
          <Link
            href="/claim"
            className="rounded-lg bg-cm-green px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            Claim your city page
          </Link>
        </div>
      </div>
    </div>
  )
}
