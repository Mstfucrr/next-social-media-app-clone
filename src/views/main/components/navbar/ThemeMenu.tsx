import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Monitor, Check, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

const ThemeMenu = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Monitor className='mr-2 size-4' />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            <Monitor className='mr-2 size-4' />
            System Default
            {theme === 'system' && <Check className='ms-2 size-4' />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <Sun className='mr-2 size-4' />
            Light
            {theme === 'light' && <Check className='ms-2 size-4' />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <Moon className='mr-2 size-4' />
            Dark
            {theme === 'dark' && <Check className='ms-2 size-4' />}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ThemeMenu
