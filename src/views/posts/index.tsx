import prisma from '@/lib/prisma'
import React from 'react'
import PostEditor from './actions/PostEditor'
import Post from './components/Post'
import { postDataInclude } from './types'

export default async function PostView() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: postDataInclude
  })

  return (
    <div className='flex w-full flex-col gap-5'>
      <PostEditor />
      <hr className='mx-auto my-5 h-0.5 w-2/3 bg-blue-400' />
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}
