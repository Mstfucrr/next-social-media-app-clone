import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'
import { useRef } from 'react'

interface AddAttachmentButtonProps {
  onFilesSelected: (files: Array<File>) => void
  disabled: boolean
}

export default function AddAttachmentButton({
  onFilesSelected,
  disabled
}: AddAttachmentButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        type='file'
        ref={fileInputRef}
        accept='image/*, video/*'
        onChange={e => {
          const files = Array.from(e.target.files || [])
          if (files.length) {
            onFilesSelected(files)
            e.target.value = ''
          }
        }}
        className='sr-only hidden'
        multiple
      />

      <Button
        variant='ghost'
        size='icon'
        className='hover:text-primary text-primary'
        aria-label='Add attachment'
        title='Add attachment'
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={24} />
      </Button>
    </>
  )
}
