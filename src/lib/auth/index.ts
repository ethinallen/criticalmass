import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/src/db'
import * as schema from '@/src/db/schema'
import './types'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [GitHub, Google],
  session: { strategy: 'database' },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id!
      session.user.role = (user as typeof schema.users.$inferSelect).role
      return session
    },
  },
})
