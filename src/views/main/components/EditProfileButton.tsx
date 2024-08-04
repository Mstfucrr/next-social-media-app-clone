import { Button } from '@/components/ui/button'
import { UserData } from '@/types'
import { PencilIcon } from 'lucide-react'

interface EditProfileButtonProps {
  user: UserData
}

const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  return (
    <Button variant='secondary'>
      <PencilIcon className='!mr-2' size={15} />
      Edit Profile
    </Button>
  )
}

export default EditProfileButton
