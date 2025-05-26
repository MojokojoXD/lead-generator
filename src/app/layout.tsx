import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import Navbar from './components/layout/Navbar';
import { ClientSessionProvider } from './components/layout/sessionProvider';
import { auth } from './api/auth';
import "./globals.css";


const libreFranklin = Libre_Franklin( {
  weight: [  '300', '400', '700','500','800','600' ],
  subsets: [ 'latin' ],
})

export const metadata: Metadata = {
  title: "ProsFindr",
  description: "Find professionals around you!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  
  const session = await auth();

  return (
    <ClientSessionProvider session={session}>
      <html lang="en">
        <body
          className={`${libreFranklin.className} antialiased text-slate-500`}
        >
          <main className='relative h-screen overflow-hidden'>
            <Navbar />
            <div className='w-full h-[calc(100vh-128px)] overflow-y-auto text-prose'>
              {children}
            </div>
          </main>
        </body>
      </html>
    </ClientSessionProvider>
  );
}
