'use client';

import { type ReactElement, type ReactNode, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';


interface MainProps
{
  children: ReactNode;
}

interface PortalProps
{
  name: string;
  children: ReactNode;
}


interface MenuProps
{
  portalNames: string[];

  currentPortal: string;

  onPortalChange: ( portal: string ) => void;
}

interface PortalViewProps
{
  children: ReactNode;
  title?: string;
}

function Main( { children }: MainProps )
{

  let portalNames: string[] = [];

  let childrenElements = children as ReactElement<PortalProps> | ReactElement<PortalProps>[];

  if ( Array.isArray( childrenElements ) )
  {
    childrenElements = childrenElements.filter( Boolean );
    portalNames = childrenElements.map( p => p.props.name );

  } else portalNames.push( ( children as ReactElement<PortalProps> ).props.name );


  const [ portal, setPortal ] = useState<string | undefined>( portalNames[ 0 ] );

  if ( !portal ) throw new Error( 'Main component must have at least one portal child' );


  const handlePortalChange = ( newPortal: string ) => setPortal( newPortal );

  const renderPortal = () => Array.isArray( childrenElements ) ? childrenElements.filter( e => e.props.name === portal ) : childrenElements;

  return (
    <div className='h-full grid grid-cols-6 bg-white'>
      <Menu
        portalNames={ portalNames }
        currentPortal={ portal }
        onPortalChange={ handlePortalChange }
      />
      <div className='h-full col-start-2 col-span-full overflow-auto'>
        { renderPortal() }
      </div>
    </div>
  );
}
function Menu( { portalNames, currentPortal, onPortalChange }: MenuProps )
{
  return (
    <div className='h-full col-span-1 px-5 py-16 space-y-10 bg-slate-800'>
      <div>
        <ul>
          <li>
            <Link href={ '/' }>
              <Button variant={ 'dashboard-ghost' }>
                Home
              </Button>
            </Link>
          </li>
        </ul>
      </div>
      <hr className='border-slate-600' />
      <div>
        <ul>
          { portalNames.map( n => (
            <li key={ n } className='py-0.5'>
              <Button
                variant={ currentPortal === n ? 'dashboard-menu' : 'dashboard-ghost' }
                className='capitalize'
                onClick={ () => onPortalChange( n ) }>
                { n.split( '-' ).join( ' ' ) }
              </Button>
            </li> )
          ) }
        </ul>
      </div>
    </div>
  );
}


function Portal( { children }: PortalProps )
{
  return (
    <>
      { children }
    </>
  );
}


function PortalView( { title, children }: PortalViewProps )
{
  return (
    <section className='h-full w-full overflow-hidden'>
      <div className='h-40 bg-slate-50 px-24 flex items-center border-b'>
        <h1 className='text-xl tracking-tight font-medium text-slate-800 tracking-wide'>{ title }</h1>
      </div>
      <div className='relative h-full px-24 overflow-auto pt-16 pb-24'>
        <div>
          { children }
        </div>
      </div>
    </section>
  );
}

export { Main, Portal, PortalView };