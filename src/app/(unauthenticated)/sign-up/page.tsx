'use client';

import { Home } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/navigation';
import { NewVendorForm } from '@/app/components/forms/new-vendor-form';
export default function SignUp()
{
  const router = useRouter();


  return (
    <div className='fixed inset-0 py-5 2xl:py-24'>
      <div className='absolute inset-0 bg-login bg-cover bg-center contrast-[70%] bg-fixed py-24 flex justify-center overflow-y-auto'>
      </div>
      <div className='relative h-full w-full mx-auto bg-white border shadow-sm max-w-2xl 2xl:max-w-3+xl rounded-xl p-10 flex flex-col space-y-1 overflow-hidden'>
        <header className='relative flex items-center justify-between h-1/4 pb-5 px-12'>
            
          <div className='w-fit'>
            <h1 className='font-medium text-2xl text-rose-500'>Sign Up</h1>
          </div>
          <Button
            onClick={ () => router.push('/')}
            variant={ 'ghost' }
            size={ 'icon' }>
            <Home />
          </Button>
        </header>
        <div className='relative overflow-hidden'>
          <NewVendorForm />
        </div>
      </div>
    </div>
  );
}