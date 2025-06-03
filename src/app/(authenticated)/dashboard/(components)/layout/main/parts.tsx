'use client';

import
{
  type ReactNode,
  createContext,
} from 'react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { Task, useTaskQueue } from '@/app/(authenticated)/dashboard/(components)/hooks/useTaskQueue';
import { useDashboardPortal } from '../../hooks/useDashboardPortal';


interface MainProps
{
  children: ReactNode;
}

export interface PortalProps
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


export const QueueContext = createContext<{ add: ( task: Task ) => void; } | null>( null );

function Main( { children }: MainProps )
{
  const {
    renderPortal,
    handlePortalChange,
    portalNames,
    currentPortal
  } = useDashboardPortal( children );
  const { addTask } = useTaskQueue( { shouldProcess: true } );


  return (
    <QueueContext.Provider value={ {
      add: addTask
    } }>
      <div className='h-full grid grid-cols-6 bg-white'>
        <Menu
          portalNames={ portalNames }
          currentPortal={ currentPortal }
          onPortalChange={ handlePortalChange }
        />
        <div className='h-full col-start-2 col-span-full overflow-auto'>
          { renderPortal() }
        </div>
      </div>
    </QueueContext.Provider>
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