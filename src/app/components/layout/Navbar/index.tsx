'use client'

import { Navlinks } from './Navlinks';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';



const HIDE_NAV_ON_ROUTES = [ '/login', '/dashboard' ]

export default function Navbar()
{
  const path = usePathname();

  return (
    <div className={twMerge('fixed top-0 inset-x-0 bg-white z-10 flex h-28 border-b border-zinc-200 px-20 justify-between', HIDE_NAV_ON_ROUTES.includes(path) && 'hidden')}>
      {/* logo */ }
      <div className='flex items-center w-full space-x-5'>
        <div>
          <div className='font-black text-2xl text-zinc-700'>
            ProsFindr
          </div>
        </div>
        <div className='grow flex justify-between'>
          <Navlinks path={ path } />
        </div>
      </div>
    </div>
  );
}