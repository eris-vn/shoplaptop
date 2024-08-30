// Third-party Imports
import { getServerSession } from 'next-auth'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'

export default async function AuthGuard({ children }) {
  const session = await getServerSession()

  return <>{session ? children : <AuthRedirect />}</>
}
