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

  const { data } = query

  const mutation = useMutation({
    mutationFn: () => {
      return data.isFollowdUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY }) // bu query'yi iptal et

      const previousData = queryClient.getQueryData<FollowerInfo>(QUERY_KEY) // önceki veriyi al

      queryClient.setQueryData<FollowerInfo>(QUERY_KEY, () => ({
        // veriyi güncelle
        followers: (previousData?.followers ?? 0) + (previousData?.isFollowdUser ? -1 : 1),
        isFollowdUser: !previousData?.isFollowdUser
      }))

      return { previousData }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-feed', 'following'] }) // bu query'yi yenile
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData<FollowerInfo>(QUERY_KEY, context?.previousData)
      console.error(err)
      toast.error('Failed to follow user')
    }
  })

  return {
    data: data,
    mutate: mutation.mutate,
    isLoading: mutation.isPending
  }
}
