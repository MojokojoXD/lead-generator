'use client';
import Link from 'next/link';
import { SignOut } from '../../auth/sign-out';

export function DashboardNavbar()
{


  return (
    <div className={ 'relative flex h-28 border-b border-slate-200 px-20 justify-between' }>
      {/* logo */ }
      <div className='flex items-center w-full space-x-5 justify-between'>
        <div>
          <div>
            <Link href={ '/' }>
              <span className='font-black text-2xl text-zinc-700'>
                Pros<span className='text-rose-500'>Findr</span>
              </span>
            </Link>
          </div>
        </div>
        <div className=''>
          <SignOut/>
        </div>
      </div>
    </div>
  );
}