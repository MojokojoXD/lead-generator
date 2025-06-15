import { type NextRequest, NextResponse } from 'next/server';
import { mailTransport } from '@/app/(authenticated)/_lib/smtp/nodemailer';
import validator from 'validator';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { add } from 'date-fns';
import { hashFn } from '@/app/(authenticated)/_lib/hashFn';
import { TokenSchema } from '@/app/types/account';

const baseSiteURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/sign-up'
    : 'https://www.prosfinder.com/sign-up';

const CREATION_TOKEN_HASH_SALT = process.env.CREATION_TOKEN_SALT;
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email || !validator.isEmail(email))
    return NextResponse.json({}, { status: 400 });

  try {
    const creationToken = crypto.randomUUID();

    const [hashedCreationToken] = hashFn(
      creationToken,
      CREATION_TOKEN_HASH_SALT
    );

    const tokenInfo: TokenSchema = {
      id: 'ADMIN_CREATION',
      token: hashedCreationToken,
      expiry: add( new Date(), { minutes: 10 } ),
      email,
    };

    const dbConnection = await client.connect();

    const collection = dbConnection
      .db(DBs.CLIENT_DATA)
      .collection(COLLECTIONS.TOKENS);

    const dbResult = await collection.insertOne(
      tokenInfo
    );

    if (!dbResult.acknowledged)
      throw new Error('failed to insert partial admin');

    await dbConnection.close();

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
