import { NextRequest, NextResponse } from 'next/server';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import type { AdminSignUpPayload } from '@/app/components/forms/admin-signup';
import { hashFn } from '@/app/(authenticated)/_lib/hashFn';
import { AdminAccount, TokenSchema } from '@/app/types/account';

const CREATION_TOKEN_SALT = process.env.CREATION_TOKEN_SALT;

export async function POST(req: NextRequest) {
  const { firstName, lastName, token, pwd, email } = await (<
    Promise<AdminSignUpPayload>
  >req.json());

  try {
    if (!token)
      return NextResponse.json(
        { message: 'missing creation token' },
        { status: 400 }
      );
    if (!CREATION_TOKEN_SALT)
      throw new Error('missing creation token salt');

    const [tokenHash] = hashFn(token, CREATION_TOKEN_SALT);

    const dbConnection = await client.connect();

    const tokenCollection = dbConnection
      .db(DBs.CLIENT_DATA)
      .collection<TokenSchema>(COLLECTIONS.TOKENS);

    const isTokenValid =
      (await tokenCollection.findOne({
        token: tokenHash,
        expiry: { $gte: new Date() },
      })) !== null;

    if (!isTokenValid)
      return NextResponse.json(
        { message: 'token is expired or invalid' },
        { status: 400 }
      );

    const [pwdHash, pwdSalt] = hashFn(pwd);

    const accountsCollection = dbConnection
      .db(DBs.CLIENT_DATA)
      .collection<AdminAccount>(COLLECTIONS.ACCOUNTS);

    const result = await accountsCollection.insertOne({
      _metadata: {
        createdAt: new Date(),
        role: 'admin'
      },
      firstName,
      lastName,
      email,
      pwd: {
        content: pwdHash,
        salt: pwdSalt
      }
    } );
    
    const deletedResult = await tokenCollection.deleteMany( { email } ) 

    if (deletedResult.acknowledged) await dbConnection.close();

    console.log(result);

    return NextResponse.json( { message: 'done' } );
    
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'unknown server error' },
      { status: 500 }
    );
  }
}
