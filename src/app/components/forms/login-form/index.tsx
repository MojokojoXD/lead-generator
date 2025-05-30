'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, InputError } from '../../ui/input';
import { Button } from '../../shadcnUI/button';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import validator from 'validator'

interface LoginPayload
{
  user: string;
  pwd: string;
}
export function LoginForm()
{
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>( {
    reValidateMode: 'onChange',
    defaultValues: {
      user: '',
      pwd: '',
    }
  } );
  const router = useRouter();

  const [ showPwd, setShowPwd ] = useState( false );
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

    console.log( result?.error );

    setLoginError( 'Invalid email or password' );


  };

  return (
    <form className='w-full px-7' onSubmit={ handleSubmit( submitHandler ) } noValidate>


      <div className='mb-10 space-y-6'>
        <Input
          { ...register( 'user', {
            required: 'Please enter email address',
            validate: v => validator.isEmail( v ) || 'Email must be of the format name@example.com'
          } ) }
          id='__username/email'
          placeholder='Email*'
        />
        <InputError errors={ errors } name={ 'user' } />
        <div className='relative flex items-center'>
          <Input
            { ...register( 'pwd', {
              required: 'Please enter password'
            } ) }
            id='current-password'
            autoComplete='current-password'
            type={ showPwd ? 'text' : 'password' }
            placeholder='Password*'
          />
          <Button
            variant={ 'ghost' }
            size={ 'icon' }
            type='button'
            onClick={() => setShowPwd( prevState => !prevState )}
            className='absolute right-4 [&_svg]:size-6 [&_svg]:stroke-2 text-zinc-500 hover:bg-transparent'>{
              !showPwd ? <EyeOff /> : <Eye /> }
          </Button>
        </div>
        <InputError errors={ errors } name={ 'pwd' } />

        {/* login feedback */ }
        <p className='text-red-500 text-sm'>{ loginError }</p>
      </div>

      <div>
        <Button className='w-full py-5 h-14 text-lg' size={ 'lg' }>
          { isFetching ? <Loader2 className='animate-spin' /> : 'Login' }
        </Button>
        <p className='text-end'><Button variant={ 'link' } type='button' className='text-primary'>Forgot password?</Button></p>
      </div>

    </form>
  );
}