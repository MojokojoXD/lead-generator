import { Navlinks } from './Navlinks';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';


const HIDE_NAV_ON_ROUTES = [ '/login', '/dashboard', '/sign-up' ];

export default async function Navbar()
{
  const headerList = Object.fromEntries( await headers() );
  const currentPath = headerList[ 'x-current-path' ] ?? '';
  
  return (
    <>
      <nav
        className={ twMerge( 'relative bg-white flex items-center h-24 sm:h-40 border-b border-zinc-200', HIDE_NAV_ON_ROUTES.includes( currentPath ) && 'hidden' ) }
      >
        <div className='container h-full mx-auto px-5 sm:px-0 flex justify-between items-center'>
          {/* logo */ }
          <Link href={ '/' }>
            <span>
              <Image src={ '/prosfinder.svg' } alt='site logo' height={ 250 } width={ 250 } className='h-[20px] sm:h-[30px] w-auto' />
            </span>
          </Link>
          <Navlinks path={ currentPath } />
        </div>
      </nav>
    </>
  );
}