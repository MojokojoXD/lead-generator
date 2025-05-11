'use client';

import { Button } from '@/app/components/ui/button';
import { Check, X } from 'lucide-react';
interface PromoActionsProps
{
  promo_id: string;
}


export function PromoActions( { promo_id }: PromoActionsProps )
{

  const handleApproval = async () =>
  {
    try
    {
      const res = await fetch( `/dashboard/admin/approve?id=${ promo_id }` );

      if ( res.ok ) alert( 'Listing approved!' );

    } catch ( error )
    {

      console.log( error );

    }
  };

  return (
    <div className='flex'>
      <Button variant={ 'ghost' } size={ 'icon' } onClick={ handleApproval }>
        <Check className='text-green-500' />
      </Button>
      <Button variant={ 'ghost' } size={ 'icon' }>
        <X className='text-red-500' />
      </Button>
    </div>
  );
}