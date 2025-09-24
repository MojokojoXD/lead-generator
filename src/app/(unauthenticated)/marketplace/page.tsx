import { Suspense } from 'react';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { ListingCard } from '@/app/components/marketplace/listing-card';
import type { WithId } from 'mongodb';
import { generatePromoImgURL } from '@/app/(authenticated)/_lib/storage/s3';
import { Loading } from '@/app/components/ui/loading';
import { CategoryFilterBar } from '@/app/components/marketplace/category-filter-bar';


const getAllListings = async ( filters?: string | string[] ) =>
{

  const dbFilterParams: {
    '$and': object[],
  } = {
    '$and': [ 
      { '_metadata.status': 'LISTED' },
     ]
  }

  if ( filters && Array.isArray(filters) )
  {
    const categoryFilterQuery = filters.map( c => ( { category: c } ) );

    dbFilterParams.$and.push( { '$or': [ ...categoryFilterQuery ] } );
  }
  else if ( filters && typeof filters === 'string' )
    dbFilterParams.$and.push({ category: filters })

  const connection = await client.connect();

  try
  {

    const collection = connection.db( DBs.CLIENT_DATA ).collection( COLLECTIONS.LISTINGS );

    const cursor = await collection.find<WithId<ListingPayload>>( dbFilterParams );


    let data = await cursor.toArray();

    if ( data ) await connection.close();

    const transformedData = data.map( async l =>
    {
      if ( l.promo_img.filename )
      {
        l.promo_img.filename = await generatePromoImgURL( `promo-images/${ l.promo_img.filename }` );
      }
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


export default async function Marketplace( {
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
})
{

  const { filters } = await searchParams;

  const listings = await getAllListings( filters );

  return (
    <Suspense fallback={ <Loading /> }>
      <div className='px-[5%] lg:px-[6.5%] py-10 space-y-12 min-h-screen bg-stone-50'>
        {/* <h1 className='text-3xl font-medium tracking-wide text-prose text-center'>Welcome To The Neighborhood</h1> */}
        <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,25rem))] gap-3 w-full h-full'>
          <div className='col-span-full py-6'>
            <CategoryFilterBar/>
          </div>
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