'use client'
import LoadingButton from '@/components/ui/loadingButton'
import { Progress } from '@/components/ui/progress'
import UserAvatar from '@/views/main/components/UserAvatar'
import useSession from '@/views/main/hooks/useSession'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Loader2 } from 'lucide-react'
import AddAttachmentButton from '../components/AddAttachmentButton'
import { AttachmentPreviews } from '../components/AttachmentPreview'
import useSubmitPostMutation from './actions/mutation'
import useMediaUpload from './hooks/useMediaUpload'

export default function PostEditor() {
  const { user } = useSession()

  const { mutate: createPost, isPending } = useSubmitPostMutation()

  const {
    attachments,
    startUpload,
    isUploading,
    removeAttachment,
    reset: resetMediaUploads,
    uploadProgress
  } = useMediaUpload()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false
      }),

      Placeholder.configure({
        placeholder: "What's on crack-a-lackin?"
      })
    ]
  })

  const input = editor?.getText({ blockSeparator: '\n' }) ?? ''

  const onSubmit = () => {
    if (!input.trim()) return
    createPost(
      {
        content: input,
        mediaIds: attachments.map(a => a.mediaId).filter(Boolean) as string[]
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent()
          resetMediaUploads()
        }
      }
    )
  }

  return (
    <div className='flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm'>
      <div className='flex w-full gap-5'>
        <UserAvatar avatarUrl={user.avatarUrl} className='hidden sm:inline' />
        <EditorContent
          editor={editor}
          className='max-h-80 w-full overflow-y-auto rounded-2xl bg-background px-5 py-3'
        />
      </div>
      {!!attachments.length && (
        <AttachmentPreviews attachments={attachments} removeAttachment={removeAttachment} />
      )}
      <div className='flex justify-end gap-x-2'>
        {isUploading && (
          <div className='flex items-center gap-2 w-full'>
            <span className='text-sm'>Uploading...</span>
            <Loader2 className='size-5 animate-spin text-primary' size={24} />
            <Progress value={uploadProgress} />
          </div>
        )}
        <AddAttachmentButton onFilesSelected={startUpload} disabled={isUploading} />

        <LoadingButton
          isLoading={isPending}
          onClick={onSubmit}
          disabled={!input.trim() || isUploading}
          className='min-w-20'
        >
          {isPending ? 'Posting...' : 'Post'}
        </LoadingButton>
      </div>
    </div>
  )
}
