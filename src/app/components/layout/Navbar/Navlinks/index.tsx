'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/app/components/shadcnUI/button';
import clsx from 'clsx';
import { MenuIcon, X } from 'lucide-react';
import { useState, useEffect, MouseEventHandler } from 'react';


const NAV_LINKS_DATA = {
  main: [
    {
      id: 0,
      label: 'Home',
      href: '/',
    },
    {
      id: 1,
      label: 'Meet the Pros',
      href: '/pros'
    },
    {
      id: 2,
      label: 'Marketplace',
      href: '/marketplace'
    }
  ],
};

interface NavlinksProps
{
  path: string;
}

interface AuthLinksProps
{
  status: AuthStatus;
  isOnSideMenu: boolean;
  closeMenu?: () => void;
}

type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

function AuthLinks( { status, isOnSideMenu, closeMenu }: AuthLinksProps )
{

  const emphasizedBtnClsx = clsx( isOnSideMenu && 'max-w-[6.5rem] w-full' );
  const unemphasizedBtnClsx = clsx( isOnSideMenu ? 'px-0' : 'text-inherit max-w-[3.5rem] w-full' )

  const handleClick:MouseEventHandler<HTMLButtonElement> = (ev) =>
  {
    const id = ( ev.target as HTMLButtonElement ).id;

    if ( id === '__sign-out-btn' )
    {
      signOut();
      closeMenu?.call(undefined);
      return;
    }

    closeMenu?.call(undefined);
  }

  return status === 'unauthenticated' ?
    <>
      <li>
        <Button
          asChild
          variant={ 'default' }
          size={ isOnSideMenu ? 'default' : 'lg' }
          className={ emphasizedBtnClsx }
          onClick={handleClick}
        >
          <Link href={ '/sign-up' }> Sign Up </Link>
        </Button>
      </li>
      <li >
        <Button
          asChild
          variant={ 'link' }
          size={ 'lg' }
          className={ unemphasizedBtnClsx }
          onClick={handleClick}
        >
          <Link href={ '/login' }> Login </Link>
        </Button>
      </li>
    </>
    :

    <>
      <li>
        <Button
          asChild
          variant={ 'default' }
          size={ isOnSideMenu ? 'default' : 'lg' }
          className={ emphasizedBtnClsx }
          onClick={handleClick}
        >
          <Link href={ '/dashboard' }> Dashboard </Link>
        </Button>
      </li>
      <li >
          <Button
            id='__sign-out-btn'
            variant={ 'link' }
            size={ 'lg' }
            className={ unemphasizedBtnClsx }
            onClick={handleClick}
          >
             Sign Out 
          </Button>
      </li>
    </>;
}

export function Navlinks( { path }: NavlinksProps )
{

  const { status } = useSession();
  const [ toggleSideMenu, setToggleSideMenu ] = useState( false );
  const [ windowWidth, setWindowWidth ] = useState( typeof window !== 'undefined' ? window.innerWidth : -1 );
  
  const isOverWithThreshold = windowWidth >= 1024

  const sideMenuPortalClsx = clsx( 'fixed top-32 inset-x-0 bottom-0 h-full bg-white/90 backdrop-contrast-90 z-10 transition-[z-index,opacity] duration-150 ease-in',
    toggleSideMenu ? 'z-10 opacity-100' : '-z-10 opacity-0'
  );

  const sideMenuHandler = ( open?: boolean ) => open ? setToggleSideMenu( open )
    : setToggleSideMenu( prevState => !prevState );
  
  const closeSideMenu = () => setToggleSideMenu( false );
  
  useEffect( () =>
  {
    if ( !window ) return;

    const scrollHandler = () => setWindowWidth( window.innerWidth );
    const popstateChangeHandler = () => sideMenuHandler( false );

    window.addEventListener( 'resize', scrollHandler );
    window.addEventListener( 'popstate', popstateChangeHandler )
    
    
    return () =>
    {
      window.removeEventListener( 'resize', scrollHandler );
      window.removeEventListener('popstate', popstateChangeHandler)
    };
  } );

  useEffect( () =>
  {
    if ( isOverWithThreshold )
    {
      setToggleSideMenu( false )
    }
  }, [isOverWithThreshold] )
  
  return (

    <>
      <div className='h-full flex flex-nowrap items-center md:space-x-2.5 text-secondary'>

        <ul className='tracking-wide text-base hidden lg:flex w-full'>
          {
            NAV_LINKS_DATA.main.map( l => (
              <li key={ l.id }>
                <Button
                  asChild
                  variant={ 'ghost' }
                  className={ clsx( path === l.href && 'text-primary hover:text-primary' ) }
                >
                  <Link href={ l.href }> { l.label } </Link>
                </Button>
              </li>
            ) )
          }
        </ul>
        <ul className='hidden lg:flex w-full space-x-2.5'>
          <AuthLinks status={ status } isOnSideMenu={ isOverWithThreshold } />
        </ul>
        <div className='block lg:hidden'>
          <Button
            variant={ 'ghost' }
            size={'icon'}
            className='rounded-lg aspect-square [&_svg]:size-5 text-prose shadow'
            onClick={() => sideMenuHandler()}
          >
            {toggleSideMenu ? <X/> : <MenuIcon/> }
          </Button>
        </div>
      </div>
      {/* side menu */}
      <div className={ sideMenuPortalClsx }>
        <div className='h-full w-full max-w-xs bg-white shadow-sm overflow-x-hidden px-[5%] py-10 border-r border-zinc-200'>
          <div>
            <ul className='mb-6 flex justify-between items-center'>
              <AuthLinks
                status={ status }
                isOnSideMenu={ !isOverWithThreshold }
                closeMenu={closeSideMenu}
              />
            </ul>
            <hr className='mb-6'/>
            <ul className='space-y-3.5'>
              { NAV_LINKS_DATA.main.map( l => (
                <li key={l.id}>
                  <Button
                    asChild
                    variant={ 'link' }
                    className={clsx('text-base px-0 ml-4', path === l.href && 'text-primary')}
                    onClick={ closeSideMenu }
                  >
                    <Link href={l.href}>{ l.label }</Link>
                  </Button>
                </li>
              ) ) }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}