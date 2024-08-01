'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import useSession from '../../hooks/useSession'
import UserAvatar from '../UserAvatar'
import Link from 'next/link'
import { LogOutIcon, UserIcon } from 'lucide-react'
import { logout } from '@/views/auth/actions'
import { cn } from '@/lib/utils'
import ThemeMenu from './ThemeMenu'
import { useQueryClient } from '@tanstack/react-query'

interface UserButtonProps {
  className?: string
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession()

  const queryClient = useQueryClient()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('flex-none rounded-full focus:outline-none', className)} aria-label='User menu'>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <UserIcon className='mr-2 size-4' />
            Profile
          </DropdownMenuItem>
        </Link>
        <ThemeMenu />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear()
            logout()
          }}
          className='text-red-500'
        >
          <LogOutIcon className='mr-2 size-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
