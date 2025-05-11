'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

const SIGN_OUT_REDIRECT_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000' : 'https://prosfindr.com';


export function SignOut()
{
  const router = useRouter();

  const handleSignOut = async () =>
  {
    try
    {
      const res = await signOut( {
        callbackUrl: SIGN_OUT_REDIRECT_URL,
        redirect: false
      } );

      router.replace( res.url );

    } catch ( error )
    {
      console.log( error );
    }

  };

  return (
    <Button variant={ 'ghost' } size={ 'sm' } onClick={ handleSignOut }>Sign Out</Button>
  );
}