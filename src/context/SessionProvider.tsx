import { createContext, useContext, useEffect, useState } from "react";

export type SessionContextType = {
  session: string | null | undefined
  setSession: (session: string | null | undefined) => void
}

export const SessionContext = createContext<SessionContextType | null>(null)

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    async function getSession() {
      const res = await fetch(`${import.meta.env.VITE_HOST}/api/auth/session`)
      if (!res.ok) return setSession(null);

      const data = await res.json()
      const userId = data?.userId

      if (!userId) return setSession(null)
      setSession(userId as string)
    }
    getSession()
  }, [])

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider")
  }

  return context
}
