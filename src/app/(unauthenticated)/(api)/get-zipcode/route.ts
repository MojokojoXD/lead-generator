import { type NextRequest, NextResponse } from 'next/server';
import { client, dbs } from '../../../_db/mongodb';

type Coordinate = number | string | null;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    let lat: Coordinate = searchParams.get('lat');
    let lng: Coordinate = searchParams.get('lng');

    if (!lat || !lng)
      return NextResponse.json(
        { message: 'invalid search params' },
        { status: 400, statusText: 'invalid search params' }
      );

    lat = parseFloat(lat);
    lng = parseFloat(lng);

    if (Number.isNaN(lat) || Number.isNaN(lng))
      return NextResponse.json(
        { message: 'invalid coordinate values' },
        { status: 400, statusText: 'invalid coordinates' }
      );

    const dbConnection = await client.connect();

    const { dbName, collections } = dbs.metadata;

    const collection = dbConnection.db(dbName).collection(collections.zipcodes);

    const cursor = await collection
      .find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [lng, lat] },
            $minDistance: 1000,
            $maxDistance: 5000,
          },
        },
      })
      .project({ _id: 0, location: 0 })
      .limit(1);

    const result = await cursor.toArray();

    if ( result ) await dbConnection.close();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'unknown server error' }, { status: 500 });
  }
}
