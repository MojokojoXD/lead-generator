import { Suspense } from 'react';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { ClientCard } from '@/app/components/pros/client-card';
import { WithId } from 'mongodb';
import { VendorAccount } from '@/app/types/account';
import { Loading } from '@/app/components/ui/loading';
import { generatePromoImgURL } from '@/app/(authenticated)/_lib/storage/s3';


const getAllClients = async () =>
{
  try
  {
    const connection = await client.connect();

    const collection = connection.db( DBs.CLIENT_DATA )
      .collection<VendorAccount>( COLLECTIONS.ACCOUNTS );

    const cursor = await collection
      .find<WithId<VendorAccount>>( { '_metadata.role': 'vendor' } );


    let data = await cursor.toArray();

    if ( data ) await connection.close();

    const transformedData: WithId<VendorAccount>[] = [];

    for ( const v of data )
    {

      if ( !v.business.logo.filename ) continue;

      const url = await generatePromoImgURL( `vendors/${ v.business.logo.filename }` );

      v.business.logo.filename = url;

      transformedData.push( v );
    }

    // const transformedData = data.map( async v =>
    //     {
    //       const url = await generatePromoImgURL( `vendors/${ v.business.logo.filename }` );

    //       v.business.logo.filename = url;

    //       return v;
    //     } );

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

  const allClient = await getAllClients();

  return (
    <Suspense fallback={ <Loading /> }>
      <div className='px-[5%] lg:px-[6.5%] py-10 space-y-12 min-h-screen bg-stone-50'>
        <h1 className='text-2xl font-medium tracking-wide text-prose'>Meet the Pros</h1>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,25rem))] gap-3 w-full h-full'>
          {
            allClient.map( c =>
            {
              const { _id, ...other } = c;

              return (

                <ClientCard key={ _id.toString() } { ...other } />

              );
            } )
          }
        </div>
      </div>
    </Suspense>
  );
}