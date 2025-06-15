import { NextResponse, type NextRequest } from 'next/server';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { getToken } from 'next-auth/jwt';
import { uploadFileToAWS } from '@/app/(authenticated)/_lib/storage/s3';

const secret = process.env.NEXTAUTH_SECRET;
export async function POST( req: NextRequest )
{
  
  //jwt token verification

  const token = await getToken( { req, secret } );
  
  if (!token) return NextResponse.json({ message: 'unauthorized user' }, { status: 401 });

  //parsing multipart form

  const promoForm = await req.formData();

  const promoInfo: ListingPayload = JSON.parse(<string>promoForm.get('vendorJSON')); // vendor info is sent as a JSON string
  const promoImgFile = <File>promoForm.get('promoImg');

  //rename promo image file
  const fileExt = promoImgFile.type.split('/').pop()!;

  const formattedPromoImgFilename = `${token.sub}_${promoInfo.promo_img.upload_time}.${fileExt}`;
  promoInfo.promo_img.filename = formattedPromoImgFilename;

  const fileBuffer = await promoImgFile.arrayBuffer();

  const buffer = Buffer.from(fileBuffer);

  try {
    const isUploaded = await uploadFileToAWS(`promo-images/${formattedPromoImgFilename}`, buffer);

    if (!isUploaded) throw new Error('failed to upload file to aws');

    const connection = await client.connect();

    const collection = connection.db(DBs.CLIENT_DATA).collection(COLLECTIONS.LISTINGS);

    const result = await collection.insertOne(promoInfo);

    if (result.acknowledged) return NextResponse.json({ message: 'listing added' });

    throw result;
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'operation failed' }, { status: 500 });
  }
}
