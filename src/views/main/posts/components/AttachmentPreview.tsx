import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import Image from 'next/image'
import { Attachment } from '../types'

interface AttachmentPreviewProps {
  attachment: Attachment
  onRemove: () => void
}

export function AttachmentPreview({ attachment, onRemove }: AttachmentPreviewProps) {
  const src = URL.createObjectURL(attachment.file)

  return (
    <div className={cn('relative mx-auto size-fit', attachment.isUploading && 'opacity-50')}>
      {attachment.file.type.startsWith('image') ? (
        <Image
          alt='attachment'
          src={src}
          width={500}
          height={500}
          className='size-fit max-h-[30rem] rounded-2xl'
        />
      ) : (
        <video controls className='size-fit max-h-[30rem] rounded-2xl'>
          <track kind='captions' src='captions.vtt' label='English' />
          <source src={src} type={attachment.file.type} />
        </video>
      )}
      {!attachment.isUploading && (
        <button
          type='button'
          className='absolute top-3 right-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60'
          onClick={onRemove}
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}

interface AttachmentPreviewsProps {
  attachments: Attachment[]
  removeAttachment: (fileNames: string) => void
}

export function AttachmentPreviews({ attachments, removeAttachment }: AttachmentPreviewsProps) {
  return (
    <div className={cn('flex flex-col gap-3', attachments.length > 1 && 'sm:grid sm:grid-cols-2')}>
      {attachments.map((attachment, index) => (
        <AttachmentPreview
          key={index}
          attachment={attachment}
          onRemove={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  )
}
