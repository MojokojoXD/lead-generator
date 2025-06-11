import { NewVendorForm } from '@/app/components/forms/new-vendor-form';
import Image from 'next/image';
import Link from 'next/link';

export default async function SignUpPage( {
}: { searchParams: Promise<{[key:string]: string | string[] | undefined}> })
{


  return (
    <div className='fixed h-dvh top-0 w-full grid grid-cols-1 lg:grid-cols-2 bg-secondary lg:bg-white lg:overflow-hidden'>
      <div className='absolute lg:relative flex justify-center inset-0 h-full'>
        <div className='py-20 lg:p-20 absolute lg:relative w-full max-w-sm lg:max-w-none h-full sm:h-auto bg-white z-10 flex items-center justify-center order-2 lg:order-none sm:rounded-lg lg:rounded-none overflow-hidden bottom-0 sm:top-36 sm:bottom-5 lg:top-0'>
          <div className='h-full w-full max-w-sm lg:max-w-md overflow-hidden'>
            <div className='px-7'>
              <Link href={ '/' }>
                <Image src={ 'prosfinder.svg' } alt='logo' height={ 200 } width={ 200 } className='h-[30px] w-auto mb-4' />
              </Link>
              <p className='text-sm w-full mb-4'>Already have an account? <Link href={ '/login' } className='text-primary inline px-0 h-fit w-fit text-sm font-medium'>Login</Link></p>
            </div>

            <NewVendorForm />
          </div>
        </div>
      </div>
      <div className='h-40 lg:h-full w-full bg-secondary flex items-center justify-center p-16 order-1 lg:order-none'>
        <div className='relative w-1/2 sm:w-1/4 lg:max-w-sm lg:w-3/4 aspect-square overflow-hidden'>
          <Image src={ 'humaans-3.svg' } alt='login art' fill />
        </div>
      </div>
    </div>
  );
}