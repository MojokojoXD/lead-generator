'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { ChangeEvent, useContext, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { QueueContext } from '../../layout/main/parts';
import { DatePicker } from '@/app/components/shadcnUI/date-picker';
export interface ListingPayload
{
  _metadata: {
    isApproved?: boolean;
    approvalOn?: Date;
  };
  title: string;
  discount: string;
  url_website: string;
  
  expiration: string;
  desc: string;
  promo_img: {
    upload_time: number | null | undefined;
    filename: string;
  };

  businessName?: string;

  category?: string;
}


const VALID_IMG_FORMATS = [ 'jpg', 'jpeg', 'png' ];
const __5MB = 5242880;

export function AddMarketplaceListingForm()
{
  const router = useRouter();
  const taskQueueContext = useContext( QueueContext );
  const [ isFetching, setIsFetching ] = useState( false );
  const [ promoImgFile, setPromoImgFile ] = useState<File | null>( null );
  const { register, handleSubmit, setValue, setError, getValues, watch } = useForm<ListingPayload>( {
    defaultValues: {
      _metadata: {
        isApproved: false
      },

      title: '',
      discount: '',
      url_website: '',
      expiration: '',
      desc: '',
      promo_img: {
        upload_time: null,
        filename: ''
      }
    }
  } );

  const fileName = getValues( 'promo_img.filename' );
  const currentExpirationValue = watch( 'expiration' );
  const expirationDateValue = !Number.isNaN( Date.parse( currentExpirationValue ) ) ?
    new Date( currentExpirationValue ) : undefined;

  register( 'promo_img.filename', {
    required: 'Please upload promo image'
  } );


  const handlePromoImg = ( event: ChangeEvent<HTMLInputElement> ) =>
  {
    const fileInput = event.target;

    if ( fileInput.files && fileInput.files.length > 0 )
    {
      const uploadedFile = fileInput.files[ 0 ];

      const error = VALID_IMG_FORMATS.includes( uploadedFile.type ) ? 'File format not support'
        : uploadedFile.size > __5MB ? 'File must be under 5mb' :
          null;

      if ( error )
      {
        setError( 'promo_img.filename', { message: error, type: 'validate' } );
      }

      setPromoImgFile( uploadedFile );
      setValue( 'promo_img.filename', uploadedFile.name );
      setValue( 'promo_img.upload_time', Date.now() );
    }


  };


  const submitHandler: SubmitHandler<ListingPayload> = ( data ) =>
  {

    setIsFetching( true );

    //headers

    const headers = new Headers();

    headers.append( 'Content-Type', 'multipart/form-data;boundary=---------------vendor_data' );

    //form data
    const form = new FormData();

    form.append( 'vendorJSON', JSON.stringify( data ) );
    form.append( 'promoImg', promoImgFile as File );

    const promoPromise = new Promise<void>( ( resolve, reject ) =>
    {
      fetch( '/dashboard/mkt-listing', {
        method: 'POST',
        body: form,
      } ).then( res =>
      {
        if ( res.ok )
        {
          alert( 'Listing added! Approval pending' );
          resolve();
          return;
        }

        if ( res.status === 401 )
        {
          router.replace( '/' );
          resolve();
        }

      } ).catch( err =>
      {
        console.log( err );
        reject();
      } ).finally( () => setIsFetching( false ) );
    } );

    taskQueueContext?.add( () => promoPromise) 

  };


  return (
    <form className='h-full max-w-md space-y-6 pb-32' onSubmit={ handleSubmit( submitHandler ) }>
      <Input
        placeholder='Title'
        id='__listing-title'
        { ...register( 'title' ) }
      />
      <div className='grid grid-cols-3 gap-2.5'>
        <Input
          placeholder='Discount %'
          id='__listing-discount'
          { ...register( 'discount' ) }
        />
        <Input
          placeholder='URL/Website'
          id='__listing-url'
          { ...register( 'url_website' ) }
          wrapperClx='col-span-2'
        />

      </div>
      <div className='grid grid-cols-2 gap-2.5'>
        <DatePicker
          placeholder='Expiration'
          currentDate={ expirationDateValue }
          onDateChange={
            date => setValue( 'expiration', date ? date.toDateString() : '' ) }
        />
      </div>
      <Input
        id='__list-img-upload'
        fileName={ fileName }
        type={ 'file' }
        label='Upload Promo Image'
        onChange={ handlePromoImg }
      />
      <Textarea
        id='__listing-desc'
        placeholder='Please enter additional details here'
        label='Description'
        { ...register( 'desc' ) }
      />
      <hr />
      <Button variant={ 'secondary' } disabled={isFetching}>
        { isFetching ? <Loader2 className='animate-spin' /> : 'Send' }
      </Button>
    </form>
  );
}