import {
  pgTable,
  text,
  integer,
  timestamp,
  primaryKey,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

// ---------- Auth.js tables ----------

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  role: text('role', { enum: ['user', 'moderator', 'admin'] })
    .notNull()
    .default('user'),
  createdAt: timestamp('createdAt', { mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updatedAt', { mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
})

export const accounts = pgTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (table) => [primaryKey({ columns: [table.provider, table.providerAccountId] })],
)

export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationTokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })],
)

// ---------- Application tables ----------

export const rides = pgTable(
  'rides',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slug: text('slug').notNull(),
    city: text('city').notNull(),
    state: text('state'),
    country: text('country').notNull(),
    countryCode: text('countryCode').notNull(),
    displayName: text('displayName').notNull(),
    frequency: text('frequency'),
    meetingPoint: text('meetingPoint'),
    meetingTime: text('meetingTime'),
    description: text('description'),
    contactMethod: text('contactMethod'),
    websiteUrl: text('websiteUrl'),
    socialLinks: text('socialLinks'), // JSON string of {platform, url}[]
    status: text('status', { enum: ['active', 'provisional', 'dormant'] })
      .notNull()
      .default('provisional'),
    provisionalDeadline: timestamp('provisionalDeadline', { mode: 'date' }),
    lastActivityConfirmation: timestamp('lastActivityConfirmation', {
      mode: 'date',
    }),
    createdAt: timestamp('createdAt', { mode: 'date' })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp('updatedAt', { mode: 'date' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [uniqueIndex('rides_slug_idx').on(table.slug)],
)

export const claims = pgTable('claims', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  rideId: text('rideId').references(() => rides.id),
  city: text('city').notNull(),
  state: text('state'),
  country: text('country').notNull(),
  rationale: text('rationale').notNull(),
  contactInfo: text('contactInfo').notNull(),
  type: text('type', { enum: ['new', 'reclaim'] })
    .notNull()
    .default('new'),
  status: text('status', {
    enum: ['pending', 'approved', 'rejected', 'expired'],
  })
    .notNull()
    .default('pending'),
  reviewedBy: text('reviewedBy').references(() => users.id),
  reviewedAt: timestamp('reviewedAt', { mode: 'date' }),
  reviewNote: text('reviewNote'),
  createdAt: timestamp('createdAt', { mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updatedAt', { mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
})

export const maintainers = pgTable(
  'maintainers',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    rideId: text('rideId')
      .notNull()
      .references(() => rides.id, { onDelete: 'cascade' }),
    role: text('role', { enum: ['primary', 'secondary'] })
      .notNull()
      .default('primary'),
    createdAt: timestamp('createdAt', { mode: 'date' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    uniqueIndex('maintainers_user_ride_idx').on(table.userId, table.rideId),
  ],
)
