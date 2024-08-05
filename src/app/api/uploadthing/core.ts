import prisma from '@/lib/prisma'
import { validateRequest } from '@/views/auth/lib/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError, UTApi } from 'uploadthing/server'

const f = createUploadthing()

export const fileRouter = {
  avatar: f({ image: { maxFileSize: '512KB' } })
    .middleware(async () => {
      // This code runs on your server before upload
      const { user } = await validateRequest()

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { user }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const baseUrl = `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/` //
      const oldAvatarUrl = metadata.user.avatarUrl

      if (oldAvatarUrl) await new UTApi().deleteFiles(oldAvatarUrl.split(baseUrl)[1])

      const newAvatarUrl = file.url.replace('/f/', baseUrl)

      await prisma.user.update({
        where: { id: metadata.user.id },
        data: { avatarUrl: newAvatarUrl }
      })

      return { avatarUrl: newAvatarUrl }
    })
} satisfies FileRouter

export type AppFileRouter = typeof fileRouter
