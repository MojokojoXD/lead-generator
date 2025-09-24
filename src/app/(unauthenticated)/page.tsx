import Link from 'next/link';
export default function Home()
{
  return (
    <div className="min-h-full lg:h-full w-full home-categories bg-cover flex items-center">
      <section className='container mx-auto px-5 sm:px-0 sm:grid sm:grid-cols-3 h-full py-16 sm:py-0 lg:h-1/2 2xl:h-2/3'>
        <div className='text-lg 2xl:text-2xl'>
          <h1 className='relative font-dm-serif sm:max-w-sm lg:max-w-md text-6xl sm:text-7xl 2xl:text-8xl font-semibold text-zinc-800 mb-6 2xl:leading-1'>
            Just Moved to Arizona?
            <span className='absolute left-0 -bottom-2 w-20 border-2 border-primary rounded'></span>
          </h1>
          <p className='max-w-md sm:max-w-sm 2xl:max-w-md leading-normal mb-6 sm:mb-0 text-zinc-600 font-medium'>Congratulations! We&apos;ll help setup your new home in minutes. Pick a Service -  <strong>It&apos;s Free</strong>.</p>

        </div>
        <div className='h-full col-span-2 grid sm:grid-cols-3 gap-1.5 text-white text-lg 2xl:text-2xl [&>div]:h-60 sm:[&>div]:h-full [&>div]:rounded-xl lg:[&>div]:rounded-2xl [&>div]:bg-white [&_div>div]:p-5 [&_div>div]:flex [&_div>div]:flex-col [&_div>div]:justify-end sm:[&_div>div]:justify-center [&_div>div]:font-medium [&_div>div>div]:space-y-1'>
          <div className='group bg-home_project bg-cover bg-center overflow-hidden'>
            <div className='relative h-full block bg-black/50 backdrop-contrast-75'>
              <h2 className='font-dm-serif text-4xl 2xl:text-5xl tracking-normal lg:tracking-tight opacity-100 group-hover:opacity-0 group-hover:translate-y-[-100px] transition-[transform,opacity] linear duration-300'>Home <br />   Projects</h2>
              <div className='absolute inset-x-0 translate-y-[100px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-[transform,opacity] linear duration-300'>
                <p className='leading-normal max-w-md mb-1.5'>Planning a big job like pools, HVAC, pest control or landscaping? Get bids from top-rated pros.
                </p>
                <Link href={ '/survey-projects/base' } className='text-[#84FB6F] hover:underline underline-offset-4'>Get Project Quotes</Link>
              </div>
            </div>
          </div>
          <div className='group bg-handyman bg-cover bg-center overflow-hidden'>
            <div className='relative h-full block bg-black/50 backdrop-contrast-75'>
              <h2 className='font-dm-serif text-4xl 2xl:text-5xl tracking-normal lg:tracking-tight opacity-100 group-hover:opacity-0 group-hover:translate-y-[-100px] transition-[transform,opacity] linear duration-300'>Hire <br/> Handyman</h2>
              <div className='absolute inset-x-0 translate-y-[100px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-[transform,opacity] linear duration-300'>
                <p className='leading-normal max-w-md mb-1.5'>Need help with a small job e.g. mount tv, clean home, install fans or blinds, movers? Connect with our highly rated pros.
                </p>
                <Link href={ '/handyman' } className='text-[#84FB6F] hover:underline underline-offset-4'>Hire a Handyman</Link>
              </div>
            </div>
          </div>
          <div className='group bg-home_accessories bg-cover bg-center overflow-hidden'>
            <div className='relative h-full block mb-4 bg-black/50 backdrop-contrast-75'>
              <h2 className='font-dm-serif text-4xl 2xl:text-5xl tracking-normal lg:tracking-tight opacity-100 group-hover:opacity-0 group-hover:translate-y-[-100px] transition-[transform,opacity] linear duration-300'>Home <br /> Items & <br/> Accessories </h2>
              <div className='absolute inset-x-0 translate-y-[100px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-[transform,opacitylinear duration-300'>
                <p className='leading-normal max-w-md mb-1.5'>Get Deals on furniture, décor and essentials nearby.
                </p>
                <Link href={ '/marketplace' } className='text-[#84FB6F] hover:underline underline-offset-4'>Save on Home Items and Accessories</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
