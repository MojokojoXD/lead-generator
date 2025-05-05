import { MarketplaceListingForm } from '../../forms/marketplace-listing-form'

export function AddMarketplacePromoForm()
{
  return (
    <div className='h-full w-full space-y-5'>
      <h1 className='text-2xl font-medium text-slate-800 tracking-wide'>Add Marketplace Listing.</h1>
      <hr/>
      <MarketplaceListingForm/>
    </div>
  )
}