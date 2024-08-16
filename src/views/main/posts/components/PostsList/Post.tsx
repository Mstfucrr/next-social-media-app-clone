'use client'
import { formatRelativeDate } from '@/lib/utils'
import Linkify from '@/views/main/components/Linkify'
import UserAvatar from '@/views/main/components/UserAvatar'
import useSession from '@/views/main/hooks/useSession'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import UserTooltip from '../../../components/UserTooltip'
import { PostData } from '../../types'
import Comments from '../Comments'
import CommentButton from '../Comments/CommentButton'
import PostMoreButton from '../PostMoreButton'
import BookmarkButton from './BookmarkButton'
import LikeButton from './LikeButton'
import MediaPreviews from './MediaPreview'

type PostProps = {
  post: PostData
}

export default function Post({ post }: PostProps) {
  const { user: loggedInUser } = useSession()

  const [showComments, setShowComments] = useState(false)

  const pathName = usePathname()

  const isPostPage = pathName.endsWith(post.id)

  return (
    <article className='group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm'>
      <div className='flex justify-between gap-3'>
        <div className='flex w-full flex-wrap gap-3'>
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className='block font-medium hover:underline'
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className='block to-muted-foreground text-sm hover:underline'
              suppressHydrationWarning // bu sayede hydration hatası alınmaz
              // hydration: client-side rendering yaparken, server-side rendering'den gelen verileri kullanarak client-side rendering yapma işlemidir
            >
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
      {!!post.attachments.length && <MediaPreviews attachments={post.attachments} />}

      <hr className='text-muted-foreground' />
      <div className='flex w-full gap-5 justify-between items-center'>
        <div className='flex items-center gap-5'>
          <LikeButton
            postId={post.id}
            initialState={{
              isLikedByUser: post.likes.some(like => like.userId === loggedInUser?.id),
              likes: post._count.likes
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
            className={isPostPage ? 'hidden' : ''}
          />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              bookmark => bookmark.userId === loggedInUser?.id
            )
          }}
        />
      </div>
      {showComments && <Comments post={post} />}
    </article>
  )
}
