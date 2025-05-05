
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

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
  auth: [
    
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
    
  ]
}

const linkClx = 'hover:text-rose-500';
export function Navlinks({ path }: { path: string })
{

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
          {
            NAV_LINKS_DATA.auth.map( l => (
              <li key={ l.id }>
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
    </>
  )
}