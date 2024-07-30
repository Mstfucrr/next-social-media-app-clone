import React from 'react'
import SignupForm from './components/signupForm'
import Link from 'next/link'
import CustomImage from '@/components/image'

const SignupView = () => {
  return (
    <>
      <div className='flex w-full flex-col items-center gap-y-4 overflow-y-auto p-6 md:w-1/2 md:p-10'>
        <div className='space-y-1 text-center'>
          <h1 className='text-2xl font-bold'>
            Sign up to <span className='uppercase text-primary'>bugbook</span>
          </h1>
          <p className='text-sm text-gray-500'>
            A place where even <span className='italic'>you</span> can find a friend.
          </p>
        </div>
        <SignupForm />
        <div className='text-sm text-gray-500'>
          Already have an account?
          <Link href='/login' className='ml-2 text-primary'>
            Login
          </Link>
        </div>
      </div>
      <CustomImage
        src='/assets/signup-image.jpg'
        alt='Signup image'
        className='hidden object-cover md:block md:w-1/2'
        width={500}
        height={500}
      />
    </>
  )
}

export default SignupView
