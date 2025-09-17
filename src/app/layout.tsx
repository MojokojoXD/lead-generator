import { ReactNode } from 'react';
import type { Metadata } from "next";
import { Libre_Franklin, DM_Serif_Display } from "next/font/google";
import { ClientSessionProvider } from './components/layout/sessionProvider';
import { auth } from './api/auth';
import "./globals.css";


const libreFranklin = Libre_Franklin( {
  weight: [  '300', '400', '700','500','800','600' ],
  subsets: [ 'latin' ],
} )

const dm_serif = DM_Serif_Display( {
  weight: [ '400' ],
  subsets: [ 'latin' ],
  variable: '--dm-serif'
} )


export const metadata: Metadata = {
  title: "ProsFindr",
  description: "Find home professionals around you!",
};

export default async function RootLayout( {
  children,
  authenticated,
  unauthenticated
}: {
    children: ReactNode,
    authenticated: ReactNode,
    unauthenticated: ReactNode
} )
{
  const session = await auth();

  return (
    <ClientSessionProvider session={session}>
      <html lang="en">
        <body
          className={`${libreFranklin.className} ${dm_serif.variable} antialiased text-slate-500`}
        >
              { children }
        </body>
      </html>
    </ClientSessionProvider>
  );
}
