'use client'

import Post from '@/views/posts/components/Post'
import InfiniteScrollContainer from './InfiniteScrollContainer'
import PostSkeleton from './PostSkeleton'
import usePostOperations from '../hooks/usePostOperations'

export default function ForYouFeed() {
  const { forYouFeedQuery } = usePostOperations()

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = forYouFeedQuery

  const posts = data?.pages.flatMap(page => page.posts) ?? [] // burada pages array'ini flatMap ederek postları tek bir array'de topluyoruz

  if (status === 'pending') return <PostSkeleton />

  if (status === 'success' && !posts.length && !hasNextPage)
    return <p className='text-center text-muted-foreground'>No posts found.</p>

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
