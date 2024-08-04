import type { AppFileRouter } from '@/app/api/users/uploadthing/core'
import { generateReactHelpers } from '@uploadthing/react'

export const { useUploadThing, uploadFiles } = generateReactHelpers<AppFileRouter>()
