'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SearchField = () => {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const q = form.q.value.trim()
    if (!q) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSearch} className='flex items-center gap-2' method='GET' action='/search'>
      <div className='relative'>
        <Input name='q' placeholder='Search' className='pe-10' />
        <Button
          type='submit'
          variant='link'
          className='absolute right-0 top-1/2 h-full -translate-y-1/2 transform px-3 py-2'
        >
          <SearchIcon className='size-5 text-muted-foreground' />
        </Button>
      </div>
    </form>
  )
}

export default SearchField
