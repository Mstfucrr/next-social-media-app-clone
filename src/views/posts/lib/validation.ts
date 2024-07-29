import { z } from 'zod'

const requiredString = z.string().trim().min(1, { message: 'This field is required' })

export const createPostSchema = z.object({
  content: requiredString.max(1000, 'Post must be less than 1000 characters')
})

export type CreatePostValues = z.infer<typeof createPostSchema>
