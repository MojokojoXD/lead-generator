'use client'

import { type ReactElement, type ReactNode, useState } from 'react';
import { Button } from '../../button';

interface MainProps
{
  children: ReactNode
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

function Main( { children }: MainProps )
{

  let portalNames: string[] = [];

  const childrenElements = children as ReactElement<PortalProps> | ReactElement<PortalProps>[];

  if ( Array.isArray( childrenElements ) )
  {
    portalNames = childrenElements.map( p => p.props.name );

  } else portalNames.push( ( children as ReactElement<PortalProps> ).props.name )
  

  const [ portal, setPortal ] = useState<string | undefined>( portalNames[0] );

  if ( !portal ) throw new Error( 'Main component must have at least one portal child' );


  const handlePortalChange = ( newPortal: string ) => setPortal( newPortal );

  const renderPortal = () => Array.isArray( childrenElements ) ? childrenElements.filter( e => e.props.name === portal ) : childrenElements;

  return (
    <div className='h-full grid grid-cols-6'>
      <Menu
        portalNames={ portalNames }
        currentPortal={ portal }
        onPortalChange={ handlePortalChange }
      />
      <div className='col-start-2 col-span-full px-24 py-10'>
          { renderPortal() }
      </div>
    </div>
   )
}
function Menu( { portalNames, currentPortal, onPortalChange }: MenuProps )
{
  return (
    <div className='col-span-1 border-r border-slate-200 px-2.5 py-10'>
      <ul className='space-y-2.5'>
        { portalNames.map( n => (
          <li key={ n }>
            <Button
              variant={ currentPortal === n ? 'primary' : 'outline' }
              className='capitalize'
              onClick={ () => onPortalChange( n ) }>
              { n.split( '-' ).join( ' ' ) }
            </Button>
          </li> )
        ) }
      </ul>
    </div>
  )
}


function Portal( { children }: PortalProps )
{
  return (
    <>
      { children }
    </>
  )
}


export { Main, Portal }