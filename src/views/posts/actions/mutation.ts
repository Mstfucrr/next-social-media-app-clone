import { useToast } from '@/components/ui/use-toast'
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { submitPost } from '.'
import { PostsPage } from '../types'

export default function useSubmitPostMutation() {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async newPost => {
      // cancel the query to refetch the data
      const queryFiler: QueryFilters = { queryKey: ['post-feed', 'for-you'] }

      // kısım 1
      await queryClient.cancelQueries(queryFiler)

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(queryFiler, oldData => {
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

      // kısım 2
      // queryClient.invalidateQueries(queryFiler) // Bu kısmı kullanmak yerine yukarıdaki kısmı kullanarak daha performanslı bir şekilde işlem yapabiliriz. Yukarıdaki kısmı kullanarak sadece ilk sayfayı güncellemiş oluyoruz. Bu sayede tüm sayfaları tekrar yüklemek yerine sadece ilk sayfayı güncellemiş oluyoruz

      toast({ description: 'Post created successfully.' }) // Post başarılı bir şekilde oluşturulduğunda toast mesajı gösteriyoruz
    },
    onError: error => {
      console.error(error)
      toast({
        variant: 'destructive',
        description: 'Failed to create post, please try again later.'
      })
    }
  })
  return mutation
}
