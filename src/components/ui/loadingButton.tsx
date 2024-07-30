import { cn } from '@/lib/utils'
import { Button, ButtonProps } from './button'
import { Loader2 } from 'lucide-react'

export interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean
}

export default function LoadingButton({ isLoading, disabled, className, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={isLoading || disabled} className={cn('!flex min-w-max items-center gap-2', className)} {...props}>
      {isLoading && <Loader2 className='size-5 animate-spin' />}
      {props.children}
    </Button>
  )
}
