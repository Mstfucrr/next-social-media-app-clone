'use client'

import Post from '@/views/posts/components/Post'
import InfiniteScrollContainer from './InfiniteScrollContainer'
import PostSkeleton from './PostSkeleton'
import usePostOperations from '../hooks/usePostOperations'

export default function FollowingFeed() {
  const { followingFeedQuery } = usePostOperations()

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = followingFeedQuery

  const posts = data?.pages.flatMap(page => page.posts) ?? []

  if (status === 'pending') return <PostSkeleton />

  if (status === 'success' && !posts.length && !hasNextPage)
    return (
      <p className='text-center text-muted-foreground'>No posts found. Follow some users to see their posts here.</p>
    )

  if (status === 'error') return <p className='text-center text-destructive'>An error occured while loading posts.</p>

  return (
    <InfiniteScrollContainer
      className='space-y-5'
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && Array.from({ length: 3 }, (_, index) => <PostSkeleton key={index} />)}
    </InfiniteScrollContainer>
  )
}
