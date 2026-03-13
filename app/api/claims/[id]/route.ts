import { NextResponse } from 'next/server'
import { db } from '@/src/db'
import { claims, rides, maintainers, users } from '@/src/db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth, requireRole } from '@/src/lib/auth/helpers'

function slugify(city: string, state: string | null, country: string): string {
  const parts = [city, state, country].filter(Boolean)
  return parts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let session
  try {
    session = await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const claim = await db.query.claims.findFirst({
    where: eq(claims.id, id),
  })

  if (!claim) {
    return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
  }

  // Users can only view their own claims, moderators/admins can view any
  if (
    claim.userId !== session.user.id &&
    session.user.role !== 'moderator' &&
    session.user.role !== 'admin'
  ) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(claim)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let session
  try {
    session = await requireRole('moderator')
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const body = await request.json()
  const { status, reviewNote } = body

  if (!status || !['approved', 'rejected'].includes(status)) {
    return NextResponse.json(
      { error: 'Status must be "approved" or "rejected"' },
      { status: 400 },
    )
  }

  const claim = await db.query.claims.findFirst({
    where: eq(claims.id, id),
  })

  if (!claim) {
    return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
  }

  if (claim.status !== 'pending') {
    return NextResponse.json(
      { error: 'Only pending claims can be reviewed' },
      { status: 400 },
    )
  }

  const now = new Date()

  if (status === 'approved') {
    const slug = slugify(claim.city, claim.state, claim.country)
    const provisionalDeadline = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000) // 60 days

    // Create the ride
    const [ride] = await db
      .insert(rides)
      .values({
        slug,
        city: claim.city,
        state: claim.state,
        country: claim.country,
        countryCode: claim.country.substring(0, 2).toUpperCase(),
        displayName: `Critical Mass ${claim.city}`,
        status: 'provisional',
        provisionalDeadline,
        contactMethod: claim.contactInfo,
      })
      .returning()

    // Link claimant as primary maintainer
    await db.insert(maintainers).values({
      userId: claim.userId,
      rideId: ride.id,
      role: 'primary',
    })

    // Update claim
    const [updated] = await db
      .update(claims)
      .set({
        status: 'approved',
        rideId: ride.id,
        reviewedBy: session.user.id,
        reviewedAt: now,
        reviewNote: reviewNote || null,
        updatedAt: now,
      })
      .where(eq(claims.id, id))
      .returning()

    return NextResponse.json(updated)
  }

  // Rejected
  const [updated] = await db
    .update(claims)
    .set({
      status: 'rejected',
      reviewedBy: session.user.id,
      reviewedAt: now,
      reviewNote: reviewNote || null,
      updatedAt: now,
    })
    .where(eq(claims.id, id))
    .returning()

  return NextResponse.json(updated)
}
