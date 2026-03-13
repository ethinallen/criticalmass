import { NextResponse } from 'next/server'
import { db } from '@/src/db'
import { rides, maintainers, users } from '@/src/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  // Try by id first, then by slug
  let ride = await db.query.rides.findFirst({
    where: eq(rides.id, id),
  })

  if (!ride) {
    ride = await db.query.rides.findFirst({
      where: eq(rides.slug, id),
    })
  }

  if (!ride) {
    return NextResponse.json({ error: 'Ride not found' }, { status: 404 })
  }

  const rideMaintainers = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      role: maintainers.role,
    })
    .from(maintainers)
    .innerJoin(users, eq(maintainers.userId, users.id))
    .where(eq(maintainers.rideId, ride.id))

  return NextResponse.json({ ride, maintainers: rideMaintainers })
}
