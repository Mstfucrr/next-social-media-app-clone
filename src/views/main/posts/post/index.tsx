import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import Post from '../components/PostsList/Post'
import { PostData } from '../types'
import PostDetailComments from './PostDetailComments'

const UserInfoSidebar = dynamic(() => import('../components/UserInfoSidebar'), {
  ssr: false,
  loading: () => (
    <div className='rounded-2xl bg-card p-5 shadow-sm'>
      <Loader2 size='2rem' className='mx-auto animate-spin' />
    </div>
  )
})

interface PostDetailViewProps {
  post: PostData
}

const PostDetailView = ({ post }: PostDetailViewProps) => {
  return (
    <main className='flex w-full gap-5'>
      <div className='w-full space-y-5 flex flex-col gap-4'>
        <Post post={post} />
        <PostDetailComments post={post} />
      </div>
      <div className='sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80'>
        <UserInfoSidebar user={post.user} />
      </div>
    </main>
  )
}

export default PostDetailView
