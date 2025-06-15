'use client';

import { Button } from '@/app/components/shadcnUI/button';
import { Eye, ThumbsDown, ThumbsUp, Trash } from 'lucide-react';
import { useContext,useState } from 'react';
import { DashboardContext } from '../../layout/main/parts';
import { useRouter } from 'next/navigation';
interface PromoActionsProps
{
  promo_id: string;

  status: PromoStatus;
}

export enum PROMO_ACTION
{
  APPROVE = 'APPROVE',
  UNLIST = 'UNLIST',
  DELETE = 'DELETE'
}

const PROMO_ACTION_ENDPOINT = '/dashboard/admin/promo-action';

export function PromoActions( { promo_id, status }: PromoActionsProps )
{
  const router = useRouter();
  const dashboardContext = useContext( DashboardContext );

  const [ actionInProgress, setActionInProgress ] = useState( false );

  if ( !dashboardContext ) return <></>;

  const { addTask } = dashboardContext;

  const handleAction = async ( action: PROMO_ACTION ) =>
  {

    const PromoActionPromise = new Promise<void>( async ( resolve, reject ) =>
    {
      setActionInProgress( true );

      try
      {
        const res = await fetch( PROMO_ACTION_ENDPOINT + `?id=${ promo_id }&action=${ action }` );

        if ( res.ok )
        {
          alert( 'Action successful' );

          router.refresh();

          resolve();

          return;
        };

        alert( 'Couldn\'t perform action' );

        throw res;

      } catch ( error )
      {

        console.log( error );
        reject();
      } finally
      {
        setActionInProgress( false );
      }
    } );

    addTask( {
      id: 'PROMO_ACTION',
      action: () => PromoActionPromise
    } );
  };

  return (
    <div className='flex w-fit'>
      <Button
        variant={ 'ghost' }
        size={ 'icon' }
        onClick={ () => handleAction( PROMO_ACTION.APPROVE ) }
        title='list promo'
        disabled={
          actionInProgress
          || status === 'LISTED' }>
        <ThumbsUp />
      </Button>
      <Button
        variant={ 'ghost' }
        size={ 'icon' }
        title='unlist promo'
        onClick={ () => handleAction( PROMO_ACTION.UNLIST ) }
        disabled={
          actionInProgress
          || status === 'UNLISTED' }>
        <ThumbsDown />
      </Button>
      <Button variant={ 'ghost' } size={ 'icon' } title='preview promo' disabled>
        <Eye />
      </Button>
      <Button
        variant={ 'ghost' }
        size={ 'icon' }
        title='delete promo'
        disabled={ actionInProgress }
        onClick={() => handleAction( PROMO_ACTION.DELETE )}
      >
        <Trash />
      </Button>
    </div>
  );
}