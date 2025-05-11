import { AddMarketplaceListingForm } from '../forms/add-marketplace-listing-form';

export function AddMarketplacePromoForm()
{
  return (
    <div className='h-full w-full overflow-hidden'>
      <div className='h-40 bg-slate-50 px-24 flex items-center border-b'>
        <h1 className='text-xl tracking-tight font-medium text-slate-800 tracking-wide'>Marketplace</h1>
      </div>
      <div className='relative h-full px-24 overflow-auto pt-16 pb-24'>
        <div>
          <AddMarketplaceListingForm />
        </div>
      </div>
    </div>
  );
}