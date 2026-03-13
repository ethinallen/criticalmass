import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the Critical Mass global platform.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        About this platform
      </h1>

      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p>
          This is the global platform for Critical Mass — a free, open-source
          resource for cyclists who organize and participate in Critical Mass
          rides worldwide.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          What we provide
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            A searchable directory of Critical Mass rides around the world
          </li>
          <li>
            An organizer toolkit with practical guides, templates, and resources
          </li>
          <li>
            Community pages where local rides can publish their information
          </li>
          <li>
            A fair stewardship model for claiming, maintaining, and transferring
            city pages
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Our principles
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Local autonomy</strong> — each ride defines its own
            character, schedule, and culture
          </li>
          <li>
            <strong>Low friction</strong> — it should be easy to find a ride,
            start a ride, and publish information
          </li>
          <li>
            <strong>Continuity</strong> — rides should outlast any single
            organizer
          </li>
          <li>
            <strong>Transparency</strong> — governance decisions are documented
            and public
          </li>
          <li>
            <strong>Open source</strong> — the platform is free and
            community-maintained
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Contributing
        </h2>
        <p>
          This platform is open source under the GPL-3.0 license. Contributions
          are welcome — whether that&apos;s improving documentation, adding
          translations, contributing design assets, or building new features.
        </p>
        <p>
          <Link
            href="https://github.com/ethinallen/criticalmass"
            className="font-medium text-cm-green hover:underline"
            target="_blank"
          >
            View the project on GitHub &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}
