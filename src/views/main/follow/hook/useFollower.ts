import kyInstance from '@/lib/ky'
import { FollowerInfo } from '@/lib/types'
import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export default function useFollower(userId: string, initialState: FollowerInfo) {
  const queryClient = useQueryClient()

  const QUERY_KEY: QueryKey = ['follower-info', userId]

  const query = useQuery({
    queryKey: QUERY_KEY, // bu queryKey'i kullanarak bu query'i daha sonra referans alabiliriz
    queryFn: () => kyInstance.get(`/api/users/${userId}/followers`).json<FollowerInfo>(), // queryFn, verileri getiren fonksiyon
    initialData: initialState, // initialData, verilerin yüklenmesi sırasında gösterilecek olan veri
    staleTime: Infinity
  })

  const mutation = useMutation({
    mutationFn: () => {
      return initialState.isFollowdUser
        ? kyInstance.delete(`/api/users/${userId}/followers`).json<FollowerInfo>()
        : kyInstance.post(`/api/users/${userId}/followers`).json<FollowerInfo>()
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY })

      const previousData = queryClient.getQueryData<FollowerInfo>(QUERY_KEY)

      queryClient.setQueryData<FollowerInfo>(QUERY_KEY, () => ({
        followers: (previousData?.followers ?? 0) + (previousData?.isFollowdUser ? -1 : 1),
        isFollowdUser: !previousData?.isFollowdUser
      }))

      return { previousData }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData<FollowerInfo>(QUERY_KEY, context?.previousData)
      console.error(err)
      toast.error('Failed to follow user')
    }
  })

  return {
    data: query.data,
    mutate: mutation.mutate,
    isLoading: mutation.isPending
  }
}
