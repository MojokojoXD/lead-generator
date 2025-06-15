import { PromosTable } from './PromosTable';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { WithId } from 'mongodb';
import { PortalView } from '../layout/main/parts';


const getAllPromos = async() =>
{
   try {
    
     const dbConnection = await client.connect();

     const collection = dbConnection.db( DBs.CLIENT_DATA ).collection( COLLECTIONS.LISTINGS );

     const cursor = await collection.find<WithId<ListingPayload>>( {} );

     const data = await cursor.toArray();

     if ( data ) await dbConnection.close();

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
    <PortalView title='Dashboard'>
      <PromosTable promos={promos}/>
    </PortalView>
  )
}