import { cn } from '@/lib/utils'
import Image from 'next/image'

interface UserAvatarProps {
  avatarUrl?: string | null
  size?: number
  className?: string
}

export default function UserAvatar({ avatarUrl, size = 48, className }: UserAvatarProps) {
  return (
    <Image
      src={avatarUrl ?? '/assets/avatar-placeholder.png'}
      alt='avatar'
      width={size}
      height={size}
      className={cn('aspect-square h-fit flex-none rounded-full bg-secondary object-cover', className)}
    />
  )
}
