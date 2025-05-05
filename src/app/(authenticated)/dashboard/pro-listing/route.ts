import { NextResponse, type NextRequest } from 'next/server';
import { client, dbs } from '@/app/_db/mongodb';
import type { NewProProfilePayload } from '@/app/components/forms/new-pro-profile-form';

export async function POST(req: NextRequest) {
  const newClient: NewProProfilePayload = await req.json();

  try {
    const connection = await client;

    const collection = connection.db(dbs.client.dbName).collection(dbs.client.collections.account);

    const result = await collection.insertOne(newClient);

    if (result.acknowledged) return NextResponse.json({ message: 'new client added' });

    throw result;
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'operation failed' }, { status: 500 });
  }
}
