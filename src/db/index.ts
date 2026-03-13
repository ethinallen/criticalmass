import { neon, type NeonQueryFunction } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl && process.env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL environment variable is required in production')
}

const sql: NeonQueryFunction<boolean, boolean> = databaseUrl
  ? neon(databaseUrl)
  : (() => {
      throw new Error(
        'DATABASE_URL is not set. Database operations require a Neon/Vercel Postgres connection string.',
      )
    }) as unknown as NeonQueryFunction<boolean, boolean>

export const db = drizzle(sql, { schema })
