import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s — Critical Mass',
    default: 'Critical Mass — Start, Find, and Sustain Rides Worldwide',
  },
  description:
    'The global platform for Critical Mass rides. Find a ride near you, start one in your city, or access the organizer toolkit.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="🚲" />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<strong>Critical Mass</strong>}
              projectLink="https://github.com/ethinallen/criticalmass"
            />
          }
          footer={
            <Footer>
              GPL-3.0 {new Date().getFullYear()} © Critical Mass
            </Footer>
          }
          docsRepositoryBase="https://github.com/ethinallen/criticalmass/tree/main/content"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 2, toggleButton: true }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
