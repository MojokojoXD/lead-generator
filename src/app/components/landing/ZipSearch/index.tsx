'use client';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

let isLocationAcquired = false;
export function ZipSearch()
{

  const [ userZipInput, setUserZipInput ] = useState( '' );
  const [ isFetching, setIsFetching ] = useState( false );

  const handleZipChange = ( e: ChangeEvent<HTMLInputElement> ) => setUserZipInput( e.target.value );

  useEffect( () =>
  {

    if ( isLocationAcquired ) return;

    setIsFetching( true );

    if ( !navigator.geolocation )
    {
      console.error( 'Location services not availabe in your browser' );
    } else
    {
      navigator.geolocation.getCurrentPosition( async ( position ) =>
      {
        try
        {

          const { longitude, latitude } = position.coords;

          const res = await fetch( `/get-zipcode?lng=${ longitude }&lat=${ latitude }` );

          setIsFetching( false );

          if ( res.ok )
          {
            const data: CoordinateLocation[] = await res.json();

            setUserZipInput( data[ 0 ].zip.toString() );

            return;
          }

          throw res;

        } catch ( error )
        {
          console.log( error );
        }
      }, ( error ) =>
      {
        setIsFetching( false );
        console.log( error );
      } );
    }

    return () =>
    {
      isLocationAcquired = true;
    };
  }, [ isFetching ] );

  return (
    <div className='flex items-center relative rounded-full overflow-hidden bg-slate-50 w-2/3 p-1'>
      <div className='relative grow flex items-center'>
        { isFetching
          ? <Loader2 className='absolute left-2 h-10 aspect-square text-slate-800 animate-spin' />
          : <MapPin className='absolute left-2 h-10 aspect-square text-slate-700' />
        }

        <input
          type="text"
          name="zipcode"
          id="__landing-zipcode"
          className='py-2.5 pl-10 w-full border-none outline-none px-5 text-slate-700 bg-transparent'
          placeholder='Zip code'
          onChange={ handleZipChange }
          value={ userZipInput }
        />
      </div>
      <button className='grow-0 border-none rounded-full h-10 aspect-square border bg-rose-500'>
        <Search className='h-full aspect-square text-white mx-auto' />
      </button>
    </div>
  );
}