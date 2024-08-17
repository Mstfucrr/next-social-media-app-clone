import LoadingButton from '@/components/ui/loadingButton'
import useCommentOperations from '@/views/main/hooks/useCommentOperations'
import { ChevronUp, Loader2 } from 'lucide-react'
import { PostData } from '../../types'
import Comment from './Comment'
import CommentInput from './CommentInput'

interface CommentsProps {
  post: PostData
}

export default function Comments({ post }: CommentsProps) {
  const { commentsQuery } = useCommentOperations(post.id)

  const { data, fetchNextPage, hasNextPage, isFetching, status } = commentsQuery()

  const comments = data?.pages.flatMap(page => page.comments) ?? []

  return (
    <div className='space-y-3'>
      <CommentInput postId={post.id} />
      {hasNextPage && (
        <LoadingButton
          onClick={() => fetchNextPage()}
          className='mx-auto block'
          isLoading={isFetching}
          disabled={isFetching}
          variant='link'
        >
          <ChevronUp className='size-4 mr-2' />
          Load previous comments
        </LoadingButton>
      )}
      {status === 'pending' && <Loader2 className='mx-auto animate-spin' />}
      {status === 'success' && !comments.length && (
        <p className='text-center text-muted-foreground'>No comments yet</p>
      )}
      {status === 'error' && (
        <p className='text-center text-destructive'>An error occurred while fetching comments</p>
      )}
      <div className='divide-y'>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
