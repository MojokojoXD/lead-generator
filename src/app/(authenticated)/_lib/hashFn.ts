import { scryptSync, randomBytes } from 'crypto';


export function hashFn( pwd: string, salt?: string )
{
  const _salt = salt ?? randomBytes( 16 ).toString( 'hex' );

  const hash = scryptSync( pwd, _salt, 64 ).toString( 'hex' );
  
  return [ hash, _salt ];
}