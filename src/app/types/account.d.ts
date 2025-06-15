import type { Session } from 'next-auth';

type Role = 'admin' | 'vendor';
interface BaseAccount {
  _metadata?: {
    createdAt: Date;
    role: Role;
  };
  pwd: {
    content?: string;
    salt?: string;
  };

  firstName: string;
  lastName: string;
  email: string;
}

type AdminAccount = BaseAccount & {};

interface VendorAccount extends BaseAccount {
  category: string;
  business: {
    name: string;
    address: {
      street: string;
      city: string;
      zipcode: string;
    };
    phone: string;
    tin: string;
    url?: string;
  };
  bio?: string;
}

interface TokenSchema {
  id: 'ADMIN_CREATION' | 'PASSWORD_RESET';
  token: string;
  expiry: Date;
  email: string;
}

//Session

type SessionWithRole = Session & {
  user?: Pick<Session, 'user'> & { role: Role };
};
