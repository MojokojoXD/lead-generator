'use client';

export function SignOut()
{

  const handleSignOut = () =>
  {
      signOut()
  }

  return (
    <Button onClick={handleSignOut}>Sign Out</Button>
  )
}