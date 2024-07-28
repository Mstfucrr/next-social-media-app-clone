'use server'

import { lucia } from '@/views/auth/lib/auth'
import prisma from '@/lib/prisma'
import { SignUpValues, signUpschema } from '@/views/auth/lib/validation'
import { hash } from '@node-rs/argon2'
import { generateIdFromEntropySize } from 'lucia'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signup = async (credentials: SignUpValues): Promise<{ error: string }> => {
  try {
    // Burada parse fonksiyonu kullanılmış. Bu fonksiyon, verilen değeri şema ile karşılaştırır ve uygun değilse hata döner.
    const { username, email, password } = signUpschema.parse(credentials)

    // Bu fonksiyon, argon2 algoritmasını kullanarak password değerini hashler.
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    })

    const userId = generateIdFromEntropySize(10)

    const existingUsername = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } }
    })

    const existingEmail = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } }
    })

    if (existingUsername) return { error: 'This username is already taken' }

    if (existingEmail) return { error: 'This email is already taken' }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash
      }
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return redirect('/')
  } catch (error) {
    // isRedirectError fonksiyonu, verilen hatanın bir yönlendirme hatası olup olmadığını kontrol eder.
    if (isRedirectError(error)) throw error

    console.error(error)
    return { error: 'Something went wrong. Please try again later.' }
  }
}
