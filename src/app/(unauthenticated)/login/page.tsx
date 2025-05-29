'use client';

import { LoginForm } from '@/app/components/forms/login-form';
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
export default function LoginPage()
{

  return (
    <div className='fixed h-dvh top-0 w-full grid grid-cols-1 lg:grid-cols-2 bg-primary lg:bg-white lg:overflow-hidden'>
      <div className='absolute lg:relative flex justify-center inset-0 lg:block h-full'>
        <div className='py-20 lg:p-20 absolute lg:relative w-full max-w-sm lg:max-w-none h-full sm:h-auto bg-white z-10 flex items-center justify-center order-2 lg:order-none sm:rounded-lg lg:rounded-none overflow-hidden bottom-0 sm:top-36 sm:bottom-5 lg:top-0'>
          <div className='h-full w-full max-w-sm lg:max-w-md overflow-hidden'>
            <div className='px-7'>
              <Link href={ '/' }>
                <Image src={ 'prosfinder.svg' } alt='logo' height={ 250 } width={ 250 } className='h-[30px] w-auto mb-4' />
              </Link>
              <p className='text-sm w-full mb-4'>Don&apos; have an account? <Button variant={ 'link' } size={ 'sm' } className='text-primary inline px-0 h-fit w-fit'><Link href={ '/sign-up' }>Sign Up</Link></Button></p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
      <div className='hidden sm:flex h-40 lg:h-full w-full bg-primary items-center justify-center p-16 order-1 lg:order-none'>
        <div className='relative w-1/2 sm:w-1/4 lg:max-w-sm lg:w-3/4 aspect-square overflow-hidden bg-white/10'>
          <Image src={ 'humaans-2.svg' } alt='login art' fill />
        </div>
      </div>
    </div>
  );
}