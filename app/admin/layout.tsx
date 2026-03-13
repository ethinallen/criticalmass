import { redirect } from 'next/navigation'
import { auth } from '@/src/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  if (session.user.role !== 'moderator' && session.user.role !== 'admin') {
    redirect('/')
  }

  return <>{children}</>
}
