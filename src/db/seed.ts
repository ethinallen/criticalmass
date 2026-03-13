import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { rides } from './schema'
import { sql } from 'drizzle-orm'

const sqlite = new Database(process.env.DATABASE_URL ?? 'sqlite.db')
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

const db = drizzle(sqlite)

const seedRides = [
  {
    slug: 'san-francisco-ca-us',
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    countryCode: 'US',
    displayName: 'Critical Mass San Francisco',
    frequency: 'Last Friday of every month',
    meetingPoint: 'Justin Herman Plaza (Embarcadero)',
    meetingTime: '5:30 PM',
    description:
      'The original Critical Mass, riding since September 1992. Meet at the Embarcadero and ride through the city.',
    contactMethod: 'sfcriticalmass.org',
    status: 'active' as const,
  },
  {
    slug: 'new-york-city-ny-us',
    city: 'New York City',
    state: 'NY',
    country: 'United States',
    countryCode: 'US',
    displayName: 'Critical Mass NYC',
    frequency: 'Last Friday of every month',
    meetingPoint: 'Union Square North',
    meetingTime: '6:30 PM',
    description:
      'New York City Critical Mass gathers at Union Square on the last Friday of every month for a group ride through Manhattan.',
    contactMethod: 'times-up.org',
    status: 'active' as const,
  },
  {
    slug: 'london-gb',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    displayName: 'Critical Mass London',
    frequency: 'Last Friday of every month',
    meetingPoint: 'Southbank, under Waterloo Bridge',
    meetingTime: '6:00 PM',
    description:
      'London Critical Mass meets on the South Bank under Waterloo Bridge on the last Friday of every month.',
    contactMethod: 'criticalmass.london',
    status: 'active' as const,
  },
  {
    slug: 'budapest-hu',
    city: 'Budapest',
    country: 'Hungary',
    countryCode: 'HU',
    displayName: 'Critical Mass Budapest',
    frequency: 'April 22 and September 22 annually',
    meetingPoint: 'Various (announced each ride)',
    meetingTime: '5:00 PM',
    description:
      'Budapest hosts some of the largest Critical Mass rides in the world, with tens of thousands of participants on Earth Day and Car-Free Day.',
    contactMethod: 'criticalmass.hu',
    status: 'active' as const,
  },
  {
    slug: 'berlin-de',
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    displayName: 'Critical Mass Berlin',
    frequency: 'Last Friday of every month',
    meetingPoint: 'Mariannenplatz, Kreuzberg',
    meetingTime: '7:00 PM',
    description:
      'Berlin Critical Mass rides through the city on the last Friday of every month, starting from Kreuzberg.',
    contactMethod: 'criticalmassBerlin (Instagram)',
    status: 'active' as const,
  },
  {
    slug: 'portland-or-us',
    city: 'Portland',
    state: 'OR',
    country: 'United States',
    countryCode: 'US',
    displayName: 'Critical Mass Portland',
    frequency: 'Last Friday of every month',
    meetingPoint: 'North Park Blocks',
    meetingTime: '5:30 PM',
    description:
      'Portland Critical Mass has been riding since the mid-1990s. Meet at the North Park Blocks.',
    status: 'active' as const,
  },
  {
    slug: 'chicago-il-us',
    city: 'Chicago',
    state: 'IL',
    country: 'United States',
    countryCode: 'US',
    displayName: 'Critical Mass Chicago',
    frequency: 'Last Friday of every month',
    meetingPoint: 'Daley Plaza',
    meetingTime: '5:30 PM',
    description:
      'Chicago Critical Mass meets at Daley Plaza and rides through the Loop and surrounding neighborhoods.',
    contactMethod: 'chicagocriticalmass.org',
    status: 'active' as const,
  },
  {
    slug: 'sao-paulo-br',
    city: 'São Paulo',
    country: 'Brazil',
    countryCode: 'BR',
    displayName: 'Bicicletada São Paulo',
    frequency: 'Last Friday of every month',
    meetingPoint: 'Largo da Batata, Pinheiros',
    meetingTime: '7:00 PM',
    description:
      'Known locally as Bicicletada, São Paulo Critical Mass is one of the largest in Latin America.',
    status: 'active' as const,
  },
  {
    slug: 'sydney-nsw-au',
    city: 'Sydney',
    state: 'NSW',
    country: 'Australia',
    countryCode: 'AU',
    displayName: 'Critical Mass Sydney',
    frequency: 'Last Friday of every month',
    meetingPoint: 'Sydney Town Hall steps',
    meetingTime: '5:30 PM',
    description:
      'Sydney Critical Mass meets on the steps of Town Hall on the last Friday of the month.',
    status: 'active' as const,
  },
  {
    slug: 'mexico-city-mx',
    city: 'Mexico City',
    country: 'Mexico',
    countryCode: 'MX',
    displayName: 'Masa Crítica CDMX',
    frequency: 'Last Wednesday of every month',
    meetingPoint: 'Monumento a la Revolución',
    meetingTime: '8:00 PM',
    description:
      'Mexico City Critical Mass (Masa Crítica) rides on the last Wednesday of every month from the Monument to the Revolution.',
    status: 'active' as const,
  },
  {
    slug: 'amsterdam-nl',
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    displayName: 'Critical Mass Amsterdam',
    frequency: 'Last Friday of every month',
    meetingPoint: 'Vondelpark main entrance',
    meetingTime: '6:00 PM',
    description:
      'Amsterdam Critical Mass meets at the main entrance of Vondelpark, riding through the city center.',
    status: 'active' as const,
  },
  {
    slug: 'buenos-aires-ar',
    city: 'Buenos Aires',
    country: 'Argentina',
    countryCode: 'AR',
    displayName: 'Masa Crítica Buenos Aires',
    frequency: 'First Sunday of every month',
    meetingPoint: 'Plaza de Mayo',
    meetingTime: '4:00 PM',
    description:
      'Buenos Aires Masa Crítica gathers at Plaza de Mayo on the first Sunday of each month.',
    status: 'active' as const,
  },
]

async function seed() {
  console.log('Seeding rides...')

  for (const ride of seedRides) {
    db.insert(rides)
      .values(ride)
      .onConflictDoNothing({ target: rides.slug })
      .run()
  }

  const count = db.select({ count: sql<number>`count(*)` }).from(rides).get()
  console.log(`Done. ${count?.count ?? 0} rides in database.`)

  sqlite.close()
}

seed()
