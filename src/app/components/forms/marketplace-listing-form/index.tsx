'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '../../input';
import { Textarea } from '../../textarea';
import { Button } from '../../button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
export interface ListingPayload
{
  businessName: string;
  title: string;
  discount: string;
  url_website: string;
  period: {
    from: string;
    to: string;
  };
  desc: string;

}


export function MarketplaceListingForm()
{
  const [ isFetching, setIsFetching ] = useState( false );
  const { register, handleSubmit } = useForm<ListingPayload>( {
    defaultValues: {
      businessName: '',
      title: '',
      discount: '',
      url_website: '',
      period: {
        from: '',
        to: ''
      },
      desc: ''
    }
  } );


  const submitHandler: SubmitHandler<ListingPayload> = async ( data ) =>
  {

    setIsFetching( true );

    try
    {
      const res = await fetch( '/dashboard/mkt-listing', {
        method: 'POST',
        body: JSON.stringify( data )
      } );

      if ( res.ok )
      {
        alert( 'Listing added successfully' );
        return;
      };

      alert( 'Unable to add listing. Please contact system admin!' );

      throw res;

    } catch ( error )
    {
      console.log( error );
    } finally
    {
      setIsFetching( false );
    }
  };


  return (
    <form className='max-w-md space-y-6' onSubmit={ handleSubmit( submitHandler ) }>
      <Input
        label='Title'
        id='__listing-id'
        { ...register( 'title' ) }
      />
      <Input
        label='Business Name'
        id='__listing-business'
        { ...register( 'businessName' ) }
      />
      <div className='grid grid-cols-3 gap-2.5'>
        <Input
          label='Discount'
          id='__listing-discount'
          { ...register( 'discount' ) }
        />
        <Input
          label='URL/Website'
          id='__listing-url'
          { ...register( 'url_website' ) }
          wrapperClx='col-span-2'
        />
        
      </div>
      <div className='grid grid-cols-2 gap-2.5'>
        <Input
          label='From'
          id='__listing-from'
          type={ 'date' }
          { ...register( 'period.from' ) }
        />
        <Input
          label='To'
          id='__listing-to'
          { ...register( 'period.to' ) }
          type={ 'date' } />
      </div>
      <Textarea
        id='__listing-desc'
        placeholder='Please enter additional details here'
        label='Description'
        { ...register( 'desc' ) }
      />
      <hr />
      <Button variant={ 'secondary' }>
        { isFetching ? <Loader2 className='animate-spin' /> : 'Post' }
      </Button>
    </form>
  );
}