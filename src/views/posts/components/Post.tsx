import Link from 'next/link'
import { PostData } from '../types'
import UserAvatar from '@/views/main/components/UserAvatar'
import { formatRelativeDate } from '@/lib/utils'

type PostProps = {
  post: PostData
}

export default function Post({ post }: PostProps) {
  return (
    <article className='space-y-3 rounded-2xl bg-card p-5 shadow-sm'>
      <div className='flex flex-wrap gap-3'>
        <Link href={`/users/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} />
        </Link>
        <div className=''>
          <Link href={`/users/${post.user.username}`} className='block font-medium hover:underline'>
            {post.user.username}
          </Link>
          <Link href={`/posts/${post.id}`} className='block to-muted-foreground text-sm hover:underline'>
            {formatRelativeDate(post.createdAt)}
          </Link>
        </div>
      </div>
      <div className='whitespace-pre-line break-words'>{post.content}</div>
    </article>
  )
}
