'use client'
import Link from 'next/link'
import { PostData } from '../../posts/types'
import UserAvatar from '@/views/main/components/UserAvatar'
import { formatRelativeDate } from '@/lib/utils'
import useSession from '@/views/main/hooks/useSession'
import PostMoreButton from '../../posts/components/PostMoreButton'
import Linkify from '@/views/main/components/Linkify'
import UserTooltip from '../UserTooltip'

type PostProps = {
  post: PostData
}

export default function Post({ post }: PostProps) {
  const { user: loggedInUser } = useSession()

  return (
    <article className='group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm'>
      <div className='flex justify-between gap-3'>
        <div className='flex w-full flex-wrap gap-3'>
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div>
            <UserTooltip user={post.user}>
              <Link href={`/users/${post.user.username}`} className='block font-medium hover:underline'>
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <Link href={`/posts/${post.id}`} className='block to-muted-foreground text-sm hover:underline'>
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {loggedInUser?.id === post.user.id && (
          <PostMoreButton
            post={post}
            className='opacity-0 transition-opacity duration-300 group-hover/post:opacity-100'
          />
        )}
      </div>
      <Linkify>
        <div className='whitespace-pre-line break-words'>{post.content}</div>
      </Linkify>
    </article>
  )
}
