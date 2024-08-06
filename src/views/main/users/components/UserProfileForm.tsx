import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormTextArea from '@/components/ui/FormTextArea'
import FormTextInput from '@/components/ui/FormTextInput'
import LoadingButton from '@/components/ui/loadingButton'
import { UserData } from '@/types'
import { UpdateUserProfileValues, updateUserProfileSchema } from '@/views/auth/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateUserProfile } from '../actions/mutation'
import AvatarInput from './AvatarInput'

interface UserProfileFormProps {
  user: UserData
  handleDeactiveEdit: () => void
}

const UserProfileForm = ({ user, handleDeactiveEdit }: UserProfileFormProps) => {
  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio ?? ''
    }
  })

  const { mutate: handleUpdateUser, isPending } = useUpdateUserProfile()
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null)

  const onSubmit = (values: UpdateUserProfileValues) => {
    const newAvatarFile = croppedAvatar ? new File([croppedAvatar], `avatar-${user.id}.png`) : undefined

    handleUpdateUser(
      { values, avatar: newAvatarFile },
      {
        onSuccess: () => {
          setCroppedAvatar(null)
          handleDeactiveEdit()
        }
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <AvatarInput
          src={
            croppedAvatar ? URL.createObjectURL(croppedAvatar) : (user.avatarUrl ?? '/assets/avatar-placeholder.png')
          }
          onImageCropped={setCroppedAvatar}
        />
        <FormTextInput
          control={form.control}
          label='Display Name'
          className='w-full'
          placeholder='Display Name'
          name='displayName'
        />
        <FormTextArea
          control={form.control}
          label='Bio'
          className='w-full resize-none'
          placeholder='Tell us about yourself'
          name='bio'
        />

        <div className='flex justify-end space-x-2'>
          <Button
            type='button'
            variant='secondary'
            onClick={handleDeactiveEdit}
            disabled={(!form.formState.isDirty && !croppedAvatar) || isPending}
            className='disabled:opacity-50'
          >
            Cancel
          </Button>
          <LoadingButton isLoading={isPending} type='submit'>
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}

export default UserProfileForm
