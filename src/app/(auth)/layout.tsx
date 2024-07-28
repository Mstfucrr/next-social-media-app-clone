// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex-center h-screen'>
      <div className='flex h-full max-h-[540px] w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-2xl'>
        {children}
      </div>
    </main>
  )
}
