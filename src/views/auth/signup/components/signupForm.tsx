'use client'

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpValues, signUpschema } from '../../lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/FormTextInput'
import { signup } from '../actions'
import LoadingButton from '@/components/ui/loadingButton'

const SignupForm = () => {
  const [error, setError] = useState<string>()

  const [isPending, startTransition] = useTransition()

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpschema),
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  async function onSubmit(values: SignUpValues) {
    setError(undefined)
    startTransition(async () => {
      const { error } = await signup(values)
      if (error) setError(error)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-y-4'>
        {error && <p className='text-red-500'>{error}</p>}
        <FormInput name='username' control={form.control} label='Username' placeholder='Username' />
        <FormInput name='email' control={form.control} label='Email' placeholder='Email' type='email' />
        <FormInput name='password' control={form.control} label='Password' placeholder='Password' type='password' />
        <LoadingButton type='submit' className='mt-2 w-full' isLoading={isPending}>
          Sign up
        </LoadingButton>
      </form>
    </Form>
  )
}

export default SignupForm
