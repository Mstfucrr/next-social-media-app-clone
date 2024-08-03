import { validateRequest } from '@/views/auth/lib/auth'
import MenuBar from '@/views/main/components/menubar'
import Navbar from '@/views/main/components/navbar'
import SessionProvider from '@/views/main/context/SessionProvider'
import { redirect } from 'next/navigation'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest()

  if (!session.user) redirect('/login')

  return (
    <SessionProvider value={session}>
      <div className='flex min-h-screen flex-col'>
        <Navbar />
        <div className='mx-auto flex w-full max-w-7xl grow gap-5 p-5'>
          <MenuBar className='sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80' />
          <div className='flex w-full gap-5'>{children}</div>
        </div>
        <MenuBar className='sticky bottom-0 flex justify-center gap-5 border-t bg-card p-3 sm:hidden' />
      </div>
    </SessionProvider>
  )
}
