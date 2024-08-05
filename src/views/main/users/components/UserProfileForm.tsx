import { UserData } from '@/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UpdateUserProfileValues, updateUserProfileSchema } from '@/views/auth/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateUserProfile } from '../actions/mutation'
import { Button } from '@/components/ui/button'
import FormTextInput from '@/components/ui/FormTextInput'
import { Form } from '@/components/ui/form'
import LoadingButton from '@/components/ui/loadingButton'
import FormTextArea from '@/components/ui/FormTextArea'
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
          <Button type='button' variant='secondary' onClick={handleDeactiveEdit}>
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
