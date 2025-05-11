import { Suspense } from 'react';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { ListingCard } from '@/app/components/marketplace/listing-card';
import type { ListingPayload } from '@/app/components/forms/marketplace-listing-form';
import type { WithId } from 'mongodb';
import { generatePromoImgURL } from '@/app/(authenticated)/dashboard/storage/_lib/s3';


const getAllListings = async () =>
{
  const connection = await client.connect();

  try
  {

    const collection = connection.db( DBs.CLIENT_DATA ).collection( COLLECTIONS.LISTINGS );

    const cursor = await collection.find<WithId<ListingPayload>>( {} );


    let data = await cursor.toArray();

    const transformedData = data.map( async l =>
    {
      const url = await generatePromoImgURL( `promo-images/${ l.promo_img.filename }` );

      l.promo_img.filename = url;

      return l;
    } );

    data = await Promise.all( transformedData );

    return data;

  } catch ( error )
  {

    console.log( error );
    return [];
  }
};


export default async function Marketplace()
{

  const listings = await getAllListings();

  return (
    <Suspense fallback={ <p>Loading...</p> }>
      <div className='px-20 py-10 space-y-12 bg-white min-h-screen'>
        <h1 className='text-2xl font-2xl tracking-wide text-slate-800'>Marketplace</h1>
        <div className='grid grid-cols-3 auto-cols-fr gap-8 w-full'>
          {
            listings.map( l =>
            {
              const { _id, ...other } = l;

              return (

                <ListingCard key={ _id.toString() } { ...other } />

              );
            } )
          }
        </div>
      </div>
    </Suspense>
  );
}