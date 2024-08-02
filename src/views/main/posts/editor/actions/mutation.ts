import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { submitPost } from '.'
import { PostsPage } from '../../types'
import { toast } from 'react-toastify'
import useSession from '@/views/main/hooks/useSession'

export default function useSubmitPostMutation() {
  const queryClient = useQueryClient()

  const { user } = useSession()

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async newPost => {
      // cancel the query to refetch the data
      const queryFilter = {
        queryKey: ['post-feed'],
        predicate: query => {
          return (
            query.queryKey.includes('for-you') ||
            (query.queryKey.includes('user-posts') && query.queryKey.includes(user.id))
          )
        }
      } satisfies QueryFilters

      // kısım 1
      await queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(queryFilter, oldData => {
        const firstPage = oldData?.pages[0] // Burada ilk sayfayı alıyoruz
        if (firstPage) {
          // Eğer ilk sayfa varsa
          return {
            pageParams: oldData?.pageParams, // Eski sayfa parametrelerini alıyoruz
            pages: [
              {
                posts: [newPost, ...firstPage.posts], // Yeni postu ilk sayfaya ekliyoruz
                nextCursor: firstPage.nextCursor // İlk sayfanın nextCursor'ını alıyoruz
              },
              ...oldData.pages.slice(1) // Eski sayfaların geri kalanını alıyoruz. Yani 1. sayfadan sonraki sayfaları ve ekliyoruz
            ]
          }
        }
      })

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return queryFilter.predicate(query) && !query.state.data
        }
      })

      // kısım 2
      // queryClient.invalidateQueries(queryFilter) // Bu kısmı kullanmak yerine yukarıdaki kısmı kullanarak daha performanslı bir şekilde işlem yapabiliriz. Yukarıdaki kısmı kullanarak sadece ilk sayfayı güncellemiş oluyoruz. Bu sayede tüm sayfaları tekrar yüklemek yerine sadece ilk sayfayı güncellemiş oluyoruz

      toast.success('Post created successfully.', { autoClose: 2000 })
    },
    onError: error => {
      console.error(error)
      toast.error('Failed to create post.')
    }
  })
  return mutation
}
