'use client'

import { Loader2 } from 'lucide-react'
import useCommentOperations from '../../hooks/useCommentOperations'
import Comment from '../components/Comments/Comment'
import CommentInput from '../components/Comments/CommentInput'
import InfiniteScrollContainer from '../components/PostsList/InfiniteScrollContainer'
import { PostData } from '../types'

interface PostDetailCommentsProps {
  post: PostData
}

export default function PostDetailComments({ post }: PostDetailCommentsProps) {
  const { commentsQuery } = useCommentOperations(post.id)

  const { data, fetchNextPage, hasNextPage, isFetching, status, isFetchingNextPage } =
    commentsQuery(10)

  const comments = data?.pages.flatMap(page => page.comments).reverse() ?? []

  if (status === 'pending') return <Loader2 className='mx-auto animate-spin' />

  if (status === 'success' && !comments.length && !hasNextPage)
    return <p className='text-center text-muted-foreground'>No posts found.</p>

  if (status === 'error')
    return <p className='text-center text-destructive'>An error occured while loading posts.</p>

  return (
    <div className='space-y-3'>
      <div className='bg-card py-5 px-3 rounded-2xl'>
        {post._count.comments > 0 && (
          <h2 className='text-lg font-semibold mb-4 mt-1'>{post._count.comments} Comments</h2>
        )}

        <div className='flex flex-col gap-5'>
          <div className=''>
            <CommentInput postId={post.id} />
          </div>
          <InfiniteScrollContainer
            className='space-y-5 -mx-3'
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
          >
            {comments.map(comment => (
              <div
                className='bg-primary-foreground py-3 px-4 rounded-2xl transition-colors duration-200 hover:bg-card'
                key={comment.id}
              >
                <Comment comment={comment} />
              </div>
            ))}

            {isFetchingNextPage && <Loader2 className='mx-auto my-3 animate-spin' />}
          </InfiniteScrollContainer>
        </div>
      </div>
    </div>
  )
}
