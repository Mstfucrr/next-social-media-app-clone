/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30 // Bu değer: Dinamik sayfaların cache süresini belirler.
    }
  },
  serverExternalPackages: ['@node-rs/argon2'] // Bu değer: Server tarafında kullanılacak olan paketleri belirler. bu paketin amacı: Argon2 hash algoritmasını kullanarak şifreleme yapmaktır.
}

export default nextConfig
