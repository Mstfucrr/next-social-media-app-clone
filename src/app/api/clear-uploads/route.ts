import prisma from '@/lib/prisma'
import { UTApi } from 'uploadthing/server'

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`)
      return Response.json({ message: 'Invalid Authorization Header' }, { status: 401 })

    const unusedMedia = await prisma.media.findMany({
      where: {
        postId: null,
        ...(process.env.NODE_ENV === 'production'
          ? { createdAt: { lte: new Date(Date.now() - 1000 * 60 * 60 * 24) } }
          : {})
      },
      select: { id: true, url: true }
    })

    const mediaIds = unusedMedia.map(media => media.id)

    const mediaUrlToKey = (url: string) =>
      url.split(`/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`)[1]

    new UTApi().deleteFiles(
      unusedMedia.map(
        media => mediaUrlToKey(media.url)
        // eg: https://uploadthingy.com/a/1234/abc.png -> abc.png
      )
    )

    await prisma.media.deleteMany({
      where: { id: { in: mediaIds } }
    })

    return new Response()
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
