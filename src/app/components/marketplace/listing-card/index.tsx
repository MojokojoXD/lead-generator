import type { ListingPayload } from '../../forms/marketplace-listing-form';
import { Badge } from '../../ui/badge';
import Image from 'next/image';

type ListingCardProps = ListingPayload;


export function ListingCard( {
  businessName,
  period,
  title,
  desc,
  url_website,
  discount,
  promo_img
}: ListingCardProps )
{
  return (
    <a href={ 'http://' + url_website } target='_blank'>
      <div className='relative shadow rounded-2xl flex flex-col bg-white h-[22.75rem] w-[25rem] text-zinc-700 overflow-hidden'>
        <div className='relative basis-1/3 shadow-inner border-b'>
          <Image src={ promo_img.filename } alt='random image' fill className='object-cover object-position-center' />
        </div>
        <div className='p-5 space-y-2.5'>
          <div className='relative'>
            <h2 className='text-lg font-medium text-rose-500'>{ businessName }</h2>
            <Badge label='Pools' className='absolute right-0 top-0' />
          </div>
          <div className='text-sm space-y-2.5'>
            <div className='leading-7 font-bold'>
              <h3 className='capitalize'>{ title }</h3>
              <p >Expires: <span>{ period.to }</span></p>
            </div>
            <p className='max-w-prose line-clamp-3 text-zinc-500'>{ desc }</p>
          </div>
        </div>

        <Badge variant={ 'danger' } label={ `${ discount }% off` } className='absolute bottom-5 left-5' />
      </div>
    </a>
  );
}