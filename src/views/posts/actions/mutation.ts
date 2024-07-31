import { PostData, PostsPage } from '../types'
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { deletePost } from '.'
import { toast } from 'react-toastify'

export function useDeleteMutation(post: PostData) {
  const queryClient = useQueryClient()

  const router = useRouter()

  const pathName = usePathname()

  const mutation = useMutation({
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

  return mutation
}
