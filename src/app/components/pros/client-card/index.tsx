import type { PublicVendorAccount } from '@/app/types/account';
import { Globe, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

type ListingCardProps = PublicVendorAccount & {};


export function ClientCard( {
  business,
  email,
  category,
}: ListingCardProps )
{

  const logoURL = business.logo.filename

  return (
    <a href={ business.url ? 'https://' + business.url : '#' } target='_blank'>
      <div className='relative rounded-xl shadow flex flex-col space-y-6 bg-white overflow-hidden border'>
        <div className='relative bg-secondary px-8 py-6 border-b'>
          <h2 className='text-lg text-secondary-foreground text-lg font-medium tracking-tight capitalize'>{ business?.name }</h2>
          <div className='absolute right-8 inset-y-0 flex items-center z-[5]'>
            <span className='font-medium text-[12px] bg-neutral text-neutral-foreground py-1 px-2.5 rounded tracking-wide capitalize'>{ category || 'N/A' }  </span>
          </div>
        </div>
        <div className='grid grid-cols-3 px-8 pb-6 pt-2'>
          <div className='relative h-24 rounded bg-white flex justify-center items-center text-sm overflow-hidden mr-3'>
            { logoURL ? <Image src={ logoURL } alt='vendor logo' fill/> : 'Logo n/a' }
          </div>
          <div className='col-span-2 leading-7 text-sm [&_svg]:text-stone-500 [&_svg]:stroke-2 [&_svg]:size-4 border-l pl-5 font-medium'>
            <div className='flex items-center justify-between space-x-1'>
              <Mail />
              <h3 className='truncate text-nowrap'>{ email }</h3>
            </div>
            <div className='flex items-center justify-between space-x-1'>
              <Phone />
              <p >{ business?.phone ?? '' }</p>
            </div>
            <div className='flex items-center justify-between space-x-1'>
              <Globe />
              <p className='truncate text-nowrap'>http://{ business?.url ?? '' }</p>
            </div>
          </div>
        </div>

      </div>
    </a>
  );
}