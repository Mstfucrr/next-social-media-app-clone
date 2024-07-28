import SignupView from '@/views/auth/signup'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup page'
}

const SignupPage = () => <SignupView />

export default SignupPage
