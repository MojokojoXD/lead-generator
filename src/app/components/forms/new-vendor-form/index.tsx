'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';


export interface NewVendorPayload
{
  role?: 'vendor' | 'admin';
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

  category: Categories | '';

  businessName: string;

  bio?: string;

}


export function NewVendorForm()
{
  const [ isFetching, setIsFetching ] = useState( false );
  const [ revealPwd, setRevealPwd ] = useState( false );
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
      category: '',
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
    <form className='h-full w-full px-10 overflow-auto' onSubmit={ handleSubmit( submitHandler ) }>
      <div className='space-y-6 overflow-auto mb-20 p-2'>
        <Input
          label='Email'
          id='__listing-email'
          { ...register( 'email' ) }
        />
        <div className='space-y-6'>
          <Input
            label='Password'
            type={ revealPwd ? 'text' : 'password' }
            id='new-password'
            autoComplete='new-password'
            { ...register( 'pwd.content' ) }
          />
          <div>
            <Input
              type={ revealPwd ? 'text' : 'password' }
              label='Confirm Password'
              id='confirm-password'
            />
            <div>
              <Button
                variant={ 'link' }
                size={ 'sm' }
                type='button'
                className='float-right mb-5'
                onClick={() => setRevealPwd( prevState => !prevState )}
              >
                Show password
              </Button>
            </div>
          </div>
        </div>
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
        <div className='grid grid-cols-2 gap-2.5'>

          <Input
            label='Phone'
            id='__listing-personal-phone'
            { ...register( 'phone.personal' ) }
          />
          <div className='relative h-full'>
            <label htmlFor="__listing-category" className='absolute top-1.5 text-[10px] peer-focus:text-rose-500 order-2 font-bold text-slate-500 uppercase tracking-wide px-4'>Category</label>
            <select
              id="__listing-category"
              className='peer h-full w-full py-5 px-4 rounded-lg border border-slate-300 focus:outline outline-rose-400 order-1 bg-slate-50 peer -z-10'
              { ...register( 'category' ) }
            >
              <option value="">-</option>
              <option value="security">Security</option>
              <option value="pest control">Pest Control</option>
              <option value="landscaping">Landscaping</option>
              <option value="pool">Pools</option>
            </select>
            
          </div>
        </div>
        <Textarea
          id='__listing-bio'
          placeholder='Please enter bio here'
          label='Bio'
          { ...register( 'bio' ) }
        />
        <hr />
      </div>
      <div className='absolute bottom-0 inset-x-0 bg-white z-10 py-3 px-12'>
        <Button variant={ 'secondary' } className='block'>
          { isFetching ? <Loader2 className='animate-spin' /> : 'Submit' }
        </Button>
      </div>
    </form>
  );
}