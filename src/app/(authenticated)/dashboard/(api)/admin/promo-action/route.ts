import { NextRequest, NextResponse } from 'next/server';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { ObjectId } from 'mongodb';
import { auth } from '@/app/api/auth';
import { PROMO_ACTION } from '../../../(components)/list-all-promos/PromoActions';

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  //@ts-expect-error can't type modified session at this moment
  if (session.user.role !== 'admin')
    return NextResponse.json({}, { status: 401 });

  const id = req.nextUrl.searchParams.get('id');
  const action = <PROMO_ACTION>(
    req.nextUrl.searchParams.get('action')
  );

  if (!id) {
    return NextResponse.json({}, { status: 400 });
  }

  const dbConnection = await client.connect();

  const collection = dbConnection
    .db(DBs.CLIENT_DATA)
    .collection(COLLECTIONS.LISTINGS);

  console.log(action);
  try {
    switch (action) {
      case 'APPROVE': {
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              _metadata: {
                status: 'LISTED',
                lastModified: new Date(),
              },
            },
          }
        );

        console.log(result);

        return NextResponse.json({ message: 'listing updated' });
      }
      case 'UNLIST': {
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              _metadata: {
                status: 'UNLISTED',
                lastModified: new Date(),
              },
            },
          }
        );

        console.log(result);

        return NextResponse.json({ message: 'listing updated' });
      }
      case 'DELETE': {
        const result = await collection.deleteOne({
          _id: new ObjectId(id),
        });

        console.log(result);

        return NextResponse.json({ message: 'listing deleted' });
      }
      default:
        return NextResponse.json(
          { message: 'action not supported' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({}, { status: 500 });
  }
}
