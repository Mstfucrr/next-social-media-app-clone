'use client'

import Post from '@/views/main/components/PostsList/Post'
import InfiniteScrollContainer from './InfiniteScrollContainer'
import PostSkeleton from './PostSkeleton'
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { PostsPage } from '@/views/main/posts/types'
import { Loader2 } from 'lucide-react'

interface PostsListProps {
  queryResult: UseInfiniteQueryResult<InfiniteData<PostsPage, unknown>, Error>
}

export default function PostsList({ queryResult }: PostsListProps) {
  if (!queryResult) return null

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = queryResult

  const posts = data?.pages.flatMap(page => page.posts) ?? []

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
      {isFetchingNextPage && <Loader2 className='mx-auto my-3 animate-spin' />}
    </InfiniteScrollContainer>
  )
}
