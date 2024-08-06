import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Input, InputProps } from './input'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-10', className)} ref={ref} {...props} />
      <button
        type='button'
        className='absolute inset-y-0 right-0 flex items-center justify-center p-2'
        onClick={() => setShowPassword(!showPassword)}
      >
        {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
