import prisma from '@/lib/prisma'
import { formatNumber } from '@/lib/utils'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

const getTrendingTopics = unstable_cache(
  async () => {
    const res = await prisma.$queryRaw<Array<{ hashtag: string; count: bigint }>>`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM posts
    GROUP BY (hashtag)
    ORDER BY count DESC, hashtag ASC
    LIMIT 5
  `

    const data = res.map(row => ({
      hashtag: row.hashtag,
      count: Number(row.count)
    }))
    return data
  },
  ['trendingTopics'],
  { revalidate: 3 * 60 * 60 } // 3 minutes
)

export default async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics()
  return (
    <div className='space-y-5 rounded-2xl bg-card p-5 shadow-sm'>
      <h1 className='text-xl font-bold'>Trending Topics</h1>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split('#')[1]
        return (
          <Link key={title} href={`/hashtag/${title}`} className='block'>
            <span className='line-clamp-1 break-all font-semibold hover:underline' title={hashtag}>
              {hashtag}
            </span>
            <span className='text-sm text-muted-foreground'>
              {formatNumber(count)} {count === 1 ? 'post' : 'posts'}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
