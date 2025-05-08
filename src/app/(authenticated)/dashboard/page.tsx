import { DashboardParts } from '@/app/components/dashboard/main';
import { AddMarketplacePromoForm } from '../../components/dashboard/add-marketplace-listing';
import { Suspense } from 'react';
export default async function Dashboard()
{

  return (
    <Suspense fallback={ <div>loading...</div> }>
      <DashboardParts.Main>
        <DashboardParts.Portal name='add-promo'>
          <AddMarketplacePromoForm />
        </DashboardParts.Portal>
      </DashboardParts.Main>
    </Suspense>
  );
}