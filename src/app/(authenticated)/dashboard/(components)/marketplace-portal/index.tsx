import { SessionWithRole } from '@/app/types/account';
import { AddMarketplaceListingForm } from '../forms/add-marketplace-listing-form';
import { Dashboard } from '../layout/main';
import { auth } from '@/app/api/auth';
export async function MarketplacePortal()
{

  const session = await auth() as SessionWithRole;

  return (
    <Dashboard.PortalView title='Marketplace'>
      <AddMarketplaceListingForm role={ session?.user?.role ?? 'vendor' } />
    </Dashboard.PortalView>
  );
}