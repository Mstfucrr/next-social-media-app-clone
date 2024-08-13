import { LikeInfo } from '@/lib/types'
import { cn } from '@/lib/utils'
import useLikeOperations from '@/views/main/hooks/useLikeOperations'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  postId: string
  initialState: LikeInfo
}

export default function LikeButton({ postId, initialState }: LikeButtonProps) {
  const { likesData, mutate: handleLike } = useLikeOperations({ postId, initialState })

  return (
    <button
      onClick={() => handleLike()}
      className='flex items-center gap-2'
      aria-label='Like post'
      title={likesData.isLikedByUser ? 'Unlike' : 'Like'}
    >
      <Heart className={cn('w-5 h-5', likesData.isLikedByUser && 'fill-red-500 text-red-500')} />
      <span className='text-sm font-medium tabular-nums'>
        {likesData.likes} <span className='sm:inline hidden'>likes</span>
      </span>
    </button>
  )
}
