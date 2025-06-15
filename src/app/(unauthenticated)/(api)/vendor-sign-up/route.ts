import { NextResponse, type NextRequest } from 'next/server';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { hashFn } from '@/app/(authenticated)/_lib/hashFn';
import { VendorAccount } from '@/app/types/account';

export async function POST(req: NextRequest) {
  const newVendor: VendorAccount = await req.json();

  if (!newVendor.pwd.content)
    return NextResponse.json(
      { message: 'incorrect vendor schema' },
      { status: 400 }
    );

  const [hash, salt] = hashFn(newVendor.pwd.content);

  newVendor.pwd.content = hash;
  newVendor.pwd.salt = salt;

  newVendor._metadata = {
    createdAt: new Date(),
    role: 'vendor'
  };

  try {
    const connection = await client.connect();

    const collection = connection
      .db(DBs.CLIENT_DATA)
      .collection(COLLECTIONS.ACCOUNTS);

    const result = await collection.insertOne(newVendor);

    if (result.acknowledged)
      return NextResponse.json({ message: 'new client added' });

    throw result;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'operation failed' },
      { status: 500 }
    );
  }
}
