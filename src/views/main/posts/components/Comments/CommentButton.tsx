import { MessageSquare } from 'lucide-react'
import { PostData } from '../../types'

interface CommentButtonProps {
  post: PostData
  onClick: () => void
}

export default function CommentButton({ post, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className='flex items-center gap-2'>
      <MessageSquare size={20} />
      <span className='text-sm font-medium tabular-nums'>
        {post._count.comments}
        <span className='hidden sm:inline'> Comments</span>
      </span>
    </button>
  )
}
