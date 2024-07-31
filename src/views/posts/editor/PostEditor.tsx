'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import UserAvatar from '@/views/main/components/UserAvatar'
import useSession from '@/views/main/hook/useSession'
import LoadingButton from '@/components/ui/loadingButton'
import useSubmitPostMutation from './actions/mutation'

export default function PostEditor() {
  const { user } = useSession()

  const { mutate: createPost, isPending } = useSubmitPostMutation()

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
    createPost(input, {
      onSuccess: () => {
        editor?.commands.clearContent()
      }
    })
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
      <div className='flex justify-end'>
        <LoadingButton isLoading={isPending} onClick={onSubmit} disabled={!input.trim()} className='min-w-20'>
          {isPending ? 'Posting...' : 'Post'}
        </LoadingButton>
      </div>
    </div>
  )
}
