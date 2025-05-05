'use client';

import { ArrowLeft } from 'lucide-react';
import { AdminLogin } from '../../components/forms/login-form';
import { Button } from '../../components/button';
import { useRouter } from 'next/navigation';
export default function Login()
{
  const router = useRouter();


  return (
    <div className='fixed h-screen top-0 w-full py-24 flex justify-center'>
      <div className='absolute inset-0 bg-login bg-cover bg-center bg-white contrast-[70%]'>

      </div>
      <div className='relative h-full w-full bg-white max-w-5xl rounded-xl p-5 flex'>
        <div className='relative w-1/2 flex flex-col justify-center items-center px-10 space-y-10'>
          <div className='absolute top-5 px-10 w-full'>
            <Button
              onClick={ router.back } 
              variant={ 'ghost' }
              size={ 'icon' }>
              <ArrowLeft />
            </Button>
            <Button
              variant={ 'link' }
              size={'sm'}
              className='block float-right'>
              Admin
            </Button>
          </div>
          <header>
            <h1 className='font-medium text-2xl text-center text-slate-800'>Welcome back!</h1>
            <p className='text-center text-sm'>Please enter your credentials to sign in.</p>
          </header>
          <AdminLogin/>
        </div>
        <div className='w-1/2 border bg-login_landing bg-cover bg-center rounded-xl shadow'></div>
      </div>
    </div>
  );
}