import kyInstance from '@/lib/ky'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PostsPage } from '../types'

const useForYouFeedQuery = () =>
  useInfiniteQuery({
    queryKey: ['post-feed', 'for-you'],
    queryFn: async ({ pageParam }) =>
      kyInstance.get('/api/post/for-you', pageParam ? { searchParams: { cursor: pageParam } } : {}).json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => lastPage.nextCursor
  })

export default useForYouFeedQuery
