import { AddMarketplaceListingForm } from '../forms/add-marketplace-listing-form';
import { Dashboard } from '../layout/main';
export function MarketplacePortal()
{
  return (
    <Dashboard.PortalView title='Marketplace'>
      <AddMarketplaceListingForm />
    </Dashboard.PortalView>
  );
}