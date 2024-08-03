import React from 'react'
import Link from 'next/link'
import { LinkIt, LinkItUrl } from 'react-linkify-it'

interface LinkifyProps {
  children: React.ReactNode
}

export default function Linkify({ children }: LinkifyProps) {
  return (
    <LinkifyUrls>
      <LinkifyUsernames>
        <LinkifyHashtag>{children}</LinkifyHashtag>
      </LinkifyUsernames>
    </LinkifyUrls>
  )
}

function LinkifyUrls({ children }: LinkifyProps) {
  return <LinkItUrl className='text-primary hover:underline'>{children}</LinkItUrl>
}

function LinkifyUsernames({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/} // eg. @username
      component={(match, key) => (
        <Link href={`/users/${match.slice(1)}`} key={key} className='text-primary hover:underline'>
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  )
}

function LinkifyHashtag({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9]+)/} // eg. #hashtag
      component={(match, key) => (
        <Link key={key} href={`/hashtag/${match.slice(1)}`} className='text-primary hover:underline'>
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  )
}
