import prisma from '@/lib/prisma'
import { getUserDataSelect } from '@/utils/getInclude'
import { validateRequest } from '@/views/auth/lib/auth'
import UserView from '@/views/main/users'
import { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

interface PageProps {
  params: {
    username: string
  }
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username, // username'i kontrol ediyoruz
        mode: 'insensitive' // bununla username'i case sensitive yapmış oluyoruz yani büyük küçük harf farketmeyecek
      }
    },
    select: getUserDataSelect(loggedInUserId)
  })

  return user || notFound()
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest()

  if (!loggedInUser) return {}

  const user = await getUser(params.username, loggedInUser.id)

  return {
    title: `${user.displayName} (@${user.username})`
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { user: loggedInUser } = await validateRequest()

  if (!loggedInUser) return <div className='text-center'>You need to be logged in to view this page</div>

  const user = await getUser(params.username, loggedInUser.id)

  return <UserView user={user} loggedInUserId={loggedInUser.id} />
}

export default Page
