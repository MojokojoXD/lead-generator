import { Button } from './components/shadcnUI/button';
import Image from 'next/image';
import Link from 'next/link';
export default function Home()
{
  return (
    <div className="h-fit w-full px-[5%] lg:px-[10%] home-categories bg-cover">
      <section className='h-full w-full pt-16 sm:pt-24 sm:grid grid-cols-2 gap-5'>
        <div className='pb-24'>
          <h1 className='text-6xl sm:text-8xl font-bold tracking-tighter text-zinc-800 mb-8 sm:mb-3.5'>Find highly <br />rated <br />certified pros <br /> in <span className='text-primary'>Arizona</span></h1>
          <div className='sm:hidden grid grid-cols-2 auto-cols-fr gap-2.5 mb-8 sm:mb-3.5'>
            <Link href={ '/survey/security' }>
              <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden'>
                <Image src={ 'https://images.unsplash.com/photo-1596835090344-b57279fac184?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
                <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-sm text-neutral-foreground font-medium'>
                  <span className='bg-neutral rounded-xl px-2.5'>Security</span>
                </div>
              </div>
            </Link>
            <Link href={ '/survey/pool' }>
              <div className='relative w-full aspect-square rounded-xl shadow-lg overflow-hidden group'>
                <Image src={ 'https://images.unsplash.com/photo-1747171979462-f9828983509b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' } alt='pool service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
                <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-sm text-neutral-foreground font-medium'>
                  <span className='bg-neutral rounded-xl px-2.5'>Pools</span>
                </div>
              </div>
            </Link>
            <Link href={ '/survey/landscaping' }>
              <div className='group relative w-full aspect-square rounded-full shadow-lg overflow-hidden'>
                <Image src={ 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBpbmd8ZW58MHx8MHx8fDA%3D' } alt='landscaping service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
                <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-sm text-neutral-foreground font-medium'>
                  <span className='bg-neutral rounded-xl px-2.5'>Landscaping</span>
                </div>
              </div>
            </Link>
            <Link href={ '/survey/pest-control' }>
              <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden'>
                <Image src={ 'https://images.unsplash.com/photo-1725986265690-ce8386ce7ea0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxtYW4lMjBzcHJheWluZyUyMHBlc3R8ZW58MHx8MHx8fDA%3D' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
                <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-sm text-neutral-foreground font-medium'>
                  <span className='bg-neutral rounded-xl px-2.5'>Pest Control</span>
                </div>
              </div>
            </Link>
          </div>
          <p className='text-lg sm:text-2xl mb-5 max-w-prose'>Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.</p>
          <Button variant={ 'secondary' } className='h-[3.25rem] sm:h-[4.25rem] w-[11.4rem] sm:w-[19.8rem] text-xl sm:text-2xl'>Get a Quote!</Button>
        </div>
        <div className='hidden sm:grid pb-24 grid-cols-2 auto-cols-fr gap-4'>
          <Link href={ '/survey/security' }>
            <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden ring-1 ring-rose-300'>
              <Image src={ 'https://images.unsplash.com/photo-1596835090344-b57279fac184?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110'/>
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>Security</span>
              </div>
            </div>
          </Link>
          <Link href={'/survey/pool'}>
            <div className='relative w-full aspect-square rounded-xl shadow-lg overflow-hidden group ring-1 ring-rose-300'>
              <Image src={ 'https://images.unsplash.com/photo-1747171979462-f9828983509b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' } alt='pool service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110'/>
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>Pools</span>
              </div>
            </div>
          </Link>
          <Link href={ '/survey/landscaping' }>
            <div className='group relative w-full aspect-square rounded-full shadow-lg overflow-hidden ring-1 ring-rose-300'>
              <Image src={ 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBpbmd8ZW58MHx8MHx8fDA%3D' } alt='landscaping service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110'/>
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>Landscaping</span>
              </div>
            </div>
          </Link>
          <Link href={'/survey/pest-control'}>
            <div className='group relative w-full aspect-square rounded-xl shadow-lg overflow-hidden ring-1 ring-rose-300'>
              <Image src={ 'https://images.unsplash.com/photo-1725986265690-ce8386ce7ea0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxtYW4lMjBzcHJheWluZyUyMHBlc3R8ZW58MHx8MHx8fDA%3D' } alt='security service' fill className='object-cover object-center transition-[transform] duration-300 ease-in-out group-hover:scale-110' />
              <div className='absolute bottom-0 inset-x-0 h-1/4 flex justify-center items-center text-base text-neutral-foreground font-medium'>
                <span className='bg-neutral rounded-xl px-2.5'>Pest Control</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
