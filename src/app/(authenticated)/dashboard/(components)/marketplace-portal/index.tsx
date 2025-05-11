import { AddMarketplaceListingForm } from '../forms/add-marketplace-listing-form';
import { DashboardParts } from '../layout/main';
export function MarketplacePortal()
{
  return (
    <DashboardParts.PortalView title='Marketplace'>
      <AddMarketplaceListingForm />
    </DashboardParts.PortalView>
  );
}