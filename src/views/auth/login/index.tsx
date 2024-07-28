import Image from 'next/image'
import React from 'react'
import LoginForm from './components/loginForm'
import Link from 'next/link'

const LoginView = () => {
  return (
    <>
      <div className='flex w-full flex-col items-center gap-y-4 overflow-y-auto p-6 md:w-1/2 md:p-10'>
        <div className='space-y-1 text-center'>
          <h1 className='text-2xl font-bold'>
            Login to <span className='uppercase text-primary'>bugbook</span>
          </h1>
          <p className='text-sm text-gray-500'>
            A place where even <span className='italic'>you</span> can find a friend.
          </p>
        </div>
        <LoginForm />
        <div className='text-sm text-gray-500'>
          Don't have an account?
          <Link href='/signup' className='ml-2 text-primary'>
            Sign up
          </Link>
        </div>
      </div>
      <Image
        src='/assets/login-image.jpg'
        alt='Login image'
        className='hidden object-cover md:block md:w-1/2'
        width={500}
        height={500}
      />
    </>
  )
}

export default LoginView
