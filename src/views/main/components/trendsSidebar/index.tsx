import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

const WhoToFollow = dynamic(() => import('./whoToFollow'), {
  ssr: false,
  loading: () => (
    <div className='rounded-2xl bg-card p-5 shadow-sm'>
      <Loader2 size='2rem' className='mx-auto animate-spin' />
    </div>
  )
})

const TrendingTopics = dynamic(() => import('./trendingTopics'), {
  ssr: false,
  loading: () => (
    <div className='rounded-2xl bg-card p-5 shadow-sm'>
      <Loader2 size='2rem' className='mx-auto animate-spin' />
    </div>
  )
})

const TrendsSidebar = () => {
  return (
    <div className='sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80'>
      <WhoToFollow />
      <TrendingTopics />
    </div>
  )
}

export default TrendsSidebar
