'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../input';
import { Button } from '../../button';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface LoginPayload
{
  user: string;
  pwd: string;
}
export function SignUpForm()
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

  const submitHandler: SubmitHandler<LoginPayload> = async( data ) =>
  {

    setIsFetching( true )

    try
    {
      
      const res = await fetch( '/admin/login', {
        method: 'POST',
        body: JSON.stringify(data)
      } )
      
      if ( res.ok )
      {
        router.push( '/dashboard' );
        return;
      };

      throw res;
      
    } catch ( error )
    {
      setIsFetching( false );
      console.log( error )
      
    }
  }

  return (
    <form className='w-full space-y-3 px-5' onSubmit={handleSubmit( submitHandler )}>

      
      <Input { ...register( 'user' ) } id='__username/email' label='Username or Email' />
      <Input { ...register( 'pwd' ) } id='__pwd' label='Password' />


      <div className='pt-6'>
        <Button >
          {isFetching ? <Loader2 className='animate-spin'/> : 'Submit' }
        </Button>
      </div>

    </form>
  );
}