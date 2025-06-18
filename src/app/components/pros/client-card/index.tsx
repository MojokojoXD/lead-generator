import type { VendorAccount } from '@/app/types/account';
import Image from 'next/image';

type ListingCardProps = VendorAccount & {};


export function ClientCard( {
  business,
  firstName,
  lastName,
  category,
  bio,
}: ListingCardProps )
{

  const logoURL = business.logo.filename

  return (
    <div className='relative p-8 rounded-xl shadow flex flex-col space-y-6 bg-white'>
      <div className='relative'>
        <h2 className='text-lg text-primary text-xl font-semibold tracking-tight'>{ business?.name ?? 'not set' }</h2>
        <span className='absolute right-0 top-0 font-medium text-[12px] capitalize bg-neutral text-neutral-foreground py-1 px-2.5 rounded tracking-wide'>{ category || 'N/A' }  </span>
      </div>
      <div className='grid grid-cols-3'>
        <div className='relative h-24 border border-dashed rounded bg-white flex justify-center items-center text-sm overflow-hidden'>
          { logoURL ? <Image src={ logoURL } alt='vendor logo' fill/> : 'No Pic' }
        </div>
        <div className='px-3.5 col-span-2 pb-5'>
          <h3 className='first-letter:uppercase font-semibold text-lg'>{ firstName + ' ' + lastName }</h3>
          <p className='text-zinc-500 font-medium'>{ business?.phone ?? 'not set' }</p>
          <p className='max-w-prose'>{ bio }</p>
        </div>
      </div>

    </div>
  );
}