import { useUploadThing } from '@/lib/uploadthing' // Dosya yükleme işlevini sağlayan özel bir hook'u içe aktarır.
import { useState } from 'react' // React'ın useState hook'unu içe aktarır.
import { toast } from 'react-toastify'
import { Attachment } from '../../types'

export default function useMediaUpload() {
  const [attachments, setAttachments] = useState<Attachment[]>([]) // Yüklenen dosyaları tutan state.
  const [uploadProgress, setUploadProgress] = useState<number>() // Yükleme ilerlemesini tutan state.

  // useUploadThing hook'unu kullanarak yükleme işlemlerini başlatır ve yönetir.
  const { startUpload, isUploading } = useUploadThing('attachment', {
    // Dosya yüklemesi başlamadan önce çağrılır.
    onBeforeUploadBegin(files) {
      // Dosyaların adlarını yeniden adlandırır.
      const renamedFiles = files.map(file => {
        const extention = file.name.split('.').pop() // Dosya uzantısını alır.
        return new File([file], `attachment-${crypto.randomUUID()}.${extention}`, {
          type: file.type // Dosya türünü korur.
        })
      })

      // Yeni dosyaları attachments state'ine ekler ve isUploading bayrağını true olarak ayarlar.
      setAttachments(prev => [...prev, ...renamedFiles.map(file => ({ file, isUploading: true }))])

      return renamedFiles // Yeniden adlandırılmış dosyaları döner.
    },
    onUploadProgress: setUploadProgress, // Yükleme ilerlemesini günceller.

    // Yükleme tamamlandığında çağrılır.
    onClientUploadComplete(res) {
      setAttachments(prev =>
        prev.map(a => {
          const uploadResult = res.find(r => r.name === a.file.name) // Yükleme sonucunda dosyayı bulur.

          if (!uploadResult) return a // Eğer dosya bulunamazsa, mevcut dosyayı döner.

          return {
            ...a, // Mevcut dosya bilgilerini korur.
            mediaId: uploadResult.serverData.mediaId, // Yüklenen dosyanın sunucuda aldığı kimliği ekler.
            isUploading: false // Yükleme işlemini tamamlanmış olarak işaretler.
          }
        })
      )
    },

    // Yükleme sırasında bir hata oluştuğunda çağrılır.
    onUploadError(err) {
      setAttachments(prev => prev.filter(a => !a.mediaId)) // Yüklenemeyen dosyaları attachments state'inden
      throw err // Hata nesnesini fırlatır.
    }
  })

  const startUploadWithToast = (files: Array<File>) => {
    if (attachments.length + files.length > 5) {
      toast.error('You can only upload up to 5 files at a time')
      return
    }

    toast.promise(startUpload(files), {
      pending: 'Uploading files...',
      success: 'Files uploaded successfully',
      error: 'Failed to upload files'
    })
  }

  const removeAttachment = (fileName: string) => {
    setAttachments(prev => prev.filter(a => a.file.name !== fileName))
  }

  const reset = () => {
    setAttachments([])
    setUploadProgress(undefined)
  }

  return {
    attachments,
    startUpload: startUploadWithToast,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset
  }
}
