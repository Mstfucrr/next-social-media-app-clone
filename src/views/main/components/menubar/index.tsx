import React from 'react'
import MenuBarItem from './item'
import { Bell, Bookmark, Home, Mail } from 'lucide-react'

type MenuBarProps = {
  className?: string
}

const MenuBar = ({ className }: MenuBarProps) => {
  return (
    <div className={className}>
      <MenuBarItem href='/' title='Home' Icon={<Home />} />
      <MenuBarItem href='/notifications' title='Notifications' Icon={<Bell />} />
      <MenuBarItem href='/messages' title='Messages' Icon={<Mail />} />
      <MenuBarItem href='/bookmarks' title='Bookmarks' Icon={<Bookmark />} />
    </div>
  )
}

export default MenuBar
