import { AddVendorForm__Dashboard } from '../forms/add-vendor-form';
import { Dashboard } from '../layout/main';
export async function ProsPortal()
{

  return (
    <Dashboard.PortalView title='Pros'>
      <AddVendorForm__Dashboard  />
    </Dashboard.PortalView>
  );
}