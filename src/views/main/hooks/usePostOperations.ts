import { PostsPage } from '../posts/types'
import { InfiniteData, QueryFilters, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import kyInstance from '@/lib/ky'
import { deletePost } from '../posts/actions'

const usePostOperations = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathName = usePathname()

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async deletedPost => {
      const queryFilter: QueryFilters = { queryKey: ['post-feed'] }

      await queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(queryFilter, oldData => {
        if (!oldData) return

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map(page => ({
            nextCursor: page.nextCursor,
            posts: page.posts.filter(p => p.id !== deletedPost.id)
          }))
        }
      })

      toast.success('Post deleted', { autoClose: 2000 })

      if (pathName === `/posts/${deletedPost.id}`) router.push(`/users/${deletedPost.user.username}`)
    },
    onError(error) {
      console.error(error)
      toast.error('Failed to delete post', { autoClose: 2000 })
    }
  })

  const forYouFeedQuery = useInfiniteQuery({
    queryKey: ['post-feed', 'for-you'],
    queryFn: async ({ pageParam }) =>
      kyInstance.get('/api/posts/for-you', pageParam ? { searchParams: { cursor: pageParam } } : {}).json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => lastPage.nextCursor
  })

  const useUserFeedQuery = (userId: string) =>
    useInfiniteQuery({
      queryKey: ['post-feed', 'user-posts', userId],
      queryFn: async ({ pageParam }) =>
        kyInstance
          .get(`/api/users/${userId}/posts`, pageParam ? { searchParams: { cursor: pageParam } } : {})
          .json<PostsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: lastPage => lastPage.nextCursor
    })

  const followingFeedQuery = useInfiniteQuery({
    queryKey: ['post-feed', 'following'],
    queryFn: async ({ pageParam }) =>
      kyInstance
        .get('/api/posts/following', pageParam ? { searchParams: { cursor: pageParam } } : {})
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => lastPage.nextCursor
  })

  return { deleteMutation, forYouFeedQuery, followingFeedQuery, useUserFeedQuery }
}

export default usePostOperations
