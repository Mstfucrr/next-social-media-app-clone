import { z } from 'zod'

const requiredString = z.string().trim().min(1, { message: 'This field is required' })

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, 'You can only upload up to 5 files').optional()
})

export type CreatePostValues = z.infer<typeof createPostSchema>
