import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What is Critical Mass?',
  description:
    'The history, culture, and spirit of the Critical Mass bike ride movement.',
}

export default function WhatIsCriticalMassPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        What is Critical Mass?
      </h1>

      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p className="text-xl">
          Critical Mass is a monthly bicycle ride that takes place in cities
          around the world. It has no central organization, no formal leaders,
          and no registration. Riders simply show up at a set time and place and
          ride together.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Origins
        </h2>
        <p>
          The first Critical Mass ride took place in San Francisco on September
          25, 1992. A group of cyclists — frustrated by dangerous streets and
          car-dominated infrastructure — decided to ride together through
          downtown during rush hour. They called it &quot;Commute Clot&quot;
          before settling on the name Critical Mass, borrowed from a documentary
          about cycling in China.
        </p>
        <p>
          The idea spread quickly. Within a few years, Critical Mass rides were
          happening in cities across North America, Europe, South America, Asia,
          and beyond. Today, rides take place in hundreds of cities on every
          inhabited continent.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          How it works
        </h2>
        <p>
          The format is simple: riders gather at a known location at a set time
          — traditionally the last Friday of the month — and ride together
          through city streets. There is usually no predetermined route, or a
          loose route chosen by whoever is at the front. The group rides at a
          comfortable pace, staying together as a unit.
        </p>
        <p>
          The phrase &quot;we are traffic&quot; captures the core idea: cyclists
          are not obstacles to traffic — they are traffic. A large enough group
          of cyclists naturally occupies a lane, making themselves visible and
          asserting their presence on the road.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          What it means
        </h2>
        <p>
          Critical Mass means different things in different places. In some
          cities, it&apos;s a joyful celebration of cycling — a party on wheels.
          In others, it&apos;s a more pointed statement about road safety,
          infrastructure, and the rights of cyclists. In many places, it&apos;s
          both.
        </p>
        <p>
          What unites every Critical Mass is the experience of riding together
          in a group large enough to be seen and felt. For many riders,
          it&apos;s their first time experiencing what streets could feel like if
          they were designed for people, not just cars.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          No leaders, no organization
        </h2>
        <p>
          Critical Mass is intentionally leaderless. There is no membership, no
          dues, no board of directors. Anyone can start a ride, and no one owns
          the name. This decentralized structure is both a strength and a
          challenge — it makes the movement resilient and adaptable, but it also
          means each city&apos;s ride depends on individuals showing up and
          doing the work.
        </p>
        <p>
          This platform exists to lower the barriers: to help people find rides,
          start rides, and sustain them over time — without centralizing control.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/find-a-ride"
            className="rounded-lg bg-cm-green px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            Find a Ride
          </Link>
          <Link
            href="/start-a-ride"
            className="rounded-lg border-2 border-cm-green px-6 py-3 font-semibold text-cm-green hover:bg-cm-green hover:text-white"
          >
            Start a Ride
          </Link>
        </div>
      </div>
    </div>
  )
}
