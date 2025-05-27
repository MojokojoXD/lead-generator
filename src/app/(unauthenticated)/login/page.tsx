'use client';

import { LoginForm } from '../../components/forms/login-form';
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
export default function LoginPage()
{

  return (
    <div className='fixed h-screen top-0 w-full grid grid-cols-1 lg:grid-cols-2 bg-primary'>
      <div className='absolute lg:relative inset-0 flex lg:block items-center justify-center'>
        <div className='px-7 py-14 lg:p-10 absolute lg:relative w-full max-w-sm lg:max-w-none h-fit lg:h-full bg-white z-10 flex items-center justify-center order-2 large:order-none rounded-lg lg:rounded-none'>
          <div className='w-full max-w-sm md:max-w-md mx-auto'>
            <Link href={'/'}>
              <Image src={ 'prosfinder.svg' } alt='logo' height={ 200 } width={ 200 } className='h-[50px] mb-4' />
            </Link>
            <p className='text-sm w-full mb-4'>Don&apos;t have an account? <Button variant={ 'link' } size={'sm'} className='text-primary inline px-0 h-fit w-fit'><Link href={ '/sign-up' }>Sign Up</Link></Button></p>

            <LoginForm/>
          </div>
        </div>
      </div>
      <div className='h-40 lg:h-full w-full bg-primary flex items-center justify-center p-16 order-1'>
        <div className='relative w-full max-w-sm lg:w-3/4 aspect-square overflow-hidden rounded bg-white/15'>
          <Image src={'humaans-2.svg'} alt='login art' fill/>
        </div>
      </div>
    </div>
  );
}