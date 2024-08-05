import Image, { StaticImageData } from 'next/image'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PencilIcon, Trash2 } from 'lucide-react'
import Resizer from 'react-image-file-resizer'
import CropImageDialog from './CropImageDialog'

interface AvatarInputProps {
  src: string | StaticImageData
  onImageCropped: (blob: Blob | null) => void
}

export default function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
  const [imageToCrop, setImageToCrop] = useState<File>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onImageSelected = (image: File | undefined) => {
    if (!image) return
    Resizer.imageFileResizer(image, 1024, 1024, 'WEBP', 100, 0, uri => setImageToCrop(uri as File), 'file')
  }

  const clearImage = () => {
    setImageToCrop(undefined)
    onImageCropped(null)
  }

  return (
    <>
      <input
        type='file'
        ref={fileInputRef}
        accept='image/*'
        onChange={e => onImageSelected(e.target.files?.[0])}
        className='sr-only hidden'
      />
      <div className='relative mx-auto !size-60'>
        <Image
          alt='avatar'
          width={48}
          height={48}
          src={src}
          className='mx-auto !size-full origin-center rounded-full object-cover'
        />
        <Button
          type='button'
          className='absolute bottom-0 right-0 size-auto rounded-full hover:bg-transparent'
          variant='ghost'
          onClick={() => fileInputRef.current?.click()}
        >
          <div className='rounded-full bg-white p-3 text-primary transition-all duration-300 hover:bg-primary hover:text-white'>
            <PencilIcon className='!size-10' />
          </div>
        </Button>
        {typeof src === 'string' && src.startsWith('blob:') && (
          <Button
            type='button'
            className='absolute right-0 top-0 size-auto rounded-full hover:bg-transparent'
            variant='ghost'
            onClick={clearImage}
          >
            <div className='rounded-full bg-white p-2 text-red-500 transition-all duration-300 hover:bg-primary hover:text-white'>
              <Trash2 className='!size-7' />
            </div>
          </Button>
        )}
        {imageToCrop && (
          <CropImageDialog
            src={URL.createObjectURL(imageToCrop)}
            cropAspectRatio={1}
            onCropped={onImageCropped}
            onClose={() => {
              setImageToCrop(undefined)
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
          />
        )}
      </div>
    </>
  )
}
