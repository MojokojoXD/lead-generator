import { type NextRequest, NextResponse } from 'next/server';
import { mailTransport } from '@/app/(authenticated)/_lib/smtp/nodemailer';
import validator from 'validator';
import { NewVendorPayload } from '@/app/components/forms/new-vendor-form';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';

const baseSiteURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/sign-up'
    : 'https://www.prosfinder.com/sign-up';
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email || !validator.isEmail(email))
    return NextResponse.json({}, { status: 400 });

  try {
    const creationToken = crypto.randomUUID();
    const potentialAccount: NewVendorPayload = {
      _metadata: {
        creation_token: creationToken,
        created_at: new Date(),
        isExpired: false,
      },
      role: 'admin',
      firstName: '',
      lastName: '',
      pwd: {
        content: '',
        salt: '',
      },
      email,
    };

    const dbConnection = await client;

    const collection = dbConnection
      .db(DBs.CLIENT_DATA)
      .collection(COLLECTIONS.ACCOUNTS);

    const dbResult = await collection.insertOne(
      potentialAccount
    );

    if (!dbResult.acknowledged)
      throw new Error('failed to insert partial admin');

    const senderEmail = process.env.NODEMAILER_EMAIL_SENDER;
    const accountCreationURL = new URL(baseSiteURL);

    accountCreationURL.searchParams.append(
      'token',
      creationToken
    );

    if (!senderEmail) throw new Error('sender email missing');

    const emailResult = await mailTransport({
      from: {
        address: 'kwadwoneer@yahoo.com',
        name: 'no-reply',
      },
      to: email,
      text: accountCreationURL.toString(),
    });

    console.log(emailResult);

    return NextResponse.json({ message: 'done' });
  } catch (error) {
    console.log(error);

    if (error instanceof Error)
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );

    return NextResponse.json(
      { message: 'unknown server error' },
      { status: 500 }
    );
  }
}
