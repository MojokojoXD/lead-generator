'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/button';
import { useRouter } from 'next/navigation';
import { AddNewVendorForm } from '@/app/components/dashboard/add-new-vendor';
export default function SignUp()
{
  const router = useRouter();


  return (
    <div className='fixed top-0 h-screen w-full'>
      <div className='h-full bg-login bg-cover bg-center contrast-[90%] bg-fixed pt-24 flex justify-center overflow-y-auto'>
        <div className='relative h-fit w-full bg-white border shadow max-w-md rounded-xl p-8 flex flex-col space-y-10'>
          <div className='absolute top-5 w-full'>
            <Button
              onClick={ router.back }
              variant={ 'ghost' }
              size={ 'icon' }>
              <ArrowLeft />
            </Button>
          </div>
          <header>
            <h1 className='font-medium text-2xl text-center text-rose-500'>Sign Up</h1>
          </header>
          <AddNewVendorForm />
        </div>
      </div>
    </div>
  );
}