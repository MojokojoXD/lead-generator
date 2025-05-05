
import { NewProProfileForm } from '../../forms/new-pro-profile-form';

export function AddNewClientForm()
{
  return (
    <div className='h-full w-full space-y-5'>
      <h1 className='text-2xl font-medium text-slate-800 tracking-wide'>Add New Client Listing</h1>
      <hr />
      <NewProProfileForm />
    </div>
  );
}