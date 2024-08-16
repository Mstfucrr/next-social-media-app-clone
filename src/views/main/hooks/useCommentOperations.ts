import kyInstance from '@/lib/ky'
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteComment, submitComment } from '../posts/actions'
import { CommentsPage } from '../posts/types'

export default function useCommentOperations(postId: string) {
  const queryClient = useQueryClient()

  const submitCommentMutation = useMutation({
    mutationFn: submitComment,
    onSuccess: async newComment => {
      const queryKey: QueryKey = ['comments', postId] // burada queryKey'i oluşturuyoruz

      await queryClient.cancelQueries({ queryKey }) // burada query'yi iptal ediyoruz, böylece yeni yorumu ekleyebiliriz

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey, // burada query'yi güncelliyoruz
        oldData => {
          // burada eski veriyi alıyoruz
          const firstPage = oldData?.pages[0] // burada ilk sayfayı alıyoruz
          if (firstPage) {
            // eğer ilk sayfa varsa

            return {
              pageParams: oldData?.pageParams, // Eski sayfa parametrelerini alıyoruz
              pages: [
                {
                  previousCursor: firstPage.previousCursor, // Eski sayfanın previousCursor'ını alıyoruz
                  comments: [...firstPage.comments, newComment] // Yeni yorumu ilk sayfaya ekliyoruz
                },
                ...oldData.pages.slice(1) // Eski sayfaların geri kalanını alıyoruz. Yani 1. sayfadan sonraki sayfaları ekliyoruz
              ]
            }
          }
        }
      )

      queryClient.invalidateQueries({ queryKey, predicate: query => !query.state.data }) // burada query'yi geçersiz kılıyoruz ve sadece veri olmayan query'leri geçersiz kılıyoruz

      toast.success('Comment created successfully.', { autoClose: 2000 })
    },
    onError: error => {
      console.error(error)
      toast.error('Failed to create comment.')
    }
  })

  const commentsQuery = useInfiniteQuery({
    queryKey: ['comments', postId], // burada queryKey'i oluşturuyoruz
    queryFn: async ({ pageParam }) =>
      kyInstance
        .get(
          `/api/posts/${postId}/comments`,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        ) // burada sayfayı alıyoruz
        .json<CommentsPage>(), // burada sayfayı json olarak dönüştürüyoruz
    initialPageParam: null as string | null, // burada ilk sayfa parametresini alıyoruz ve null olarak ayarlıyoruz
    getNextPageParam: firtPage => firtPage.previousCursor, // burada bir sonraki sayfa için firstPage.previousCursor'u alıyoruz
    select: data => ({
      pages: [...data.pages].reverse(), // burada sayfaları ters çeviriyoruz
      pageParams: [...data.pageParams].reverse() // burada sayfa parametrelerini ters çeviriyoruz.
      // Bu, sayfaların en son sayfadan başlayarak yüklenmesini sağlar
    })
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async deletedComment => {
      const queryKey: QueryKey = ['comments', deletedComment.postId] // burada queryKey'i oluşturuy

      await queryClient.cancelQueries({ queryKey }) // burada query'yi iptal ediyoruz

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(queryKey, oldData => {
        if (!oldData) return

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map(page => ({
            previousCursor: page.previousCursor,
            comments: page.comments.filter(c => c.id !== deletedComment.id)
          }))
        }
      })

      toast.success('Comment deleted successfully.', { autoClose: 2000 })
    },
    onError: error => {
      console.error(error)
      toast.error('Failed to delete comment.')
    }
  })

  return { submitCommentMutation, commentsQuery, deleteCommentMutation }
}
