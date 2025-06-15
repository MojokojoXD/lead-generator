import type { WithId } from 'mongodb';
import { PromoActions } from '../PromoActions';
import { CircleSmall } from 'lucide-react';


interface PromosTableProps
{
  promos: WithId<ListingPayload>[];
}

const PROMO_STATUS_INDICATOR_CLSX: Record<PromoStatus, string> = {
  'LISTED': 'fill-green-500 stroke-transparent',
  'UNLISTED': 'fill-red-500 stroke-transparent',
  'REVIEW': 'fill-orange-500 stroke-transparent'
}

export function PromosTable( { promos }: PromosTableProps )
{


  return (
    <table className='[&_th]:bg-primary [&_th]:text-primary-foreground [&_th:first-of-type]:rounded-s-xl [&_th:last-of-type]:rounded-e-xl [&_th]:text-nowrap [&_th]:p-5 [&_th:first-of-type]:text-left [&_th:last-of-type]:text-right [&_th]:font-semibold [&_td:first-of-type]:border-s [&_td:last-of-type]:border-e [&_td]:border-y [&_td]:text-neutral-foreground [&_td]:text-nowrap [&_td]:px-5 [&_td]:py-2.5 [&_td:last-of-type]:rounded-e-xl [&_td:first-of-type]:rounded-s-xl [&_td]:text-[12px] [&_td:first-of-type]:max-w-[8.5rem] [&_td:first-of-type]:truncate border-separate border-spacing-y-1 table-fixed text-sm capitalize'>
      <thead>
        <tr>
          <th>Pid</th>
          <th>Uploaded</th>
          <th>Business Name</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          promos.map( p =>(
            <tr key={ p._id.toString() }>
              <td>{ p._id.toString() }</td>
              <td>{ new Date().toLocaleDateString() }</td>
              <td>{ p.businessName }</td>
              <td>{ p.title }</td>
              <td>
                <span className='[&_svg]:size-5'>
                  <CircleSmall className={ PROMO_STATUS_INDICATOR_CLSX[ p._metadata.status! ] } />
                </span>
              </td>
              <td>
                <div className='flex justify-end'>
                  <PromoActions promo_id={ p._id.toString() } status={ p._metadata.status! } />
                </div>
              </td>
            </tr>
          ) )
        }
      </tbody>
    </table>
  );
}