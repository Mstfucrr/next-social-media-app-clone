'use client'
import Link from 'next/link'
import { PostData } from '../types'
import UserAvatar from '@/views/main/components/UserAvatar'
import { formatRelativeDate } from '@/lib/utils'
import useSession from '@/views/main/hooks/useSession'
import PostMoreButton from './PostMoreButton'

type PostProps = {
  post: PostData
}

export default function Post({ post }: PostProps) {
  const { user } = useSession()

  return (
    <article className='group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm'>
      <div className='flex justify-between gap-3'>
        <div className='flex w-full flex-wrap gap-3'>
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div>
            <Link href={`/users/${post.user.username}`} className='block font-medium hover:underline'>
              {post.user.username}
            </Link>
            <Link href={`/posts/${post.id}`} className='block to-muted-foreground text-sm hover:underline'>
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {user?.id === post.user.id && (
          <PostMoreButton
            post={post}
            className='opacity-0 transition-opacity duration-300 group-hover/post:opacity-100'
          />
        )}
      </div>
      <div className='whitespace-pre-line break-words'>{post.content}</div>
    </article>
  )
}
