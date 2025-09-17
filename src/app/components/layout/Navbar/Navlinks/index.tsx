'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/app/components/shadcnUI/button';
import clsx from 'clsx';
import { MenuIcon, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, MouseEventHandler } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { usePathname } from 'next/navigation';
import
{
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropDownArrow
} from '@/app/components/shadcnUI/dropdown-menu';


const SM_SCREEN_BREAKPOINT = 640;
const XL_SCREEN_BREAKPOINT = 1280;


const NAV_LINKS_DATA = {
  main: [
    {
      id: 0,
      label: 'Home',
      href: '',
    },
    {
      id: 1,
      label: 'Meet the Pros',
      href: 'pros'
    },
    {
      id: 2,
      label: 'Marketplace',
      href: 'marketplace'
    },
    {
      id: 3,
      label: 'About',
      href: 'about'
    }
  ],
};

interface AuthLinksProps
{
  status: AuthStatus;
  isOnSideMenu: boolean;
  closeMenu?: () => void;
}

type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

function AuthLinks( { status, isOnSideMenu, closeMenu }: AuthLinksProps )
{

  const { width } = useWindowSize();

  const router = useRouter();

  const isBetweenSMAndXL =
    Boolean( width && ( width > SM_SCREEN_BREAKPOINT && width <= XL_SCREEN_BREAKPOINT ) );
  

  const handleClick: MouseEventHandler<HTMLButtonElement> = ( ev ) =>
  {
    const id = ( ev.target as HTMLButtonElement ).id;

    if ( id === '__sign-out-btn' )
    {
      signOut();
      closeMenu?.call( undefined );
      return;
    }

    closeMenu?.call( undefined );
  };

  return status === 'unauthenticated' ?
    <>
      {
        width && width < SM_SCREEN_BREAKPOINT
          ?
          <>
            <li >
              <Button
                asChild
                variant={ 'link' }
                size={ 'default' }
                className='px-0 underline'
                onClick={ handleClick }
              >
                <Link href={ '/sign-up' }>
                  Add a Business
                </Link>
              </Button>
            </li>
            <li >
              <Button
                asChild
                variant={ 'link' }
                size={ 'default' }
                className='px-0 underline'
                onClick={ handleClick }
              >
                <Link href={ '/sign-up' }>
                  Claim your business for free
                </Link>
              </Button>
            </li>
            <li >
              <Button
                asChild
                variant={ 'link' }
                size={ isBetweenSMAndXL ? 'default' : 'lg' }
                className='px-0'
                onClick={ handleClick }
              >
                <Link href={ '/login' }>
                  Login
                </Link>
              </Button>
            </li>
          </>
          :
            <>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      asChild
                      variant={ 'default' }
                      size={ isOnSideMenu || isBetweenSMAndXL ? 'default' : 'lg' }
                      onClick={ handleClick }
                    >
                      <Link href={ '/sign-up' }>
                        Pro Sign Up
                        <ChevronDown />
                      </Link>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropDownArrow/>
                    <DropdownMenuItem onSelect={ () => router.push('/sign-up') }>Add your Business</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={ () => router.push( '/sign-up' ) }>Claim your Business for Free</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li >
                <Button
                  asChild
                  variant={ 'link' }
                  size={ isBetweenSMAndXL ? 'default' : 'lg' }
                  className='px-0'
                  onClick={ handleClick }
                >
                  <Link href={ '/login' }>
                    Login
                  </Link>
                </Button>
              </li>
            </>
      }
    </>
    :

    <>
      <li>
        <Button
          asChild
          variant={ 'default' }
          size={ isOnSideMenu ? 'default' : 'lg' }
          onClick={ handleClick }
        >
          <Link href={ '/dashboard' }> Dashboard </Link>
        </Button>
      </li>
      <li >
        <Button
          id='__sign-out-btn'
          variant={ 'link' }
          size={ isBetweenSMAndXL ? 'default' : 'lg' }
          className='px-0'
          onClick={ handleClick }
        >
          Log Out
        </Button>
      </li>
    </>;
}

