import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import {
  type NextAuthOptions,
  getServerSession,
  type User,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import type { WithId } from 'mongodb';
import { hashFn } from '@/app/(authenticated)/_lib/hashFn';
import { timingSafeEqual } from 'crypto';
import { VendorAccount } from '@/app/types/account';

type ProUser = Pick<VendorAccount, 'firstName' | 'lastName'> &
  Pick<Required<VendorAccount>['_metadata'], 'role'> &
  User;
interface AuthCredential {
  user: string;
  pwd: string;
}

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-up',
    signOut: '/',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const proUser = <ProUser>{ ...user };
        token.firstName = proUser.firstName;
        token.lastName = proUser.lastName;
        token.role = proUser.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        //@ts-expect-error I have no way to modify the session type
        session.user.role = token.role;
        //@ts-expect-error I have no way to modify the session type
        session.user.firstName = token.firstName;
        //@ts-expect-error I have no way to modify the session type
        session.user.lastName = token.lastName;
        //@ts-expect-error I have no way to modify the session type
        session.user.id = token.sub;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const cred = <AuthCredential>credentials;

        try {
          const connection = await client.connect();

          const collection = connection
            .db(DBs.CLIENT_DATA)
            .collection(COLLECTIONS.ACCOUNTS);

          const result = await collection.findOne<
            WithId<VendorAccount>
          >({ email: cred.user });

          if (!result) return null;

          if (result) await connection.close();

          const [pwd] = hashFn(cred.pwd, result.pwd.salt);

          const inputPwdBuffer = Buffer.from(pwd, 'hex');
          const dbPwdBuffer = Buffer.from(
            result.pwd.content!,
            'hex'
          );

          const isEqual = timingSafeEqual(
            inputPwdBuffer,
            dbPwdBuffer
          );

          if (!isEqual) return null;

          return {
            id: result._id.toString(),
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            role: result._metadata?.role,
          };
        } catch (error) {
          console.log(error);

          throw new Error('Failed to authenticate user');
        }
      },
    }),
  ],
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [
        GetServerSidePropsContext['req'],
        GetServerSidePropsContext['res']
      ]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
