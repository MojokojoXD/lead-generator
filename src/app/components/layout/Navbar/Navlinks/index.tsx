'use client'
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { signOut, useSession } from 'next-auth/react';
import { Fragment } from 'react';

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
  unauth: [
    
      {
        id: 0,
        label: 'Login',
        href: '/login'
      },
      {
        id: 1,
        label: 'Sign Up',
        href: '/sign-up'
      }
    
  ],
  auth: [
    {
      id: 0,
      label: 'Dashboard',
      href: '/dashboard'
    }
  ]
}

const linkClx = 'hover:text-rose-500';
export function Navlinks({ path }: { path: string })
{

  const { status } = useSession();

  return (

    <>
      <div>
        <ul className='[&>li]:inline space-x-5 tracking-wide'>
          {
            NAV_LINKS_DATA.main.map( l => ( 
              <li key={l.id}>
                <Link
                  href={ l.href }
                  className={ twMerge( linkClx, path === l.href && 'text-rose-500' ) }>
                  { l.label }
                </Link>
              </li>
             ) )
          }
        </ul>
      </div>
      <div>
        <ul className='[&>li]:inline space-x-4 tracking-wide'>
          {status === 'unauthenticated' ?
            NAV_LINKS_DATA.unauth.map( l => (
              <li key={ l.id }>
                <Link
                  href={ l.href }
                  className={ twMerge( linkClx, path === l.href && 'text-rose-500' ) }>
                  { l.label }
                </Link>
              </li>
            ) ) :

            NAV_LINKS_DATA.auth.map( l => (
              <Fragment key={ l.id }>
                <li >
                  <Link
                    href={ l.href }
                    className={ twMerge( linkClx, path === l.href && 'text-rose-500' ) }>
                    { l.label }
                  </Link>
                </li>
                <li>
                    <Button onClick={ () => signOut({ callbackUrl: 'http://localhost' }) }>Sign Out</Button>
                </li>
              </Fragment>
            ) )
          }
        </ul>
      </div>
    </>
  )
}