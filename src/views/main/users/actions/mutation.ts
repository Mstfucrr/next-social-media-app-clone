import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserProfile } from '.'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/lib/uploadthing'
import { UpdateUserProfileValues } from '@/views/auth/lib/validation'
import { PostsPage } from '../../posts/types'

export const useUpdateUserProfile = () => {
  const router = useRouter()

  const queryClient = useQueryClient()

  const { startUpload: startAvatarUpload } = useUploadThing('avatar')

  const mutation = useMutation({
    mutationFn: async ({ values, avatar }: { values: UpdateUserProfileValues; avatar?: File }) => {
      return Promise.all([updateUserProfile(values), avatar && startAvatarUpload([avatar])])
    },
    onSuccess: async ([updatedUser, uploadResult]) => {
      const newAvatarUrl = uploadResult?.[0]?.serverData.avatarUrl

      const queryFilter: QueryFilters = {
        queryKey: ['post-feed']
      }

      await queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(queryFilter, oldData => {
        if (!oldData) return

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map(page => ({
            nextCursor: page.nextCursor,
            posts: page.posts.map(post => {
              if (post.user.id === updatedUser.id)
                return {
                  ...post,
                  user: {
                    ...post.user,
                    avatarUrl: newAvatarUrl ?? post.user.avatarUrl
                  }
                }

              return post
            })
          }))
        }
      })

      router.refresh()

      toast.success('Profile updated successfully')
    },
    onError: error => {
      toast.error(error.message)
    }
  })

  return mutation
}
