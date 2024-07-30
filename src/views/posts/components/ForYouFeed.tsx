'use client'

import kyInstance from '@/lib/ky'
import Post from '@/views/posts/components/Post'
import { PostsPage } from '@/views/posts/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScrollContainer from './InfiniteScrollContainer'
import PostSkeleton from './PostSkeleton'

export default function ForYouFeed() {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['post-feed', 'for-you'],
    queryFn: async ({ pageParam }) =>
      kyInstance.get('/api/post/for-you', pageParam ? { searchParams: { cursor: pageParam } } : {}).json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => lastPage.nextCursor
  })

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
