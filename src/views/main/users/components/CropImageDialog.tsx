import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useRef } from 'react'
import { Cropper, ReactCropperElement } from 'react-cropper'

interface CropImageDialogProps extends DialogPrimitive.DialogProps {
  src: string
  cropAspectRatio: number
  onCropped: (blob: Blob | null) => void
  onClose: () => void
}

export default function CropImageDialog({ src, cropAspectRatio, onCropped, onClose }: CropImageDialogProps) {
  const cropperRef = useRef<ReactCropperElement>(null)

  const crop = () => {
    const cropper = cropperRef.current?.cropper
    if (!cropper) return
    cropper.getCroppedCanvas().toBlob(blob => onCropped(blob), 'image/webp')
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop image</DialogTitle>
        </DialogHeader>
        <Cropper
          src={src}
          aspectRatio={cropAspectRatio}
          guides={false}
          zoomable={false}
          ref={cropperRef}
          className='mx-auto size-fit'
        />
        <DialogFooter>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={crop}>Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
