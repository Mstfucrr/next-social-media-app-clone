import kyInstance from '@/lib/ky'
import { UserData } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import Link from 'next/link'
import React from 'react'
import UserTooltip from '../UserTooltip'

interface UserLinkWithTooltipProps extends React.PropsWithChildren {
  username: string
}

const UserLinkWithTooltip = ({ username, children }: UserLinkWithTooltipProps) => {
  const { data } = useQuery({
    queryKey: ['user-data', username],
    queryFn: () => kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
    retry(failureCount, error) {
      return !(error instanceof HTTPError && error.response.status === 404) && failureCount < 3
    }
  })

  if (!data)
    return (
      <Link href={`/users/${username}`} className='text-primary hover:underline'>
        {children}
      </Link>
    )

  return (
    <UserTooltip user={data}>
      <Link href={`/users/${username}`} className='text-primary hover:underline'>
        {children}
      </Link>
    </UserTooltip>
  )
}

export default UserLinkWithTooltip
