'use client'

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LoginValues, loginSchema } from '../../lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/FormTextInput'
import { login } from '../actions'
import LoadingButton from '@/components/ui/loadingButton'

const LoginForm = () => {
  const [error, setError] = useState<string>()

  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function onSubmit(values: LoginValues) {
    setError(undefined)
    startTransition(async () => {
      const { error } = await login(values)
      if (error) setError(error)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-y-4'>
        {error && <p className='text-red-500'>{error}</p>}
        <FormInput name='username' control={form.control} label='Username' placeholder='Username' />
        <FormInput name='password' control={form.control} label='Password' placeholder='Password' type='password' />
        <LoadingButton type='submit' isLoading={isPending} className='btn btn-primary'>
          Login
        </LoadingButton>
      </form>
    </Form>
  )
}

export default LoginForm
