// import Image from 'next/image';
import Link from 'next/link';
// import { Button } from './components/shadcnUI/button';
// import { ChevronRight } from 'lucide-react';
export default function Home()
{
  return (
    <div className="h-full w-full px-[5%] sm:px-0 home-categories bg-cover">
      <section className='h-fit w-full max-w-7xl mx-auto py-16 sm:py-24 sm:grid sm:grid-cols-3'>
        <div className='leading-loose text-base'>
          <h1 className='relative font-dm-serif sm:max-w-sm text-6xl sm:text-8xl md:text-9xl lg:text-7xl font-semibold tracking-tighter text-zinc-800 mb-6'>
            Just Moved to Arizona?
            <span className='absolute left-0 -bottom-2 w-20 border-2 border-primary rounded'></span>
          </h1>
          <p className='max-w-md sm:max-w-sm leading-normal mb-6 sm:mb-0 text-lg'>Congratulations! We&apos;ll help setup your new home in minutes. Pick a Service -  <strong>It&apos;s Free</strong>.</p>

        </div>
        <div className='col-span-2 grid sm:grid-cols-3 gap-6 sm:gap-1.5 text-white text-lg [&>div]:h-60 sm:[&>div]:h-96 [&>div]:shadow [&>div]:rounded-xl [&>div]:bg-white [&_a]:p-5 [&_a]:flex [&_a]:flex-col [&_a]:justify-end sm:[&_a]:justify-center [&_a>div]:space-y-1'>
          <div className='group bg-home_project bg-cover bg-center overflow-hidden'>
            <Link href={ '/handyman' } className='relative h-full block mb-4 bg-zinc-700/80 backdrop-contrast-60'>
              <h2 className='font-dm-serif text-5xl tracking-tight opacity-100 group-hover:opacity-0 group-hover:translate-y-[-100px] transition-[transform,opacity] ease-in-out duration-300'>Home Projects</h2>
              <div className='absolute translate-y-[100px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-[transform,opacity] ease-in-out duration-300'>
                <p className='leading-normal max-w-md font-medium mb-1.5'>Planning a big job like pools, HVAC, pest control or landscaping? Get bids from top-rated pros.
                </p>
                <span className='text-[#84FB6F] font-medium w-fit'>Get Project Quotes</span>
              </div>
            </Link>
          </div>
          <div className='group bg-home_accessories bg-cover bg-center overflow-hidden'>
            <Link href={ '/handyman' } className='relative h-full block mb-4 bg-zinc-700/80 backdrop-contrast-60'>
              <h2 className='font-dm-serif text-5xl tracking-tight opacity-100 group-hover:opacity-0 group-hover:translate-y-[-100px] transition-[transform,opacity] ease-in-out duration-300'>Hire Handyman</h2>
              <div className='absolute translate-y-[100px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-[transform,opacity] ease-in-out duration-300'>
                <p className='leading-normal max-w-md font-medium mb-1.5'>Need help with a small job e.g. mount tv, clean home, install fans or blinds, movers? Connect with our highly rated pros.
                </p>
                <span className='text-[#84FB6F] font-medium w-fit'>Hire a Handyman</span>
              </div>
            </Link>
          </div>
          <div className='group bg-handyman bg-cover bg-center overflow-hidden'>
            <Link href={ '/marketplace' } className='relative h-full block mb-4 bg-zinc-700/80 backdrop-contrast-60'>
              <h2 className='font-dm-serif text-5xl tracking-tight opacity-100 group-hover:opacity-0 group-hover:translate-y-[-100px] transition-[transform,opacity] ease-in-out duration-300'>Home Items & Accessories </h2>
              <div className='absolute translate-y-[100px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-[transform,opacity] ease-in-out duration-300'>
                <p className='leading-normal max-w-md font-medium mb-1.5'>Get Deals on furniture, décor and essentials nearby.
                </p>
                <span className='text-[#84FB6F] font-medium w-fit'>Save on Home Items and Accessories</span>
              </div>
            </Link>
          </div>
        </div>
        {/* <div className='hidden lg:grid pb-24 md:grid-cols-4 xl:grid-cols-3 auto-cols-fr gap-4'>
          <Link href={ '/survey-projects/security' }>
            <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden ring-1 ring-rose-300'>
              <Image src={ 'https://images.unsplash.com/photo-1596835090344-b57279fac184?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>Security & Cameras</span>
              </div>
            </div>
          </Link>
          <Link href={ '/survey-projects/pool' }>
            <div className='relative w-full aspect-square rounded-xl shadow-lg overflow-hidden group ring-1 ring-rose-300'>
              <Image src={ 'https://images.unsplash.com/photo-1747171979462-f9828983509b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' } alt='pool service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>Pools</span>
              </div>
            </div>
          </Link>
          <Link href={ '/survey-projects/landscaping' }>
            <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden ring-1 ring-rose-300'>
              <Image src={ 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBpbmd8ZW58MHx8MHx8fDA%3D' } alt='landscaping service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>Landscaping</span>
              </div>
            </div>
          </Link>
          <Link href={ '/survey-projects/pest-control' }>
            <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden ring-1 ring-rose-300'>
              <Image src={ 'https://images.unsplash.com/photo-1725986265690-ce8386ce7ea0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxtYW4lMjBzcHJheWluZyUyMHBlc3R8ZW58MHx8MHx8fDA%3D' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>Pest Control</span>
              </div>
            </div>
          </Link>
          <Link href={ '/survey-projects/hvac-plumbing' }>
            <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden ring-1 ring-rose-300'>
              <Image src={ 'https://images.pexels.com/photos/32497161/pexels-photo-32497161.jpeg' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>HVAC & Plumbing</span>
              </div>
            </div>
          </Link>
        </div> */}
      </section>
    </div>
  );
}