export function Navlinks()
{

  const path = usePathname().split( '/' ).at( 1 );
  const { status } = useSession();
  const [ toggleSideMenu, setToggleSideMenu ] = useState( false );
  const { width: windowWidth } = useWindowSize();

  const isOverWidthThreshold = Boolean( windowWidth && windowWidth >= 1024 );

  const sideMenuPortalClsx = clsx( 'fixed top-24 sm:top-32 inset-x-0 bottom-0 h-full bg-white/90 backdrop-contrast-90 z-10 transition-[z-index,opacity] duration-150 ease-in',
    toggleSideMenu ? 'z-[999] opacity-100 translate-x-0' : '-z-[999] opacity-0 -translate-x-[9999px]'
  );

  const sideMenuHandler = ( open?: boolean ) =>
  {
    const sidebarPortal = ( document.getElementById( '__side-menu-portal' ) as HTMLDivElement );

    const sidebarPortalClickHandler = ( ev: MouseEvent ) =>
    {
      const clickTarget = ev.target as Node;

      if ( sidebarPortal.isSameNode( clickTarget ) )
        setToggleSideMenu( false );
    };

    if ( open || !toggleSideMenu )
    {
      sidebarPortal.addEventListener( 'click', sidebarPortalClickHandler );
    } else sidebarPortal.removeEventListener( 'click', sidebarPortalClickHandler );

    if ( open )
    {
      setToggleSideMenu( open );
      return;
    }
    setToggleSideMenu( prevState => !prevState );
  };

  const closeSideMenu = () => setToggleSideMenu( false );


  useEffect( () =>
  {
    if ( isOverWidthThreshold )
    {
      setToggleSideMenu( false );
    }
  }, [ isOverWidthThreshold ] );


  return (

    <>
      {/* main menu */ }
      <div className='h-full flex flex-nowrap items-center space-x-1.5 2xl:space-x-2.5 text-secondary'>

        <ul className='tracking-wide text-sm hidden lg:flex w-full'>
          {
            NAV_LINKS_DATA.main.map( l => (
              <li key={ l.id }>
                <Button
                  asChild
                  variant={ 'ghost' }
                  className={ clsx( 'relative', path === l.href && 'before:content-[""] before:w-1/4 before:border-b-2 before:border-primary before:absolute before:bottom-1 before:left-4' ) }
                >
                  <Link href={ '/' + l.href }> { l.label } </Link>
                </Button>
              </li>
            ) )
          }
        </ul>
        <ul className='hidden lg:flex w-full lg:space-x-5'>
          <AuthLinks status={ status } isOnSideMenu={ isOverWidthThreshold } />
        </ul>
        <div className='block lg:hidden'>
          <Button
            variant={ 'ghost' }
            size={ 'icon' }
            className='rounded-lg aspect-square [&_svg]:size-5 text-prose shadow'
            onClick={ () => sideMenuHandler() }
          >
            { toggleSideMenu ? <X /> : <MenuIcon /> }
          </Button>
        </div>
      </div>
      {/* side menu */ }
      <div id='__side-menu-portal' className={ sideMenuPortalClsx }>
        <div className='h-full w-full sm:max-w-xs bg-white shadow-sm overflow-x-hidden px-[5%] py-10 border-r border-zinc-200'>
          <div>
            <ul className='space-y-3.5 text-base ml-4 mb-4'>
              <AuthLinks
                status={ status }
                isOnSideMenu={ !isOverWidthThreshold }
                closeMenu={ closeSideMenu }
              />
            </ul>
            <hr className='mb-4'/>
            <ul className='space-y-3.5'>
              { NAV_LINKS_DATA.main.map( l => (
                <li key={ l.id }>
                  <Button
                    asChild
                    variant={ 'link' }
                    className={ clsx( 'text-base px-0 ml-4', path === l.href && 'text-primary' ) }
                    onClick={ closeSideMenu }
                  >
                    <Link href={ '/' + l.href }>{ l.label }</Link>
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