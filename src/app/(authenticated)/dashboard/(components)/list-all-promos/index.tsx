import { PromosTable } from './PromosTable';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import type { ListingPayload } from '../../forms/marketplace-listing-form';
import { WithId } from 'mongodb';


const getAllPromos = async() =>
{
   try {
    
     const dbConnection = await client.connect();

     const collection = dbConnection.db( DBs.CLIENT_DATA ).collection( COLLECTIONS.LISTINGS );

     const cursor = await collection.find<WithId<ListingPayload>>( {} );

     const data = await cursor.toArray();

     return data;
     
   } catch ( error )
   {
     
     console.log( error );
     return []
    
   }
}

export async function ListAllPromos()
{
  const promos = await getAllPromos()

  return (
    <div className='h-full w-full space-y-5'>
      <h1 className='text-2xl font-medium text-slate-800 tracking-wide'>All Promos</h1>
      <hr/>
      <PromosTable promos={promos}/>
    </div>
  )
}