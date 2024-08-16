import prisma from '@/lib/prisma'
import { validateRequest } from '@/views/auth/lib/auth'
import PostDetailView from '@/views/main/posts/post'
import { getPostDataInclude } from '@/views/main/utils'
import { notFound } from 'next/navigation'
import { cache } from 'react'

interface PostPageProps {
  params: { postId: string }
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: getPostDataInclude(loggedInUserId)
  })

  if (!post) return notFound()

  return post
})

export async function generateMetadata({ params }: PostPageProps) {
  const { user } = await validateRequest()

  if (!user) return {}

  const post = await getPost(params.postId, user.id)

  return {
    title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { user } = await validateRequest()

  if (!user) return <p className='text-destructive'>You need to be logged in to view this page</p>

  const post = await getPost(params.postId, user.id)

  return <PostDetailView post={post} />
}
