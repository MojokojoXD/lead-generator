import { Badge } from '../../ui/badge';
import { NewProProfilePayload } from '../../forms/new-pro-profile-form';


type ListingCardProps = NewProProfilePayload & {};


export function ClientCard( {
  businessName,
  firstName,
  lastName,
  phone,
  category,
  bio,
}: ListingCardProps )
{
  return (
    <div className='relative border p-5 rounded-xl shadow flex flex-col space-y-6 bg-zinc-50'>
      <div className='relative'>
        <h2 className='text-lg text-rose-500'>{ businessName }</h2>
        <Badge label={ category } className='absolute right-0 top-0' />
      </div>
      <div className='grid grid-cols-3'>
        <div className='h-24 border border-dashed rounded bg-white flex justify-center items-center text-sm'>
          No pic
        </div>
        <div className='px-3.5 col-span-2 text-sm space-y-1.5 pb-5'>
          <h3 className='first-letter:uppercase font-bold'>{ firstName + ' ' + lastName }</h3>
          <p>Phone: <span>{ phone.business }</span></p>
          <p className='max-w-prose'>{ bio }</p>
        </div>
      </div>

    </div>
  );
}