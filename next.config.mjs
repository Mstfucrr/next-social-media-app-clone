/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30 // Bu değer: Dinamik sayfaların cache süresini belirler.
    }
  }
}

export default nextConfig
