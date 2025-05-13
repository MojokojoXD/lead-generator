'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input, InputError } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import validator from 'validator'


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

  category: string;

  business: {
    name: string;
    address: {
      street: string;
      city: string;
      zipcode: string;
    },
    phone: string;
    tin: string;
    url?: string;
  };

  bio?: string;

}


export function NewVendorForm()
{
  const [ isFetching, setIsFetching ] = useState( false );
  const [ pwdConfirmation, setPwdConfirmation ] = useState( '' );
  const [ revealPwd, setRevealPwd ] = useState( false );
  const { register, handleSubmit, formState: { errors } } = useForm<NewVendorPayload>( {
    defaultValues: {
      business: {
        name: '',
        address: {
          street: '',
          city: '',
          zipcode: ''
        },
        phone: '',
        url: '',
      },
      firstName: '',
      lastName: '',
      pwd: {
        content: '',
        salt: ''
      },
      email: '',
      category: '',
      bio: ''
    }
  } );

  const submitHandler: SubmitHandler<NewVendorPayload> = async ( data ) =>
  {
    setIsFetching( true );

    try
    {
      const res = await fetch( '/vendor-sign-up', {
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
      <div className='space-y-6 overflow-auto mb-20 p-2 max-w-xl mx-auto'>
        <h2>Profile</h2>
        <div className='grid grid-cols-2 gap-2.5'>
          <div>
            <Input
              label='First Name*'
              id='__listing-first-name'
              { ...register( 'firstName', {
                required: 'Please enter first name'
              } ) }
            />
            <InputError errors={ errors } name={ 'firstName' } />
          </div>
          <div>
            <Input
              label='Last Name*'
              id='__listing-last-name'
              { ...register( 'lastName', {
                required: 'Please enter last name'
              } ) }
            />
            <InputError errors={ errors } name={ 'lastName' } />
          </div>
        </div>
        <div>
          <Input
            label='Email*'
            type={ 'email' }
            id='__listing-email'
            { ...register( 'email', {
              required: 'Please enter email address',
              validate: v => validator.isEmail( v ) || 'Email must be of the format name@example.com'
            } ) }
          />
          <InputError errors={ errors } name={ 'email' } />
        </div>
        <div className='space-y-6'>
          <Input
            label='Password*'
            type={ revealPwd ? 'text' : 'password' }
            id='new-password'
            autoComplete='new-password'
            { ...register( 'pwd.content', {
              required: 'Please enter password',
              validate: {
                pwdConfirmationMismatch: v => v === pwdConfirmation || 'Passwords do not match'
              }
            } ) }
          />
          <div>
            <Input
              type={ revealPwd ? 'text' : 'password' }
              label='Confirm Password*'
              id='confirm-password'
              onChange={ e => setPwdConfirmation(e.target.value) }
            />
            <div>
              <InputError errors={ errors } name={ 'pwd.content' } />
              <Button
                variant={ 'link' }
                size={ 'sm' }
                type='button'
                className='float-right mb-5 text-rose-400 underline'
                onClick={() => setRevealPwd( prevState => !prevState )}
              >
                show password
              </Button>
            </div>
          </div>
        </div>
        <h2>Business Info</h2>
        <div>
          <Input
            label='Legal Business Name*'
            id='__listing-business-name'
            { ...register( 'business.name' , {
              required: 'Please enter business name'
            }) }
          />
          <InputError errors={errors} name={ 'business.name' }/>
        </div>
        <div>
          <Input
            label='Address*'
            id='__listing-business-address'
            { ...register( 'business.address.street' , {
              required: 'Please enter street address'
            }) }
          />
          <InputError errors={errors} name={ 'business.address.street' }/>
        </div>
        <div className='grid grid-cols-2 gap-2.5'>
          
          <div>
            <Input
              label='City*'
              id='__listing-business-city'
              { ...register( 'business.address.city', {
                required: 'Please enter city'
              } ) }
            />
            <InputError errors={ errors } name={ 'business.address.city' } />
          </div>
          <div>
            <Input
              label='Zipcode*'
              id='__listing-business-zip'
              { ...register( 'business.address.zipcode', {
                required: 'Please enter zipcode',
                validate: v => validator.isPostalCode( v, 'US' ) || 'Please valid zipcode'
              } ) }
            />
            <InputError errors={ errors } name={ 'business.address.zipcode' } />
          </div>
          
        </div>
        <div>
          <Input
            label='Phone*'
            id='__listing-business-phone'
            { ...register( 'business.phone', {
              required: 'Please enter phone #',
              validate: v => validator.isMobilePhone(v, 'en-US') || 'Please enter valid phone number'
            } ) }
          />
          <InputError errors={ errors } name={ 'business.phone' } />
        </div>
        <div>
          <Input
            label='Website/URL'
            id='__listing-business-website'
            { ...register( 'business.url', {
              validate: v => v?.trim() === '' || validator.isURL( v as string ) || 'Please enter valid url'
            } ) }
          />
          <InputError errors={ errors } name={ 'business.url' } />
        </div>
        <div className='grid grid-cols-2 gap-x-2.5'>
          <div>
            <div className='relative h-fit'>
              <label htmlFor="__listing-category" className='absolute top-1.5 text-[12px] peer-focus:text-rose-500 font-medium text-slate-500 px-4'>Category*</label>
              <select
                id="__listing-category"
                className='peer h-full w-full py-5 px-4 rounded-lg border border-slate-200 focus:outline focus:border-transparent outline-rose-400 order-1 bg-slate-50'
                { ...register( 'category', {
                  required: 'Select category'
                } ) }
              >
                <option value="">-</option>
                <option value="security">Security</option>
                <option value="pest control">Pest Control</option>
                <option value="landscaping">Landscaping</option>
                <option value="pool">Pools</option>
              </select>

            </div>
            <InputError errors={errors} name={ 'category' }/>
          </div>
         
        </div>
        <div>
          <Input
            label='TIN*'
            id='__listing-business-tin'
            { ...register( 'business.tin', {
              required: 'Please enter business TIN',
              validate: v => validator.isTaxID( v, 'en-US' ) || 'Please enter valid TIN'
            } ) }
          />
          <InputError errors={ errors } name={ 'business.tin' } />
        </div>
        <h2>Misc</h2>
        <Textarea
          id='__listing-bio'
          placeholder='Please enter bio here'
          label='Bio'
          { ...register( 'bio' ) }
        />
        <hr />
      </div>
      <div className='absolute bottom-0 inset-x-0 bg-white z-10 py-3 px-12'>
        <Button variant={ 'secondary' } >
          { isFetching ? <Loader2 className='animate-spin' /> : 'Submit' }
        </Button>
      </div>
    </form>
  );
}