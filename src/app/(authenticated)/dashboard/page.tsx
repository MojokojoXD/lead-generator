import { Dashboard } from './(components)/layout/main';
import { MarketplacePortal } from './(components)/marketplace-portal';
import { ProsPortal } from './(components)/add-vendor';
import { ListAllPromos } from './(components)/list-all-promos';
import { ProfilePortal } from './(components)/profile-portal';
import { Suspense } from 'react';
import { auth } from '@/app/api/auth';
import Link from 'next/link';
import { Loading } from '@/app/components/ui/loading';
export default async function DashboardPage()
{

  const session = await auth();

  if ( !session ) return (
    <div className='h-full ring-2 flex justify-center items-center'>
      <p>Your session has expired!
        <Link href={ '/login' } className='text-rose-500 underline'> Sign in</Link> or go
        <Link href={ '/' } className='text-rose-500 underline'> home</Link>
      </p>
    </div>
  );

  return (
    <Suspense fallback={ <Loading /> }>
      {/* @ts-expect-error haven't figured out how to add properties to session type yet */ }
      { session.user && session.user.role === 'admin' ?
        (
          <Dashboard.Main>
            <Dashboard.Portal name='Dashboard'>
              <ListAllPromos />
            </Dashboard.Portal>
            <Dashboard.Portal name='Marketplace'>
              <MarketplacePortal />
            </Dashboard.Portal>
            <Dashboard.Portal name='Pros'>
              <ProsPortal/>
            </Dashboard.Portal>
          </Dashboard.Main>
        )
        :
        (
          <Dashboard.Main>
            <Dashboard.Portal name='Profile'>
              <ProfilePortal />
            </Dashboard.Portal>
            <Dashboard.Portal name='Add Promo'>
              <MarketplacePortal />
            </Dashboard.Portal>
          </Dashboard.Main>
        )

      }
    </Suspense>
  );
}