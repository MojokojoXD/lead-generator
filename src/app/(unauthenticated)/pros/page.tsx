import { Suspense } from 'react';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { NewVendorPayload } from '@/app/components/forms/new-vendor-form';
import { ClientCard } from '@/app/components/pros/client-card';
import { WithId } from 'mongodb';


const getAllClients = async () =>
{
  try
  {
    const connection = await client.connect();

    const collection = connection.db( DBs.CLIENT_DATA ).collection( COLLECTIONS.ACCOUNTS );

    const cursor = await collection.find<WithId<NewVendorPayload>>( { role: 'vendor' } );


    const data = await cursor.toArray();

    if ( data ) await connection.close();

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
    <Suspense fallback={ <p>Loading...</p> }>
      <div className='px-20 py-10 space-y-6'>
        <h1 className='text-2xl font-2xl tracking-wide text-slate-800'>Meet Our Professionals</h1>
        <hr />
        <div className='grid grid-cols-4 gap-2.5 auto-rows-min	'>
          { allClient.map( c => ( <ClientCard { ...c } key={ c._id.toString() } /> ) ) }
        </div>
      </div>
    </Suspense>
  );
}