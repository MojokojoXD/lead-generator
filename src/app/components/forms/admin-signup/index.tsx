'use client';

import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Input, InputError } from '../../ui/input';
import { Button } from '../../shadcnUI/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import validator from 'validator'

export interface AdminSignUpPayload
{
  firstName: string;
  lastName: string;
  pwd: string;
  email: string;
  token: string;

}

export function AdminSignUp( { token }: { token: string; } )
{
  const router = useRouter();
  const [ isFetching, setIsFetching ] = useState( false );
  const [ pwdConfirmation, setPwdConfirmation ] = useState( '' );
  const [ revealPwd, setRevealPwd ] = useState( false );
  const { register, handleSubmit, formState: { errors } } = useForm<AdminSignUpPayload>( {
    defaultValues: {
      firstName: '',
      lastName: '',
      pwd: '',
      email: '',
      token,
    }
  } );


  const submitHandler: SubmitHandler<AdminSignUpPayload> = async ( data ) =>
  {
    setIsFetching( true );

    try
    {
      const res = await fetch( '/admin-signup', {
        method: 'POST',
        body: JSON.stringify( data )
      } );

      if ( res.ok )
      {
        alert( 'client added successfully' );
        router.replace( '/login' );
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
      <div className='h-full lg:max-h-[28rem] max-w-2xl mx-auto px-7 space-y-6 overflow-auto pt-1'>
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
            { ...register( 'pwd', {
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
              onChange={ e => setPwdConfirmation( e.target.value ) }
            />
            <div>
              <InputError errors={ errors } name={ 'pwd' } />
              <Button
                variant={ 'link' }
                size={ 'sm' }
                type='button'
                className='float-right mb-5 text-rose-400 underline'
                onClick={ () => setRevealPwd( prevState => !prevState ) }
              >
                Show password
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Button variant={ 'secondary' } size={ 'lg' } className='w-full h-14 text-lg font-medium'>
            { isFetching ? <Loader2 className='animate-spin' /> : 'Submit' }
          </Button>
        </div>
      </div>
    </form>
  );
}