import { auth } from '.'

export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireRole(role: 'moderator' | 'admin') {
  const session = await requireAuth()
  if (session.user.role !== role && session.user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return session
}
