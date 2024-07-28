import Link from 'next/link'
import UserButton from './UserButton'
import SearchField from './SearchField'

export default function Navbar() {
  return (
    <header className='sticky top-0 z-10 bg-card shadow-sm'>
      <div className='mx-auto max-w-7xl flex-wrap gap-5 px-5 py-3 flex-center'>
        <Link href='/' className='text-2xl font-bold text-primary'>
          BugBook
        </Link>
        <SearchField />
        <UserButton className='sm:ms-auto' />
      </div>
    </header>
  )
}
