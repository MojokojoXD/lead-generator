'use client';

import
{
  type ReactNode,
  createContext,
  useCallback,
  useState
} from 'react';
import { Button } from '@/app/components/shadcnUI/button';
import Link from 'next/link';
import { Task, useTaskQueue } from '@/app/(authenticated)/dashboard/(components)/hooks/useTaskQueue';
import { useDashboardPortal } from '../../hooks/useDashboardPortal';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';


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

  handleMenuClose: ( open: boolean ) => void;
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
  const [ toggleMenu, setToggleMenu ] = useState( true );

  const handleToggleMenu = useCallback( ( open: boolean ) =>
  {
    setToggleMenu( open )
  }, [])


  return (
    <QueueContext.Provider value={ {
      add: addTask
    } }>
      <main className={cn('fixed inset-y-0 right-0 h-full w-fit bg-secondary p-2.5 transition-[left] ease-in-out duration-300', toggleMenu ? 'left-0' : '-left-[20rem]')}>
        <Menu
          portalNames={ portalNames }
          currentPortal={ currentPortal }
          onPortalChange={ handlePortalChange }
          handleMenuClose={handleToggleMenu}
        />
        <div className='relative h-full w-dwv border bg-white rounded-lg overflow-hidden ml-2.5 p-2.5'>
          <div>
            <Button
              variant={ 'ghost' }
              size={ 'icon' }
              onClick={ () => setToggleMenu( prevState => !prevState ) }
            >
              <MenuIcon />
            </Button>
          </div>
          { renderPortal() }
        </div>
      </main>
    </QueueContext.Provider>
  );
}
function Menu( {
  portalNames,
  currentPortal,
  onPortalChange,
  handleMenuClose }: MenuProps )
{

  const dashboardBtnClsx = cn('text-xl text-neutral-400 font-semibold px-0')
  return (

    <nav className='h-full w-[20rem] py-16 bg-inherit float-left flex justify-center'>
      <div className='w-fit flex flex-col'>
        <div>
          <Image src={'/prosfinder-white.svg'} height={200} width={200} alt='site logo' className='h-[30px] w-auto'/>
        </div>
        <div className='grow flex flex-col justify-center space-y-8'>
          <div>
            <h3 className='text-xs font-medium text-stone-500 mb-2.5'>GENERAL</h3>
            <ul>

              <li >
                <Link href={ '/' }>
                  <Button variant={ 'ghost' } size={'lg'} className={ dashboardBtnClsx }>
                    Home
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
          <hr className='border-stone-700' />
          <div>
            <h3 className='text-xs font-medium text-stone-500 mb-2.5'>DASHBOARD</h3>
            <ul>
              { portalNames.map( n => (
                <li key={ n } className='py-0.5'>
                  <Button
                    variant={ 'ghost' }
                    size={'lg'}
                    className={ cn(dashboardBtnClsx,'flex items-center', n === currentPortal && 'text-secondary-foreground') }
                    onClick={ () =>
                    {
                      onPortalChange( n );
                      handleMenuClose( false );
                    } }>
                    { n.split( '-' ).join( ' ' ) }
                  </Button>
                </li> )
              ) }
            </ul>
          </div>
        </div>
      </div>
    </nav>
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