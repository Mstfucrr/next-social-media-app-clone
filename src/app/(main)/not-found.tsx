import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center gap-5'>
        <h1 className='text-4xl font-bold'>404</h1>
        <p className='text-center'>The page you are looking for does not exist.</p>
        <Link href='/' className='btn btn-primary'>
          Go to Home
        </Link>
      </div>
    </div>
  )
}
