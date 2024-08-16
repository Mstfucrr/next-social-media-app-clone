import { formatRelativeDate } from '@/lib/utils'
import Linkify from '@/views/main/components/Linkify'
import UserAvatar from '@/views/main/components/UserAvatar'
import UserTooltip from '@/views/main/components/UserTooltip'
import useSession from '@/views/main/hooks/useSession'
import Link from 'next/link'
import { CommentData } from '../../types'
import CommentsMoreButton from './CommentsMoreButton'

interface CommentProps {
  comment: CommentData
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useSession()
  return (
    <div className='flex gap-3 py-3 group/comment' key={comment.id}>
      <span className='hidden sm:inline'>
        <UserTooltip user={comment.user}>
          <Link href={`/users/${comment.user.username}`}>
            <UserAvatar avatarUrl={comment.user.avatarUrl} className='min-w-10' size={40} />
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className='flex items-center gap-1 text-sm'>
          <UserTooltip user={comment.user}>
            <Link href={`/users/${comment.user.username}`} className='font-medium hover:underline'>
              {comment.user.displayName}
            </Link>
          </UserTooltip>
          <span className='text-muted-foreground'>{formatRelativeDate(comment.createdAt)}</span>
        </div>
        <Linkify>
          <div>{comment.content}</div>
        </Linkify>
      </div>
      {user && user.id === comment.user.id && (
        <CommentsMoreButton
          className='ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100'
          comment={comment}
        />
      )}
    </div>
  )
}
