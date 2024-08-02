import React from 'react'
import PostEditor from './editor/PostEditor'
import ForYouFeed from './components/ForYouFeed'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import FollowingFeed from './components/FollowingFeed'

export default function PostView() {
  return (
    <div className='flex w-full flex-col gap-5'>
      <PostEditor />
      <hr className='mx-auto my-2 h-0.5 w-2/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent' />
      <Tabs defaultValue='for-you'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='for-you'>For You</TabsTrigger>
          <TabsTrigger value='following'>Following</TabsTrigger>
        </TabsList>
        <TabsContent value='for-you'>
          <ForYouFeed />
        </TabsContent>
        <TabsContent value='following'>
          <FollowingFeed />
        </TabsContent>
      </Tabs>
    </div>
  )
}
