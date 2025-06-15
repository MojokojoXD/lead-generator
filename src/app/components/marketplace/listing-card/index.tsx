import Image from 'next/image';

type ListingCardProps = ListingPayload & {};
export function ListingCard( {
  businessName,
  title,
  desc,
  expiration,
  url_website,
  category,
  discount,
  promo_img
}: ListingCardProps )
{
  return (
    <a href={ 'http://' + url_website } target='_blank'>
      <div className='relative shadow rounded-2xl flex flex-col bg-white h-[25.95rem] w-full text-zinc-700 overflow-hidden border'>
        <div className='relative basis-2/5 shadow-inner border-b'>
          <Image src={ promo_img.filename } alt='random image' fill className='object-cover object-position-center' />
        </div>
        <div className='p-5 space-y-2.5'>
          <div className='relative'>
            <h2 className='text-xl font-semibold text-rose-500'>{ businessName }</h2>
            <span className='absolute right-0 top-0 font-medium text-[12px] capitalize bg-neutral text-neutral-foreground py-1 px-2.5 rounded tracking-wide'>{ category || 'N/A' }  </span>
          </div>
          <div className='text-sm space-y-2.5'>
            <div className='leading-7'>
              <h3 className='capitalize font-medium'>{ title }</h3>
              <p className='max-w-prose line-clamp-3 text-zinc-600 leading-6'>{ desc }</p>
            </div>
          </div>
        </div>

        <div className='absolute -left-20 -bottom-16 h-32 w-48 rounded-full bg-secondary'>
          <span className='absolute top-4 right-8 text-lg font-semibold text-secondary-foreground'>{ discount }<span className='text-sm'>% Off</span></span>off          
        </div>
        <span className='absolute right-5 bottom-5 text-sm font-medium border border-dashed border-secondary px-2 py-1'>Valid until: { expiration }</span>
      </div>
    </a>
  );
}