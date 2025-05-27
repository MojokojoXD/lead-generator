'use client';

import { NewVendorForm } from '@/app/components/forms/new-vendor-form';
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
export default function SignUpPage()
{

  return (
    <div className='fixed h-screen top-0 w-full grid grid-cols-1 lg:grid-cols-2 bg-secondary lg:bg-none'>
      <div className='absolute flex justify-center inset-0 lg:block h-full lg:overflow-auto'>
        <div className='py-14 lg:p-20 absolute lg:relative w-full max-w-sm lg:max-w-none lg:h-auto bg-white z-10 flex items-center justify-center order-2 lg:order-none rounded-lg lg:rounded-none overflow-hidden top-36 bottom-10'>
          <div className='h-full w-full max-w-sm overflow-hidden'>
            <div className='px-7'>
              <Link href={ '/' }>
                <Image src={ 'prosfinder.svg' } alt='logo' height={ 200 } width={ 200 } className='h-[50px] mb-4' />
              </Link>
              <p className='text-sm w-full mb-4'>Already have an account? <Button variant={ 'link' } size={ 'sm' } className='text-primary inline px-0 h-fit w-fit'><Link href={ '/login' }>Login</Link></Button></p>
            </div>

            <NewVendorForm />
          </div>
        </div>
      </div>
      <div className='h-40 lg:h-full w-full bg-secondary flex items-center justify-center p-16 order-1'>
        <div className='relative w-1/2 sm:w-1/4 lg:max-w-sm lg:w-3/4 aspect-square overflow-hidden rounded bg-white/1'>
          <Image src={ 'humaans-3.svg' } alt='login art' fill />
        </div>
      </div>
    </div>
  );
}