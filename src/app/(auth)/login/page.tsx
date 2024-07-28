import LoginView from '@/views/auth/login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const Page = () => <LoginView />

export default Page
