'use client'

import Post from '@/views/posts/components/Post'
import { PostData } from '@/views/posts/types'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

export default function ForYouFeed() {
  const query = useQuery<PostData[]>({
    queryKey: ['post-feed', 'for-you'],
    queryFn: async () => {
      const res = await fetch('/api/post/for-you', { method: 'GET' })
      if (!res.ok) throw new Error('Network response was not ok')
      return res.json()
    }
  })

  if (query.status === 'pending') return <Loader2 className='mx-auto animate-spin' />

  if (query.status === 'error')
    return <p className='text-center text-destructive'>An error occured while loading posts.</p>

  return <>{query.data?.map(post => <Post key={post.id} post={post} />)}</>
}
