'use client'

import { Navlinks } from './Navlinks';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { DashboardNavbar } from '../DashboardNavbar';



const HIDE_NAV_ON_ROUTES = [ '/login', '/dashboard','/sign-up' ]

export default function Navbar()
{
  const path = usePathname();

  if( path === '/dashboard' ) return <DashboardNavbar/>

  return (
    <div className={twMerge('relative bg-white flex h-28 border-b border-zinc-200 px-20 justify-between', HIDE_NAV_ON_ROUTES.includes(path) && 'hidden')}>
      {/* logo */ }
      <div className='flex items-center w-full space-x-5'>
        <div>
          <span className='font-black text-2xl text-zinc-700'>
            ProsFindr
          </span>
        </div>
        <div className='grow flex justify-between'>
          <Navlinks path={ path } />
        </div>
      </div>
    </div>
  );
}