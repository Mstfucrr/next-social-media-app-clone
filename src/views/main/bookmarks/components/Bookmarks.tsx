'use client'
import usePostOperations from '../../hooks/usePostOperations'
import PostsList from '../../posts/components/PostsList'

const Bookmarks = () => {
  const { bookmarkedQuery } = usePostOperations()
  return <PostsList queryResult={bookmarkedQuery} />
}

export default Bookmarks
