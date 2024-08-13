import { Skeleton } from '@/components/ui/skeleton'

export default function PostSkeleton() {
  return (
    <article className='space-y-3 rounded-2xl bg-card p-5 shadow-sm'>
      <div className='flex flex-wrap gap-3'>
        <Skeleton className='size-12 rounded-full bg-gray-300' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-20 bg-gray-300' />
          <Skeleton className='h-4 w-10 bg-gray-300' />
        </div>
      </div>
      <Skeleton className='h-20 w-full rounded-md bg-gray-300' />
    </article>
  )
}
