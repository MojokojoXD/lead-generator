import type { Metadata } from "next";
import { Libre_Franklin, DM_Serif_Display } from "next/font/google";
import Navbar from './components/layout/Navbar';
import { ClientSessionProvider } from './components/layout/sessionProvider';
import { auth } from './api/auth';
import "./globals.css";
import { LayoutProps } from '../../.next/types/app/page';


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

export default async function RootLayout( props: LayoutProps )
{
  const session = await auth();

  return (
    <ClientSessionProvider session={session}>
      <html lang="en">
        <body
          className={`${libreFranklin.className} ${dm_serif.variable} antialiased text-slate-500`}
        >
          <main className='relative h-screen overflow-hidden'>
            <Navbar/>
            <div className='w-full h-[calc(100vh-96px)] sm:h-[calc(100vh-160px)] overflow-y-auto text-prose'>
                {props.children}
            </div>
          </main>
        </body>
      </html>
    </ClientSessionProvider>
  );
}
