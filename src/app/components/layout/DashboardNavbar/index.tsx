'use client';
import Link from 'next/link';
import { Button } from '../../button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function DashboardNavbar()
{

  const router = useRouter();

  return (
    <div className={ 'fixed top-0 inset-x-0 bg-white z-10 flex h-28 border-b border-slate-200 px-20 justify-between' }>
      {/* logo */ }
      <div className='flex items-center w-full space-x-5 justify-between'>
        <div>
          <div>
            <Link href={ '/' }>
              <span className='font-black text-2xl text-zinc-700'>
                ProsFindr
              </span>
            </Link>
          </div>
        </div>
        <div className=''>
          <Button variant={ 'ghost' } size={ 'sm' }
            onClick={ async() =>
            {
              try {
                const res = await signOut( {
                  callbackUrl: 'http://localhost:3000',
                  redirect: false
                } );

                router.replace( res.url )
                
              } catch (error) {
                console.log(error)
              }



            } }>Sign Out</Button>
        </div>
      </div>
    </div>
  );
}