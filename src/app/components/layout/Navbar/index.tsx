'use client';

import { Navlinks } from './Navlinks';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { DashboardNavbar } from '../DashboardNavbar';
import Image from 'next/image';
import Link from 'next/link';


const HIDE_NAV_ON_ROUTES = [ '/login', '/dashboard', '/sign-up' ];

export default function Navbar()
{
  const path = usePathname();

  if ( path === '/dashboard' ) return <DashboardNavbar />;


  return (
    <>
      <nav className={ twMerge( 'relative bg-white flex items-center h-32 border-b border-zinc-200', HIDE_NAV_ON_ROUTES.includes( path ) && 'hidden' ) }>
        {/* logo */ }
        <div className='h-fit w-full mx-[5%] lg:mx-[10%] flex items-center justify-between'>
          <Link href={ '/' }>
            <span>
              <Image src={ '/prosfinder.svg' } alt='site logo' height={ 250 } width={ 250 } className='h-[30px] sm:h-[40px] w-auto' />
            </span>
          </Link>
          <Navlinks path={ path } />
        </div>
      </nav>
    </>
  );
}