import { NextResponse, type NextRequest } from 'next/server';
import { client, dbs } from '@/app/_db/mongodb';
import type { ListingPayload } from '@/app/components/forms/marketplace-listing-form';

export async function POST( req: NextRequest )
{
  
  const listing: ListingPayload = await req.json();

  try
  {
    
    const connection = await client;

    const collection = connection.db( dbs.client.dbName ).collection(dbs.client.collections.listings);

    const result = await collection.insertOne( listing );

    if ( result.acknowledged ) return NextResponse.json( { message: 'listing added' } )
    
    throw result;
    
  } catch (error) {
    
    console.log( error );

    return NextResponse.json({ message: 'operation failed' }, { status: 500 })
  }
}