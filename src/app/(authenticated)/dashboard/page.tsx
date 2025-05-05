import { DashboardParts } from '@/app/components/dashboard/main'
import { AddMarketplacePromoForm } from '../../components/dashboard/add-marketplace-listing'
import { AddNewClientForm } from '@/app/components/dashboard/add-new-client'
export default function Dashboard()
{
  return (
    <DashboardParts.Main>
      <DashboardParts.Portal name='add-promo'>
          <AddMarketplacePromoForm/>
      </DashboardParts.Portal>
      <DashboardParts.Portal name='add-client'>
          <AddNewClientForm/>
      </DashboardParts.Portal>
    </DashboardParts.Main>
  )
}