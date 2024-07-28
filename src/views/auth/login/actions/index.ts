'use server'
import prisma from '@/lib/prisma'
import { LoginValues, loginSchema } from '@/views/auth/lib/validation'
import { verify } from '@node-rs/argon2'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { lucia } from '../../lib/auth'

export const login = async (credentials: LoginValues): Promise<{ error: string }> => {
  try {
    const { username, password } = loginSchema.parse(credentials)

    const existingUser = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } }
    })

    if (!existingUser?.passwordHash) return { error: 'Incorrect username or password' }

    const passwordValid = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    })

    if (!passwordValid) return { error: 'Incorrect username or password' }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return redirect('/')
  } catch (error) {
    if (isRedirectError(error)) throw error

    console.error(error)
    return { error: 'Something went wrong. Please try again later.' }
  }
}
