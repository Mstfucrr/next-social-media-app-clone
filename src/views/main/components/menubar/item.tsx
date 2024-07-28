import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  className?: string
  title: string
  Icon?: React.ReactNode
  href: string
}

const MenuBarItem = ({ title, className, Icon, href }: Props) => {
  return (
    <Button variant='ghost' className={cn('flex items-center justify-start gap-3', className)} asChild title={title}>
      <Link href={href}>
        {Icon}
        <span className='hidden lg:inline'>{title}</span>
      </Link>
    </Button>
  )
}

export default MenuBarItem
