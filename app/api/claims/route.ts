import { NextResponse } from 'next/server'
import { db } from '@/src/db'
import { claims, rides, users } from '@/src/db/schema'
import { eq, and, count } from 'drizzle-orm'
import { requireAuth, requireRole } from '@/src/lib/auth/helpers'

export async function POST(request: Request) {
  let session
  try {
    session = await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { city, state, country, rationale, contactInfo, type, rideId } = body

  if (!city || !country || !rationale || !contactInfo) {
    return NextResponse.json(
      { error: 'Missing required fields: city, country, rationale, contactInfo' },
      { status: 400 },
    )
  }

  if (rationale.length < 20) {
    return NextResponse.json(
      { error: 'Rationale must be at least 20 characters' },
      { status: 400 },
    )
  }

  const claimType = type === 'reclaim' ? 'reclaim' : 'new'

  if (claimType === 'reclaim' && !rideId) {
    return NextResponse.json(
      { error: 'rideId is required for reclaim requests' },
      { status: 400 },
    )
  }

  // Check for existing pending claim by same user for same city
  const existing = await db.query.claims.findFirst({
    where: and(
      eq(claims.userId, session.user.id),
      eq(claims.city, city),
      eq(claims.status, 'pending'),
    ),
  })

  if (existing) {
    return NextResponse.json(
      { error: 'You already have a pending claim for this city' },
      { status: 409 },
    )
  }

  // For new claims, check no active ride exists for this city
  if (claimType === 'new') {
    const existingRide = await db.query.rides.findFirst({
      where: and(eq(rides.city, city), eq(rides.status, 'active')),
    })
    if (existingRide) {
      return NextResponse.json(
        { error: 'An active ride already exists for this city. Use "reclaim" instead.' },
        { status: 409 },
      )
    }
  }

  const [claim] = await db
    .insert(claims)
    .values({
      userId: session.user.id,
      city,
      state: state || null,
      country,
      rationale,
      contactInfo,
      type: claimType,
      rideId: rideId || null,
    })
    .returning()

  return NextResponse.json(claim, { status: 201 })
}

export async function GET() {
  try {
    await requireRole('moderator')
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const claimsList = await db
    .select({
      claim: claims,
      userName: users.name,
      userEmail: users.email,
      userImage: users.image,
    })
    .from(claims)
    .innerJoin(users, eq(claims.userId, users.id))
    .orderBy(claims.createdAt)

  return NextResponse.json({ claims: claimsList })
}
