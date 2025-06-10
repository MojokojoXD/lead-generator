'use client';
import { useEffect } from 'react';
interface ProfileControlProps
{
  config: {
    businessName: string;
    category: string;
  };
}

export const BUSINESS_NAME_PARAM = 'b_name';
export const CATEGORY_PARAM = 'cat';

export function ProfileControl( { config }: ProfileControlProps )
{

  useEffect( () =>
  {

    const url = location.href;

    const modifiedURL = new URL( url );

    const isAlreadyModified =
      modifiedURL.searchParams.has( BUSINESS_NAME_PARAM ) ||
      modifiedURL.searchParams.has( CATEGORY_PARAM );

    if ( isAlreadyModified ) return;

    modifiedURL.searchParams.append( BUSINESS_NAME_PARAM, config.businessName );
    modifiedURL.searchParams.append( CATEGORY_PARAM, config.category );

    history.pushState( 'setting profile params', '', modifiedURL.toString() );

  }

    , [ config.businessName, config.category ] );

  return (
    <></>
  );
}