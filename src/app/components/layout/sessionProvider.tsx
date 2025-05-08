'use client'

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';


interface SessionProviderProps
{
  session: Session | null;
  children: ReactNode;
}

export function ClientSessionProvider( { session, children }: SessionProviderProps )
{
  return (
    <SessionProvider session={session}>
      { children }
    </SessionProvider>
  )
}

