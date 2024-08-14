import kyInstance from '@/lib/ky'
import { BookmarkInfo } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface IuseBookmarkOperationsProps {
  postId: string
  initialState: BookmarkInfo
}

const useBookmarkOperations = ({ postId, initialState }: IuseBookmarkOperationsProps) => {
  const queryClient = useQueryClient()

  const QUERY_KEY = ['bookmark-info', postId]

  const { data: bookmarkData } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => kyInstance.get(`/api/posts/${postId}/bookmarks`).json<BookmarkInfo>(),
    initialData: initialState,
    staleTime: Infinity
  })

  const { mutate } = useMutation({
    mutationFn: () =>
      bookmarkData.isBookmarkedByUser
        ? kyInstance.delete(`/api/posts/${postId}/bookmarks`)
        : kyInstance.post(`/api/posts/${postId}/bookmarks`),
    onMutate: async () => {
      toast.success(`Post ${bookmarkData.isBookmarkedByUser ? 'un' : ''}bookmarked`, {
        autoClose: 1500,
        hideProgressBar: true
      })

      await queryClient.cancelQueries({ queryKey: QUERY_KEY })

      const previousState = queryClient.getQueryData<BookmarkInfo>(QUERY_KEY)

      queryClient.setQueryData<BookmarkInfo>(QUERY_KEY, () => ({
        isBookmarkedByUser: !bookmarkData.isBookmarkedByUser
      }))

      return { previousState }
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData<BookmarkInfo>(QUERY_KEY, context?.previousState)
      console.error(error)
    }
  })

  return { bookmarkData, mutate }
}

export default useBookmarkOperations
