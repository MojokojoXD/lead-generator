import { ReactNode } from 'react';
import Navbar from '../components/layout/Navbar';

export default function UnAuthenticatedLayout( {
  children,
}: {
  children: ReactNode,
} )
{

  return (

    <main className='relative h-screen overflow-hidden'>
      <Navbar />
      <div className='w-full h-[calc(100vh-96px)] sm:h-[calc(100vh-128px)] 2xl:h-[calc(100vh-160px)] overflow-y-auto text-prose'>
        { children }
      </div>
    </main>
  );
}
