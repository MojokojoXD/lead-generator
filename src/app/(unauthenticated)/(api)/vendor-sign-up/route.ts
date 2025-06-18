import { NextResponse, type NextRequest } from 'next/server';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { hashFn } from '@/app/(authenticated)/_lib/hashFn';
import { VendorAccount } from '@/app/types/account';
import { uploadFileToAWS } from '@/app/(authenticated)/_lib/storage/s3';

export async function POST(req: NextRequest) {
  const vendorForm = await req.formData();

  if (!vendorForm.has('json'))
    return NextResponse.json(
      {},
      { status: 400, statusText: 'missing vendor json on form' }
    );

  const newVendor: VendorAccount = JSON.parse(
    vendorForm.get('json') as string
  );

  const isLogoUploaded = vendorForm.has('logo');

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
    role: 'vendor',
  };

  try {
    //upload logo to S3
    if (isLogoUploaded) {
      const vendorLogoFile = vendorForm.get('logo');

      if (!(vendorLogoFile instanceof File))
        return NextResponse.json(
          {},
          {
            status: 400,
            statusText: 'Incorrect data type for logo upload',
          }
        );

      const logoFileExt = vendorLogoFile.type.split('/').pop()!;
      const filename =
        newVendor.business.name +
        '_' +
        newVendor.business.logo.uploadAt +
        '.' +
        logoFileExt;
        
      newVendor.business.logo.filename = filename;

      const fileBuffer = await vendorLogoFile.arrayBuffer()
      const buffer = Buffer.from( fileBuffer )

      const isUploaded = await uploadFileToAWS( `vendors/${ filename }`, buffer );

      if ( !isUploaded ) throw new Error( 'failed to upload logo file' );
    }

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
      { message: 'unknown server error' },
      { status: 500 }
    );
  }
}
