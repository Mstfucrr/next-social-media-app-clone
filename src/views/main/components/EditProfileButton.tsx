import { Button } from '@/components/ui/button'
import { UserData } from '@/types'
import { PencilIcon } from 'lucide-react'

interface EditProfileButtonProps {
  onClick: () => void
}

const EditProfileButton = ({ onClick }: EditProfileButtonProps) => {
  return (
    <Button variant='secondary' onClick={onClick}>
      <PencilIcon className='!mr-2' size={15} />
      Edit Profile
    </Button>
  )
}

export default EditProfileButton
