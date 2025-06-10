'use client';

import
{
  type ReactNode,
  createContext,
  useCallback,
  useState,
  useEffect
} from 'react';
import { Button } from '@/app/components/shadcnUI/button';
import Link from 'next/link';
import { Task, useTaskQueue } from '@/app/(authenticated)/dashboard/(components)/hooks/useTaskQueue';
import { useDashboardPortal } from '../../hooks/useDashboardPortal';
import { cn } from '@/lib/utils';
import { ArrowLeft, MenuIcon, Power } from 'lucide-react';
import Image from 'next/image';
import { useWindowSize } from '@uidotdev/usehooks';
import { signOut } from 'next-auth/react';


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
  const { width } = useWindowSize();
  const isOverSmallWindowWidth = Boolean(width && width >= 640);
  const [ toggleMenu, setToggleMenu ] = useState( false );

  
  const handleToggleMenu = useCallback( ( open: boolean ) =>
  {
    if ( isOverSmallWindowWidth ) return;
    setToggleMenu( open )
  }, [ isOverSmallWindowWidth ] )
  

  useEffect( () =>
  {
    if ( !width ) return 
    
    if ( width >= 640 )
    {
      setToggleMenu(true)
    } else setToggleMenu( false )
  },[width])
  
  if( !width ) return <></>

  return (
    <QueueContext.Provider value={ {
      add: addTask
    } }>
      <main className={ cn( 'fixed h-screen inset-y-0 bg-secondary pr-1.5 sm:transition-[left] ease-in-out duration-300',
        toggleMenu && isOverSmallWindowWidth ? 'left-0 right-0' :
         toggleMenu && !isOverSmallWindowWidth ? 'left-0 -right-[20rem]' : '-left-[80vw] sm:-left-[20rem] right-0 pl-1.5 sm:pl-5' ) }>
        <Menu
          portalNames={ portalNames }
          currentPortal={ currentPortal }
          onPortalChange={ handlePortalChange }
          handleMenuClose={handleToggleMenu}
        />
        <section className='relative h-full w-dwv border bg-white rounded-2xl overflow-hidden'>
          <div className={cn('absolute top-0 left-0 h-40 w-[20vw] flex justify-center items-center sm:hidden z-10')}>
            <Button
              variant={ 'ghost' }
              size={ 'lg' }
              className='[&_svg]:size-5 px-4'
              onClick={ () => setToggleMenu( prevState => !prevState ) }
            >
              { toggleMenu ? <ArrowLeft /> : <MenuIcon /> }
            </Button>
          </div>
          { renderPortal() }
        </section>
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

  const dashboardBtnClsx = cn('text-xl text-neutral-400 font-semibold px-0 hover:bg-transparent hover:text-text-neutral-400')
  return (
    <nav className='h-full w-[80vw] sm:w-full sm:max-w-[20rem] py-16 bg-inherit float-left flex justify-center'>
      <div className='relative h-full w-fit flex flex-col space-y-16'>
        <div className='h-40'>
          <Image src={'/prosfinder-white.svg'} height={200} width={200} alt='site logo' className='h-[30px] w-auto'/>
        </div>
        {/* <div className='text-secondary-foreground'>
          <span className='h-24 aspect-square border inline-block rounded-xl border-stone-700 bg-neutral text-neutral-foreground flex items-center justify-center text-2xl font-medium tracking-tighter mb-2.5'>KB.</span>
          <p className='text-lg font-semibold mb-1'>Kwadwo</p>
          <p className=' text-stone-500 font-medium text-sm'>kwadwoneer@gmail.com</p>
        </div> */}
        <div className='h-full'>
          <div className='mb-10'>
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
          <div>
            <ul>
              { portalNames.map( n => (
                <li key={ n } className='py-0.5'>
                  <Button
                    variant={ 'ghost' }
                    size={ 'lg' }
                    className={ cn( dashboardBtnClsx, 'flex items-center', n === currentPortal && 'text-secondary-foreground' ) }
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
        <footer>
          <Button
            variant={ 'ghost' }
            size={ 'icon' }
            className='text-secondary-foreground float-right [&_svg]:size-5'
            onClick={ () => signOut( {
                redirect: true,
                callbackUrl: '/'
               })
            }
          >
            <Power/>
          </Button>
        </footer>
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
    <div className='relative h-full w-full text-prose'>
      <div className='h-40 flex items-center border-b px-[20vw] sm:px-[10vw] lg:px-24'>
        <h1 className='text-2xl font-medium'>{ title }</h1>
      </div>
      <div className='absolute top-40 h-[calc(100vh-160px)] w-full px-[10vw] lg:px-24 overflow-hidden grid lg:grid-cols-2 gap-x-2.5 py-8'>
        <div className='h-full w-full max-w-md overflow-y-auto'>
          { children }
          </div>
          <div className='hidden lg:block'></div>
      </div>
    </div>
  );
}

export { Main, Portal, PortalView };