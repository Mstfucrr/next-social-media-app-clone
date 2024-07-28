import { z } from 'zod'

const requiredString = z.string().trim().min(1, { message: 'This field is required' })

export const signUpschema = z.object({
  email: requiredString.email('Invalid email address'),
  username: requiredString.regex(/^[a-zA-Z0-9 -]+$/, 'Only letters, numbers, spaces, and hyphens are allowed'),
  password: requiredString.min(8, 'Password must be at least 8 characters long')
})

export type SignUpValues = z.infer<typeof signUpschema>

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString
})

export type LoginValues = z.infer<typeof loginSchema>
