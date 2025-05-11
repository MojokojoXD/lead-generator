'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

interface LoginPayload
{
  user: string;
  pwd: string;
}
export function LoginForm()
{
  const { register, handleSubmit } = useForm<LoginPayload>( {
    reValidateMode: 'onChange',
    defaultValues: {
      user: '',
      pwd: '',
    }
  } );
  const router = useRouter();

  const [ isFetching, setIsFetching ] = useState( false );
  const [ loginError, setLoginError ] = useState<string | null>( null );

  const submitHandler: SubmitHandler<LoginPayload> = async ( data ) =>
  {

    setIsFetching( true );

    const result = await signIn( 'credentials', {
      user: data.user,
      pwd: data.pwd,
      redirect: false,
      callbackUrl: 'http://localhost:3000/dashboard'
    } );


    setIsFetching( false );

    if ( result?.ok )
    {
      router.push( '/dashboard' );
      return;
    }

    setLoginError( result?.error ?? 'Invalid email or password' );


  };

  return (
    <form className='w-full space-y-3 px-5' onSubmit={ handleSubmit( submitHandler ) }>



      <Input { ...register( 'user' ) } id='__username/email' label='Email' type={ 'email' } />
      <Input { ...register( 'pwd' ) } id='current-password' label='Password' autoComplete='current-password' type={ 'password' } />

      {/* login feedback */ }
      <p className='text-red-500 text-center'>{ loginError }</p>

      <div className='pt-6'>
        <Button >
          { isFetching ? <Loader2 className='animate-spin' /> : 'Submit' }
        </Button>
      </div>

    </form>
  );
}