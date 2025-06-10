'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input, InputError } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { ChangeEvent, useContext, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { QueueContext } from '../../layout/main/parts';
import { DatePicker } from '@/app/components/shadcnUI/date-picker';
import { BUSINESS_NAME_PARAM, CATEGORY_PARAM } from '../../profile-portal/ProfileControl';
import validator from 'validator';
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
  const currentURL = useRef<URL>(
    new URL( location.href ) );
  const router = useRouter();
  const taskQueueContext = useContext( QueueContext );
  const [ isFetching, setIsFetching ] = useState( false );
  const [ promoImgFile, setPromoImgFile ] = useState<File | null>( null );
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    setError,
    getValues,
    watch,
    formState: { errors }} = useForm<ListingPayload>( {
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
      },
      businessName: currentURL.current.searchParams.get( BUSINESS_NAME_PARAM ) ?? '',
      category: currentURL.current.searchParams.get( CATEGORY_PARAM ) ?? ''
    }
  } );

  register( 'promo_img.filename', {
    required: 'Please upload promo image'
  } );
  register( 'expiration', {
    required: 'Please select expiration',
  } )

  const fileName = getValues( 'promo_img.filename' );
  const currentExpirationValue = watch( 'expiration' );



  const handlePromoImg = ( event: ChangeEvent<HTMLInputElement> ) =>
  {
    if ( errors.promo_img?.filename ) resetField( 'promo_img' )

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

    taskQueueContext?.add( () => promoPromise );

  };


  return (
    <form className='w-full max-w-md pb-5 space-y-6 pr-4 pl-1 pt-1' onSubmit={ handleSubmit( submitHandler ) }>
      <Input
        placeholder='Title'
        id='__listing-title'
        { ...register( 'title', {
          required: 'Please enter title'
        } ) }
      />
      <InputError errors={ errors } name={ 'title' } />
      <div className='h-full grid grid-cols-2 gap-y-6'>
        <div>
          <Input
            placeholder='Discount %'
            id='__listing-discount'
            { ...register( 'discount', {
              required: 'Please enter discount amount',
              max: {
                value: 100,
                message: 'Discount amount invalid'
              },
              min: {
                value: 0,
                message: 'Discount amount invalid'
              }
            } ) }
          />
          <InputError errors={ errors } name={ 'discount' } />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='URL/Website'
            id='__listing-url'
            { ...register( 'url_website', {
              required: 'Please enter website url',
              validate: v => validator.isURL( v ) || 'Please enter valid url'
            } ) }
          />
          <InputError errors={ errors } name={ 'url_website' } />
        </div>
      </div>
      <div className='h-full grid grid-cols-2 gap-2.5'>
        <div>
          <DatePicker
            placeholder='Expiration'
            currentDate={ currentExpirationValue }
            onDateChange={
              date => setValue( 'expiration', date ) }
          />
          <InputError errors={ errors } name={ 'expiration' } />
        </div>
      </div>
      <Input
        id='__list-img-upload'
        fileName={ fileName }
        type={ 'file' }
        label='Upload Promo Image'
        onChange={ handlePromoImg }
      />
      <InputError errors={ errors } name={ 'promo_img.filename' } />
      <Textarea
        id='__listing-desc'
        placeholder='Please enter additional details here'
        label='Description'
        { ...register( 'desc' ) }
      />
      <hr />
      <Button variant={ 'secondary' } disabled={ isFetching }>
        { isFetching ? <Loader2 className='animate-spin' /> : 'Send' }
      </Button>
    </form>
  );
}