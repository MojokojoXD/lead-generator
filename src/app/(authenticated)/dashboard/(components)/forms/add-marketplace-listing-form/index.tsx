'use client';

import { RefCallBack, useForm, type SubmitHandler } from 'react-hook-form';
import { Input, InputError } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { ChangeEvent, useContext, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardContext } from '../../layout/main/parts';
import { DatePicker } from '@/app/components/shadcnUI/date-picker';
import { BUSINESS_NAME_PARAM, CATEGORY_PARAM } from '../../profile-portal/ProfileControl';
import validator from 'validator';
import { useSearchParams } from 'next/navigation';
import { Role } from '@/app/types/account';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/shadcnUI/select';

const VALID_IMG_FORMATS = [ 'jpg', 'jpeg', 'png' ];
const __5MB = 5242880;

export function AddMarketplaceListingForm( { role }: { role: Role; } )
{
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskQueueContext = useContext( DashboardContext );
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
    formState: { errors } } = useForm<ListingPayload>( {
      defaultValues: {
        _metadata: {
          status: 'REVIEW'
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
        businessName: searchParams.get( BUSINESS_NAME_PARAM ) ?? '',
        category: searchParams.get( CATEGORY_PARAM ) ?? ''
      }
    } );

  register( 'promo_img.filename', {
    required: 'Please upload promo image'
  } );
  register( 'expiration', {
    required: 'Please select expiration',
  } );

  let categoryRef: RefCallBack | undefined;
  let categoryName: string | undefined;

  if ( role === 'admin' )
  {
    const { ref, name } = register( 'category', {
      required: 'Please select category'
    } );

    categoryRef = ref
    categoryName = name;
  }

  const fileName = getValues( 'promo_img.filename' );
  const currentExpirationValue = watch( 'expiration' );



  const handlePromoImg = ( event: ChangeEvent<HTMLInputElement> ) =>
  {
    if ( errors.promo_img?.filename ) resetField( 'promo_img' );

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

    taskQueueContext?.addTask( {
      id: 'UPLOADING_PROMO',
      action: () => promoPromise
    } );

  };


  return (
    <form className='w-full pb-5 space-y-6 pr-4 pl-1 pt-1 overflow-auto' onSubmit={ handleSubmit( submitHandler ) }>
      { role === 'admin' && <div>
        <Input
          placeholder='Business Name*'
          id='__listing-business-name'
          { ...register( 'businessName', {
            required: 'Please enter business name'
          } ) }
        />
        <InputError errors={ errors } name={ 'business.name' } />
      </div> }
      <Input
        placeholder='Title'
        id='__listing-title'
        { ...register( 'title', {
          required: 'Please enter title'
        } ) }
      />
      <InputError errors={ errors } name={ 'title' } />
      <div className='h-full grid grid-cols-2 gap-x-2.5'>
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
        { role === 'admin' && <div>
          <Select onValueChange={ v => setValue( 'category', v ) } name={ categoryName }>
            <SelectTrigger className='w-full' ref={ categoryRef }>
              <SelectValue placeholder={ 'Category*' } />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="pest control">Pest Control</SelectItem>
              <SelectItem value="landscaping">Landscaping</SelectItem>
              <SelectItem value="pool">Pools</SelectItem>
            </SelectContent>
          </Select>
          <InputError errors={ errors } name={ 'category' } />
        </div> }

      </div>
      <div>
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