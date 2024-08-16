import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/ui/loadingButton'
import useCommentOperations from '@/views/main/hooks/useCommentOperations'
import { SendHorizonal } from 'lucide-react'
import { useState } from 'react'
import { PostData } from '../../types'

interface CommentInputProps {
  post: PostData
}

export default function CommentInput({ post }: CommentInputProps) {
  const [input, setInput] = useState('')

  const { submitCommentMutation } = useCommentOperations(post.id)

  const { mutate: onSubmit, isPending } = submitCommentMutation

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!input?.trim()) return

    onSubmit(
      {
        postId: post.id,
        content: input
      },
      {
        onSuccess: () => setInput('')
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className='flex w-full items-center gap-2'>
      <Input
        placeholder='Write a comment...'
        value={input}
        onChange={e => setInput(e.target.value)}
        autoFocus
      />
      <LoadingButton isLoading={isPending} type='submit' disabled={!input.trim()}>
        <SendHorizonal size={20} />
      </LoadingButton>
    </form>
  )
}
