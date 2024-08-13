import { cn } from '@/lib/utils'
import { Media } from '@prisma/client'
import Image from 'next/image'

interface MediaPreviewsProps {
  attachments: Media[]
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div className={cn('flex flex-col gap-3', attachments.length > 1 && 'sm:grid sm:grid-cols-2')}>
      {attachments.map(media => {
        if (media.type === 'IMAGE') {
          return (
            <Image
              key={media.id}
              src={media.url}
              alt='Post attachment'
              width={500}
              height={500}
              className='mx-auto size-fit max-h-[30rem] rounded-2xl'
            />
          )
        }
        if (media.type === 'VIDEO') {
          return (
            <div className='' key={media.id}>
              <video
                src={media.url}
                controls
                className='mx-auto size-fit max-h-[30rem] rounded-2xl'
              />
            </div>
          )
        }
        return (
          <p key={media.id} className='text-center text-muted-foreground'>
            Unsupported media type
          </p>
        )
      })}
    </div>
  )
}

export default MediaPreviews
