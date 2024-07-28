import { validateRequest } from '@/views/auth/lib/auth'
import { redirect } from 'next/navigation'

// src/app/(auth)/layout.tsx
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest()

  if (user) redirect('/')

  return (
    <main className='h-screen flex-center'>
      <div className='flex h-full max-h-[540px] w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-2xl'>
        {children}
      </div>
    </main>
  )
}
