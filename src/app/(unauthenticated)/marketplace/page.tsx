import { Suspense } from 'react';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { ListingCard } from '@/app/components/marketplace/listing-card';
import type { WithId } from 'mongodb';
import { generatePromoImgURL } from '@/app/(authenticated)/_lib/storage/s3';


const getAllListings = async () =>
{
  const connection = await client.connect();

  try
  {

    const collection = connection.db( DBs.CLIENT_DATA ).collection( COLLECTIONS.LISTINGS );

    const cursor = await collection.find<WithId<ListingPayload>>( {'_metadata.status': 'LISTED'} );


    let data = await cursor.toArray();
    
    if ( data ) await connection.close();

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
    await connection.close();
    console.log( error );
    return [];
  }
};


export default async function Marketplace()
{

  const listings = await getAllListings();

  return (
    <Suspense fallback={ <p>Loading...</p> }>
      <div className='px-[5%] lg:px-[6.5%] py-10 space-y-12 min-h-screen bg-stone-50'>
        <h1 className='text-2xl font-2xl tracking-wide text-prose'>Marketplace</h1>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,25rem))] gap-3 w-full h-full'>
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