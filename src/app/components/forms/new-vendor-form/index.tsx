'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input, InputError } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../shadcnUI/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import validator from 'validator'
import
  {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/app/components/shadcnUI/select"
import { VendorAccount } from '@/app/types/account';



export function NewVendorForm()
{
  const [ isFetching, setIsFetching ] = useState( false );
  const [ pwdConfirmation, setPwdConfirmation ] = useState( '' );
  const [ revealPwd, setRevealPwd ] = useState( false );
  const { register, handleSubmit, formState: { errors },setValue } = useForm<VendorAccount>( {
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

  const { ref: categoryRef, name } = register( 'category', {
    required: 'Please select category'
  })

  const submitHandler: SubmitHandler<VendorAccount> = async ( data ) =>
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
    <form className='h-full w-full' onSubmit={ handleSubmit( submitHandler ) } noValidate>
      <div className='h-full lg:max-h-[28rem] max-w-2xl mx-auto px-7 space-y-6 overflow-auto pb-36'>
        <h2 className='font-medium'>Profile</h2>
        <div className='grid lg:grid-cols-2 gap-x-2.5 gap-y-6'>
          <div>
            <Input
              placeholder='First Name*'
              id='__listing-first-name'
              { ...register( 'firstName', {
                required: 'Please enter first name'
              } ) }
            />
            <InputError errors={ errors } name={ 'firstName' } />
          </div>
          <div>
            <Input
              placeholder='Last Name*'
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
            placeholder='Email*'
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
            placeholder='Password*'
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
              placeholder='Confirm Password*'
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
                Show password
              </Button>
            </div>
          </div>
        </div>
        <h2 className='font-medium'>Business Info</h2>
        <div>
          <Input
            placeholder='Legal Business Name*'
            id='__listing-business-name'
            { ...register( 'business.name' , {
              required: 'Please enter business name'
            }) }
          />
          <InputError errors={errors} name={ 'business.name' }/>
        </div>
        <div>
          <Input
            placeholder='Address*'
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
              placeholder='City*'
              id='__listing-business-city'
              { ...register( 'business.address.city', {
                required: 'Please enter city'
              } ) }
            />
            <InputError errors={ errors } name={ 'business.address.city' } />
          </div>
          <div>
            <Input
              placeholder='Zipcode*'
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
            placeholder='Phone*'
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
            placeholder='Website/URL'
            id='__listing-business-website'
            { ...register( 'business.url', {
              validate: v => v?.trim() === '' || validator.isURL( v as string ) || 'Please enter valid url'
            } ) }
          />
          <InputError errors={ errors } name={ 'business.url' } />
        </div>
        <div>
          <Select onValueChange={ v => setValue( 'category', v ) } name={name}>
            <SelectTrigger className='w-full' ref={categoryRef}>
              <SelectValue placeholder={ 'Category*' } />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="pest control">Pest Control</SelectItem>
              <SelectItem value="landscaping">Landscaping</SelectItem>
              <SelectItem value="pool">Pools</SelectItem>
            </SelectContent>
          </Select>
          <InputError errors={ errors } name={ 'category' } />
        </div>
        <div>
          <Input
            placeholder='TIN*'
            id='__listing-business-tin'
            { ...register( 'business.tin', {
              required: 'Please enter business TIN',
              validate: v => validator.isTaxID( v, 'en-US' ) || 'Please enter valid TIN'
            } ) }
          />
          <InputError errors={ errors } name={ 'business.tin' } />
        </div>
        <h2 className='font-medium'>Misc</h2>
        <Textarea
          id='__listing-bio'
          placeholder='Please enter bio here'
          { ...register( 'bio' ) }
        />
        <div>
          <Button variant={ 'secondary' } size={'lg'} className='w-full h-14 text-lg font-medium'>
            { isFetching ? <Loader2 className='animate-spin' /> : 'Submit' }
          </Button>
        </div>
      </div>
    </form>
  );
}