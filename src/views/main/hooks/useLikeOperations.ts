import kyInstance from '@/lib/ky'
import { LikeInfo } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface IuseLikeOperationsProps {
  postId: string
  initialState: LikeInfo
}

const useLikeOperations = ({ postId, initialState }: IuseLikeOperationsProps) => {
  const queryClient = useQueryClient()

  const QUERY_KEY = ['like-info', postId]

  const { data: likesData } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => kyInstance.get(`/api/posts/${postId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity
  })

  const { mutate } = useMutation({
    mutationFn: () =>
      likesData.isLikedByUser // Eğer like varsa delete, yoksa post işlemi yap
        ? kyInstance.delete(`/api/posts/${postId}/likes`) // like'ı sil
        : kyInstance.post(`/api/posts/${postId}/likes`), // like'ı post et
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY }) // Eğer like işlemi yapılırken yeni bir like işlemi yapılırsa önceki işlemi iptal et

      const previousState = queryClient.getQueryData<LikeInfo>(QUERY_KEY) // Önceki state'i al

      queryClient.setQueryData<LikeInfo>(QUERY_KEY, () => ({
        // State'i güncelle ve yeni state'i dön
        likes: (previousState?.likes ?? 0) + (likesData.isLikedByUser ? -1 : 1), // Eğer like varsa -1, yoksa +1
        isLikedByUser: !likesData.isLikedByUser // Eğer like varsa false, yoksa true
      }))

      return { previousState }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData<LikeInfo>(QUERY_KEY, context?.previousState) // Eğer hata olursa state'i önceki state'e geri dön
      console.error(error)
    }
  })

  return { likesData, mutate }
}

export default useLikeOperations
