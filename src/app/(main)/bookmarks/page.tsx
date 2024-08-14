import BookmarksView from '@/views/main/bookmarks'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Bookmarks page'
}

export default function BookmarksPage() {
  return <BookmarksView />
}
