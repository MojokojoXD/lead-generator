import { NextRequest, NextResponse } from 'next/server';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { ObjectId } from 'mongodb';

export async function GET( req: NextRequest )
{
  const id = req.nextUrl.searchParams.get( 'id' );

  if ( !id )
  {
    return NextResponse.json({}, { status: 400 })
  }

  try
  {
    
    const dbConnection = await client.connect();

    const collection = dbConnection.db( DBs.CLIENT_DATA ).collection( COLLECTIONS.LISTINGS );

    const result = await collection.updateOne( { _id: new ObjectId( id ) }, {
      '$set': { _metadata: { isApproved: true } }
    } )
    
    console.log( result )

    return NextResponse.json({ message: 'listing updated' })
    
  } catch (error) {
    console.log( error )

    return NextResponse.json({}, { status:500 })
  }
}