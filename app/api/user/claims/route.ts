import { NextResponse } from 'next/server'
import { db } from '@/src/db'
import { claims } from '@/src/db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '@/src/lib/auth/helpers'

export async function GET() {
  let session
  try {
    session = await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userClaims = await db.query.claims.findMany({
    where: eq(claims.userId, session.user.id),
    orderBy: claims.createdAt,
  })

  return NextResponse.json({ claims: userClaims })
}
