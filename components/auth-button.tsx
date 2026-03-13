'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <img
            src={session.user.image}
            alt=""
            className="h-7 w-7 rounded-full"
          />
        )}
        <span className="text-sm">{session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn()}
      className="rounded bg-cm-green px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
    >
      Sign in
    </button>
  )
}
