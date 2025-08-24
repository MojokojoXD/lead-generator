import Image from 'next/image';
import Link from 'next/link';
import { Button } from './components/shadcnUI/button';
export default function Home()
{
  return (
    <div className="h-fit w-full px-[5%] lg:px-[6.5%] home-categories bg-cover">
      <section className='h-full w-full max-w-7xl mx-auto pt-16 sm:pt-24 xl:grid grid-cols-2'>
        <div className='pb-24 space-y-8'>
          <div className='leading-loose text-base'>
            <h1 className='text-6xl sm:text-8xl md:text-9xl lg:text-7xl font-bold tracking-tighter text-zinc-800 mb-4'>Just Moved to Arizona?</h1>
            <div className='leading-normal mb-4'>
              <p className='max-w-lg'>Congratulations! We&apos;ll help setup your new home in minutes. Pick a Service -  <strong>It&apos;s Free</strong>.</p>
            </div>
            <Link href={ '/survey-projects/base' } className='block mb-4'>
              <Button className='w-full max-w-[180px] text-base justify-start'>Get Project Quotes</Button>
              <p className='leading-normal max-w-md'>Planning a big job like pools, HVAC, pest control or landscaping? Get bids from top-rated pros.
              </p>
            </Link>
            <Link href={ '/handyman' } className='block mb-4'>
              <Button className='w-full max-w-[180px] text-base justify-start'>Hire Handymen</Button>
              <p className='leading-normal max-w-md'>Need help with a small job e.g. mount tv, clean home, install fans or blinds, movers? Connect with our highly rated pros.
              </p>
            </Link>
            <Link href={ '/marketplace' } className='block mb-4'>
              <Button className='w-full max-w-[180px] text-base justify-start'>Save on Home Items and Accessories</Button>
              {/* <h2 className='text-primary text-2xl font-medium p-2.5 border rounded w-fit bg-primary'>Save on Home Items</h2> */ }
              <p className='leading-normal max-w-md'>Get Deals on furniture, décor and essentials nearby.</p>
            </Link>
          </div>
          <div className='lg:hidden grid grid-cols-2 auto-cols-fr gap-2.5 mb-8 sm:mb-3.5'>
            <Link href={ '/survey-projects/security' }>
              <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden'>
                <Image src={ 'https://images.unsplash.com/photo-1596835090344-b57279fac184?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
                <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-sm text-neutral-foreground font-medium'>
                  <span className='bg-neutral rounded-xl px-2.5'>Security & Cameras</span>
                </div>
              </div>
            </Link>
            <Link href={ '/survey-projects/pool' }>
              <div className='relative w-full aspect-square rounded-xl shadow-lg overflow-hidden group'>
                <Image src={ 'https://images.unsplash.com/photo-1747171979462-f9828983509b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' } alt='pool service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
                <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-sm text-neutral-foreground font-medium'>
                  <span className='bg-neutral rounded-xl px-2.5'>Pools</span>
                </div>
              </div>
            </Link>
            <Link href={ '/survey-projects/landscaping' }>
              <div className='group relative w-full aspect-square rounded-full shadow-lg overflow-hidden'>
                <Image src={ 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBpbmd8ZW58MHx8MHx8fDA%3D' } alt='landscaping service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
                <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-sm text-neutral-foreground font-medium'>
                  <span className='bg-neutral rounded-xl px-2.5'>Landscaping</span>
                </div>
              </div>
            </Link>
            <Link href={ '/survey-projects/pest-control' }>
              <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden'>
                <Image src={ 'https://images.unsplash.com/photo-1725986265690-ce8386ce7ea0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxtYW4lMjBzcHJheWluZyUyMHBlc3R8ZW58MHx8MHx8fDA%3D' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
                <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-sm text-neutral-foreground font-medium'>
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
          </div>
        </div>
        <div className='hidden lg:grid pb-24 md:grid-cols-4 xl:grid-cols-3 auto-cols-fr gap-4'>
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
        </div>
      </section>
    </div>
  );
}
