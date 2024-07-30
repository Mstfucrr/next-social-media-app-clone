/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30 // Bu değer: Dinamik sayfaların cache süresini belirler.
    }
  },
  images: {
    unoptimized: true
  },
  serverExternalPackages: ['@node-rs/argon2'], // Bu değer: Server tarafında kullanılacak olan paketleri belirler. bu paketin amacı: Argon2 hash algoritmasını kullanarak şifreleme yapmaktır.
  distDir: 'build' // Bu değer: Next.js'in build edilmiş dosyalarının nereye kaydedileceğini belirler.
}

export default nextConfig
