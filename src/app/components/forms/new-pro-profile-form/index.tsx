'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '../../input';
import { Textarea } from '../../textarea';
import { Button } from '../../button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';


export interface NewVendorPayload
{
  firstName: string;
  lastName: string;

  pwd: {
    content: string;
    salt: string;
  };

  email: string;
  phone: {
    business: '',
    personal: '';
  };

  category: Categories;

  businessName: string;

  bio?: string;

}


export function NewProProfileForm()
{
  const [ isFetching, setIsFetching ] = useState( false );
  const { register, handleSubmit } = useForm<NewVendorPayload>( {
    defaultValues: {
      businessName: '',
      firstName: '',
      lastName: '',
      pwd: {
        content: '',
        salt: ''
      },
      email: '',
      phone: {
        business: '',
        personal: '',
      },
      category: 'security',
      bio: ''
    }
  } );


  const submitHandler: SubmitHandler<NewVendorPayload> = async ( data ) =>
  {
    setIsFetching( true );

    try
    {
      const res = await fetch( '/dashboard/vendor-sign-up', {
        method: 'POST',
        body: JSON.stringify( data )
      } );

      if ( res.ok )
      {
        alert( 'client added successfully' );
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
        label='Email'
        id='__listing-email'
        { ...register( 'email' ) }
      />
      <Input
        label='Password'
        id='new-password'
        autoComplete='new-password'
        { ...register( 'pwd.content' ) }
      />
      <hr className='w-full' />
      <div className='grid grid-cols-2 gap-2.5'>
        <Input
          label='First Name'
          id='__listing-first-name'
          { ...register( 'firstName' ) }
        />
        <Input
          label='Last Name'
          id='__listing-last-name'
          { ...register( 'lastName' ) }
        />
      </div>
      <Input
        label='Business Name'
        id='__listing-business'
        { ...register( 'businessName' ) }
      />
      <div>
        <label htmlFor="__listing-category" className='text-sm px-4 peer-focus:text-rose-500 order-1 font-medium block'>Category</label>
        <select
          id="__listing-category"
          className='w-full py-3 px-4 rounded-full border border-slate-300 focus:outline-rose-400 bg-slate-50 peer order-2 mt-3'
          { ...register( 'category' ) }
        >
          <option value="security">Security</option>
          <option value="pest control">Pest Control</option>
          <option value="landscaping">Landscaping</option>
          <option value="pool">Pools</option>
        </select>
      </div>
      <div className='grid grid-cols-2 gap-2.5'>

        <Input
          placeholder='Personal #'
          id='__listing-personal-phone'
          { ...register( 'phone.personal' ) }
        />
        <Input
          placeholder='Business #'
          id='__listing-business-phone'
          { ...register( 'phone.business' ) }

        />
      </div>
      <Textarea
        id='__listing-bio'
        placeholder='Please enter bio here'
        label='Bio'
        { ...register( 'bio' ) }
      />
      <hr />
      <Button variant={ 'secondary' }>
        { isFetching ? <Loader2 className='animate-spin' /> : 'Submit' }
      </Button>
    </form>
  );
}