import { BookmarkInfo } from '@/lib/types'
import { cn } from '@/lib/utils'
import useBookmarkOperations from '@/views/main/hooks/useBookmarkOpertations'
import { Bookmark } from 'lucide-react'

interface BookmarkButtonProps {
  postId: string
  initialState: BookmarkInfo
}

export default function BookmarkButton({ postId, initialState }: BookmarkButtonProps) {
  const { bookmarkData, mutate: handleBookmark } = useBookmarkOperations({ postId, initialState })

  return (
    <button
      onClick={() => handleBookmark()}
      className='flex items-center gap-2'
      aria-label='Bookmark post'
      title={bookmarkData.isBookmarkedByUser ? 'Remove bookmark' : 'Bookmark'}
    >
      <Bookmark
        className={cn('w-5 h-5', bookmarkData.isBookmarkedByUser && 'fill-primary text-primary')}
      />
    </button>
  )
}
