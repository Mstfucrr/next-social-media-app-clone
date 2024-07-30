import React from 'react'
import PostEditor from './components/PostEditor'
import TrendsSidebar from '../main/components/trendsSidebar'
import ForYouFeed from '../main/components/ForYouFeed'

export default function PostView() {
  return (
    <div className='flex w-full gap-5'>
      <div className='flex w-full flex-col gap-5'>
        <PostEditor />
        <hr className='mx-auto my-2 h-0.5 w-2/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent' />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </div>
  )
}
