import type { ListingPayload } from '../../forms/add-marketplace-listing-form';
import type { WithId } from 'mongodb';
import { PromoActions } from '../PromoActions';


interface PromosTableProps
{
  promos: WithId<ListingPayload>[];
}


export function PromosTable( { promos }: PromosTableProps )
{
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Business Name</th>
          <th>Title</th>
          <th>Status</th>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          promos.map( p => (
            <tr key={p._id.toString()}>
              <td>{ p._id.toString() }</td>
              <td>{ p.businessName }</td>
              <td>{ p.title }</td>
              <td>{ p._metadata.isApproved ? 'approved' : 'needs attention' }</td>
              <td>
                <PromoActions promo_id={ p._id.toString() }/>
              </td>
            </tr>
          ) )
        }
      </tbody>
     </table>
   )
}