import { NextResponse } from 'next/server'
import { db } from '@/src/db'
import { rides } from '@/src/db/schema'
import { like, eq, or, sql, count } from 'drizzle-orm'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const country = url.searchParams.get('country')
  const status = url.searchParams.get('status')
  const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') ?? 20)))
  const offset = (page - 1) * limit

  const conditions = []

  if (q) {
    const pattern = `%${q}%`
    conditions.push(
      or(
        like(rides.city, pattern),
        like(rides.country, pattern),
        like(rides.displayName, pattern),
      ),
    )
  }

  if (country) {
    conditions.push(eq(rides.countryCode, country.toUpperCase()))
  }

  if (status && ['active', 'provisional', 'dormant'].includes(status)) {
    conditions.push(eq(rides.status, status as 'active' | 'provisional' | 'dormant'))
  }

  const where = conditions.length > 0
    ? sql`${sql.join(conditions.map(c => c!), sql` AND `)}`
    : undefined

  const [ridesList, totalResult] = await Promise.all([
    db
      .select()
      .from(rides)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(rides.city),
    db
      .select({ count: count() })
      .from(rides)
      .where(where),
  ])

  return NextResponse.json({
    rides: ridesList,
    total: totalResult[0]?.count ?? 0,
    page,
    limit,
  })
}
