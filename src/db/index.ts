import { neon, type NeonQueryFunction } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const databaseUrl = process.env.POSTGRES_URL ?? process.env.DATABASE_URL

console.log('[db] POSTGRES_URL set:', !!process.env.POSTGRES_URL)
console.log('[db] DATABASE_URL set:', !!process.env.DATABASE_URL)
console.log('[db] Using URL prefix:', databaseUrl?.substring(0, 30) + '...')

if (!databaseUrl && process.env.NODE_ENV === 'production') {
  throw new Error('POSTGRES_URL or DATABASE_URL environment variable is required in production')
}

const sql: NeonQueryFunction<boolean, boolean> = databaseUrl
  ? neon(databaseUrl)
  : (() => {
      throw new Error(
        'DATABASE_URL is not set. Database operations require a Neon/Vercel Postgres connection string.',
      )
    }) as unknown as NeonQueryFunction<boolean, boolean>

export const db = drizzle(sql, { schema })
