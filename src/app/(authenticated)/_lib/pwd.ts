import { scryptSync, randomBytes } from 'crypto';


export function hashPWD( pwd: string, salt?: string )
{
  const tempSalt = salt ?? randomBytes( 16 ).toString( 'hex' );

  const hash = scryptSync( pwd, tempSalt, 64 ).toString( 'hex' );
  
  return [ hash, tempSalt ];
}