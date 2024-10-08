'use client'

import { Session, User } from 'lucia'
import { createContext } from 'react'

interface SessionContext {
  user: User
  session: Session
}

export const SessionContext = createContext<SessionContext | null>(null)

export default function SessionProvider({ children, value }: React.PropsWithChildren<{ value: SessionContext }>) {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
