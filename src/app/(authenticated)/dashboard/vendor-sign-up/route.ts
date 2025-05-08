import { NextResponse, type NextRequest } from 'next/server';
import { client, DBs,COLLECTIONS } from '@/app/_db/mongodb';
import type { NewVendorPayload } from '@/app/components/forms/new-pro-profile-form';
import { hashPWD } from '../../_lib/pwd';


export type VendorWithRole<T> = { role: 'vendor' | 'admin'; } & T;

export async function POST( req: NextRequest )
{
  const newVendor: VendorWithRole<NewVendorPayload> = await req.json();

  const [ hash, salt ] = hashPWD( newVendor.pwd.content );

  newVendor.pwd.content = hash;
  newVendor.pwd.salt = salt;

  newVendor.role = 'vendor';

  try {
    const connection = await client;

    const collection = connection.db(DBs.CLIENT_DATA).collection(COLLECTIONS.ACCOUNTS);

    const result = await collection.insertOne(newVendor);

    if (result.acknowledged) return NextResponse.json({ message: 'new client added' });

    throw result;
  } catch ( error )
  {
    
    console.log(error);

    return NextResponse.json({ message: 'operation failed' }, { status: 500 });
  }
}
