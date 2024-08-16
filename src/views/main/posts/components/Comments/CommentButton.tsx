import { cn } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'
import { PostData } from '../../types'

interface CommentButtonProps {
  post: PostData
  onClick: () => void
  className?: string
}

export default function CommentButton({ post, className, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className={cn('flex items-center gap-2', className)}>
      <MessageSquare size={20} />
      <span className='text-sm font-medium tabular-nums'>
        {post._count.comments}
        <span className='hidden sm:inline'> Comments</span>
      </span>
    </button>
  )
}
