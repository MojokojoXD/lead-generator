'use client';
import { JSX, useState, useRef } from 'react';
import Script from 'next/script';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/app/components/ui/textarea';
import { Input, InputError } from '@/app/components/ui/input';
import { Button } from '@/app/components/shadcnUI/button';
import { useForm, FormProvider, useFormContext, type SubmitHandler, Controller } from 'react-hook-form';
import validator from 'validator';
import { DatePicker } from '@/app/components/shadcnUI/date-picker';
import
{
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/app/components/shadcnUI/select';
import
{
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/app/components/shadcnUI/alert-dialog';

enum STEPS
{
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
  LAST = 6
}

enum STATUS
{
  IDLE = 'IDLE',
  SUBMITTED = 'SUBMITTED',

  COMPLETED = 'COMPLETED'
}

type STATUS_MSGS = {
  title: string;
  desc: string;
};

const STATUS_CONFIG: Record<STATUS, STATUS_MSGS | undefined> = {
  SUBMITTED: {
    title: 'Oops!',
    desc: 'Something went wrong! Please contact system admin.'
  },
  COMPLETED: {
    title: 'Congratulations!',
    desc: 'Your application has been submitted and is in review.'
  },
  IDLE: undefined
};

export interface HandymanSurveyPayload
{
  jobDesc: {
    timeWindow: string;
    preferredDate: string;
    comment: string;
  };
  location: {
    streetAddress: string;
    zipcode: string;
    homeType: string;
    bedroomCount: string;
    bathroomCount: string;
    grossFloorArea: string;
  };
  contacts: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    method: string;
  };
}


//Steps

const JobDescStep = () =>
{
  const { register, formState: { errors } } = useFormContext<HandymanSurveyPayload>();


  return (
    <div>
      <div>
        <h2 className='font-medium mb-5 text-zinc-800 flex items-center'>What do you need help with?</h2>
      </div>
      <Textarea placeholder='e.g., Mount TV, Clean kitchen, Install blinds
' { ...register( 'jobDesc.comment', {
        required: 'Please enter job description'
} ) } />
      <InputError errors={ errors } name='jobDesc.comment'/>
    </div>
  );
};

const LocationStep = () =>
{
  const { register, formState: { errors } } = useFormContext<HandymanSurveyPayload>();

  return (
    <div>
      <div>
        <h2 className='font-medium mb-5 text-zinc-800 flex items-center'>Location</h2>
      </div>
      <div className='space-y-6'>
        <div>
          <Input
            placeholder='Zipcode*'
            { ...register( 'location.zipcode', {
              required: 'Please enter zipcode',
              validate: v => validator.isPostalCode( v, 'US' ) || 'Enter valid zipcode'
            } ) } />
          <InputError errors={ errors } name={ 'location.zipcode' } />
        </div>
      </div>
    </div>
  );
};

const TimeWindowStep = () =>
{
  const { control } = useFormContext<HandymanSurveyPayload>();

  return (
    <div>
      <div>
        <h2 className='font-medium mb-5 text-zinc-800 flex items-center'>Select a time slot?</h2>
      </div>
      <div className='space-y-6'>
        <div>
          <Controller
            control={ control }
            name={ 'jobDesc.timeWindow' }
            rules={ {
              required: 'Please select timeline'
            } }
            render={ ( { field, formState: { errors } } ) => (
              <>
                <Select value={ field.value } onValueChange={ ( v ) => field.onChange( v ) }>
                  <SelectTrigger name={ field.name } disabled={ field.disabled }>
                    <SelectValue placeholder='Select window' />
                  </SelectTrigger>
                  <SelectContent ref={ field.ref }>
                    <SelectItem value='Morning (8 AM - 12 PM)'>Morning (8 AM - 12 PM)</SelectItem>
                    <SelectItem value='Afternoon (12 PM - 4 PM)'>Afternoon (12 PM - 4 PM)</SelectItem>
                    <SelectItem value='Evening (4 PM - 7 PM)'>Evening (4 PM - 7 PM)</SelectItem>
                    <SelectItem value='Flexible'>Flexible</SelectItem>
                  </SelectContent>
                </Select>
                <InputError errors={ errors } name={ 'jobDesc.timeWindow' } />
              </>
            ) }
          />
        </div>
      </div>
    </div>
  );
};

const PreferredDateStep = () =>
{

  const { control, formState: { errors } } = useFormContext<HandymanSurveyPayload>();

  return (
    <div>
      <div className='mb-5'>
        <h2 className='font-medium text-zinc-800 flex items-center'>When do you need a handyman?</h2>
      </div>
      <div>
        <Controller
          control={ control }
          name={ 'jobDesc.preferredDate' }
          rules={ {
            required: 'Please select date'
          } }
          render={ ( { field } ) => (
            <div ref={ field.ref }>
              <DatePicker onDateChange={ d => field.onChange( d ) } currentDate={ field.value } />
            </div>
          ) }
        />
        <InputError errors={ errors } name={ 'jobDesc.preferredDate' } />
      </div>
    </div>
  );
};


const ContactStep = () =>
{

  const recaptchaKey = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_DEV
    : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if ( !recaptchaKey ) throw new Error( 'google recaptcha key is missing' );

  const { register, formState: { errors }, control } = useFormContext<HandymanSurveyPayload>();

  return (
    <div>
      <div className='mb-5'>
        <h2 className='font-medium text-zinc-800 flex items-center text-lg'>Contact Details</h2>
      </div>
      <div className='space-y-6'>
        <div id='recaptcha-container' data-size='invisible'>
        </div>

        <div className='grid grid-cols-2 gap-x-2.5 gap-y-6'>
          <div>
            <Input
              placeholder='First Name*'
              { ...register( 'contacts.firstName', {
                required: 'Please enter first name',
              } ) } />
            <InputError errors={ errors } name={ 'contacts.firstName' } />
          </div>
          <div>
            <Input
              placeholder='Last Name*'
              { ...register( 'contacts.lastName', {
                required: 'Please enter last name',
              } ) } />
            <InputError errors={ errors } name={ 'contacts.lastName' } />
          </div>
        </div>
        <div>
          <Input
            placeholder='Email'
            { ...register( 'contacts.email', {
              required: 'Please enter email address',
              validate: v => validator.isEmail( v ) || 'Email must be of the format name@example.com'
            } ) } />
          <InputError errors={ errors } name={ 'contacts.email' } />
        </div>
        <div>
          <Input
            placeholder='Phone'
            { ...register( 'contacts.phone', {
              required: 'Please enter phone number',
              validate: v => validator.isMobilePhone( v ) || 'Please enter valid phone number'
            } ) } />
          <InputError errors={ errors } name={ 'contacts.phone' } />
        </div>
        <div>
          <Controller
            name={ 'contacts.method' }
            control={ control }
            rules={ {
              required: 'Select contact method'
            } }
            render={ ( { formState: { errors: errors_contact }, field } ) => (
              <>
                <Select
                  onValueChange={ v => field.onChange( v ) }
                  value={ field.value }
                >
                  <SelectTrigger ref={ field.ref } name={ field.name }>
                    <SelectValue placeholder='Contact Method*' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='email'>Email</SelectItem>
                    <SelectItem value='phone'>Call</SelectItem>
                    <SelectItem value='text'>Text</SelectItem>
                  </SelectContent>
                </Select>
                <InputError errors={ errors_contact } name={ field.name } />
              </>

            ) }
          />
        </div>
      </div>
      <Script src='https://www.google.com/recaptcha/api.js'
        onReady={ () =>
        {
          //@ts-expect-error grecaptcha comes from an external script
          if ( window.grecaptcha )
          {
            //@ts-expect-error grecaptcha comes from an external script
            window.grecaptcha.ready( () =>
            {
              //@ts-expect-error grecaptcha comes from an external script
              const widgetId = window.grecaptcha.render( 'recaptcha-container', {
                sitekey: recaptchaKey,
                callback: 'onCaptcha'
              } );

              localStorage.setItem( 'recaptcha_widget_id', widgetId );
            } );


          }
        } }
      />
      <Script
        id='recaptcha-callback'
      >
        {
          `
            function onCaptcha( token ){
                const submitBtn = document.getElementById('__survey-form-sub');
                const recaptchaInput = document.getElementById('__recaptcha-token');

                recaptchaInput.value = token;

                submitBtn?.click();

            }
          `
        }
      </Script>
    </div>
  );
};

const HomeDetailsStep = () =>
{
  const { control, register, formState: { errors } } = useFormContext<HandymanSurveyPayload>();

  const homeTypes = [ 'Single Story', 'Two Story', 'Apartment/Condo' ];


  return (
    <div>
      <div>
        <h2 className='font-medium mb-5 text-zinc-800 flex items-center'>Tell us a little bit about your home.</h2>
      </div>
      <div className='space-y-6'>
        <div>
          <Input type='text' placeholder='Street Address*' { ...register( 'location.streetAddress', {
            required: 'Please enter street address'
          } ) } />
          <InputError errors={ errors } name={ 'location.streetAddress' } />
        </div>
        <div>
          <Controller
            control={ control }
            name={ 'location.homeType' }
            rules={ {
              required: 'Please select home type'
            } }
            render={ ( { field, formState: { errors } } ) => (
              <>
                <div className='grid grid-flow-col'>
                  {
                    homeTypes.map( h => (
                      <div key={ h } className='space-x-1' ref={ field.ref }>
                        <input
                          type={ 'radio' }
                          { ...field }
                          id={ h } value={ h }
                        />
                        <label htmlFor={ h } className='text-sm'> { h }</label>
                      </div>
                    ) )
                  }
                </div>
                <InputError errors={ errors } name={ 'location.homeType' } />
              </>
            ) }
          />
        </div>
        <div>
          <Input placeholder='Number of Bedrooms*' id='survey_home-details__bedrooms' { ...register( 'location.bedroomCount', {
            required: 'Please enter number of bedrooms',
            validate: v => !Number.isNaN( parseInt( v ) ) || 'Input must be a number'
          } ) } />
          <InputError errors={ errors } name='location.bedroomCount' />
        </div>
        <div>
          <Input placeholder='Number of Bathrooms*' id='survey_home-details__bathrooms' { ...register( 'location.bathroomCount', {
            required: 'Please enter number of bathrooms',
            validate: v => !Number.isNaN( parseInt( v ) ) || 'Input must be a number'
          } ) } />
          <InputError errors={ errors } name='location.bathroomCount' />
        </div>
        <div>
          <Input placeholder='Size of home(sq ft)*' id='survey_home-details__home-size' { ...register( 'location.grossFloorArea', {
            required: 'Please enter size of home',
            validate: v => !Number.isNaN( parseFloat( v ) ) || 'Input must be a number'
          } ) } />
          <InputError errors={ errors } name='location.grossFloorArea' />
        </div>
      </div>
    </div>
  );
};

export function HandymanSurveyForm()
{
  const [ step, setStep ] = useState<STEPS>( STEPS.FIRST );
  const [ submissionStatus, setSubmissionStatus ] = useState<STATUS>( STATUS.IDLE );
  const methods = useForm<HandymanSurveyPayload>( {
    defaultValues: {
      jobDesc: {
        comment: '',
        preferredDate: '',
        timeWindow: ''
      },
      location: {
        streetAddress: '',
        zipcode: '',
        homeType: '',
        bedroomCount: '',
        bathroomCount: '',
        grossFloorArea: ''
      },
      contacts: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        method: ''
      }
    }
  } );

  const { handleSubmit, trigger, reset } = methods;
  const [ isFetching, setIsFetching ] = useState( false );

  //refs
  const recaptchaTokenRef = useRef<HTMLInputElement | null>( null );

  //handlers
  const handleNext = async () =>
  {
    const isStepValid = await trigger();
    if ( !isStepValid ) return;
    if ( step < STEPS.LAST ) setStep( prevStep => prevStep + 1 );
  };
  const handlePrev = () => step > STEPS.FIRST && setStep( prevStep => prevStep - 1 );

  const handleAlertDialogAction = () =>
  {
    reset();
    setStep( STEPS.FIRST );
  };

  const submitHandler: SubmitHandler<HandymanSurveyPayload> = async ( data ) =>
  {
    setIsFetching( true );

    try
    {
      if ( !recaptchaTokenRef.current?.value )
      {
        console.log( 'Recaptcha token not set' );
        alert( 'Something went wrong! Please try again later' );
        return;
      };

      const recaptchaToken = recaptchaTokenRef.current.value;

      const result = await fetch( `/get-quote-handyman?recaptcha-token=${ recaptchaToken }`, {
        method: 'POST',
        body: JSON.stringify( data )
      } );



      const widgetId = localStorage.getItem( 'recaptcha_widget_id' );
      if ( widgetId )
      {
        //@ts-expect-error grecaptcha comes from an external script
        window.grecaptcha.ready( () =>
        {
          //@ts-expect-error grecaptcha comes from an external script
          window.grecaptcha.reset( widgetId );
          window.localStorage.removeItem( 'recaptcha_widget_id' );
        } );

      }

      if ( result.ok )
      {
        setSubmissionStatus( STATUS.COMPLETED );
        return;
      }

      setSubmissionStatus( STATUS.SUBMITTED );

      throw result;
    } catch ( error )
    {
      console.log( error );
    } finally
    {
      setIsFetching( false );
    }

  };

  const FormComponent: Record<STEPS, JSX.Element> = {
    1: <JobDescStep />,
    2: <LocationStep />,
    3: <PreferredDateStep />,
    4: <TimeWindowStep />,
    5: <HomeDetailsStep />,
    6: <ContactStep />
  };


  return (
    <FormProvider { ...methods }>
      <form onSubmit={ handleSubmit( submitHandler ) } id='__survey-form'>
        <AlertDialog
          open={ submissionStatus === STATUS.COMPLETED || submissionStatus === STATUS.SUBMITTED }
          onOpenChange={ ( open ) =>
          {
            if ( open ) return;

            setSubmissionStatus( STATUS.IDLE );
          } }
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{ STATUS_CONFIG[ submissionStatus ]?.title ?? '' }</AlertDialogTitle>
              <AlertDialogDescription>{ STATUS_CONFIG[ submissionStatus ]?.desc ?? '' }</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={ handleAlertDialogAction }>Ok</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className='mb-5'>
          { step === STEPS.LAST &&
            <input hidden type='text' id='__recaptcha-token' ref={ recaptchaTokenRef } /> }
          { FormComponent[ step ] }
        </div>
        <div className={ `flex ${ step === STEPS.FIRST ? 'justify-end' : 'justify-between' }` }>
          <Button
            type='button'
            variant={ 'outline' }
            size={ 'lg' }
            className={ `min-w-[8rem] ${ step === STEPS.FIRST ? 'hidden' : '' }` }
            onClick={ handlePrev }
          >
            Prev
          </Button>
          { step !== STEPS.LAST && <Button
            type='button'
            size={ 'lg' }
            onClick={ handleNext }
            className='min-w-[8rem]'
          >
            Next
          </Button> }
          { step === STEPS.LAST && <Button
            type='button'
            id='__survey-submit-btn'
            size={ 'lg' }
            className='min-w-[8rem]'
            //@ts-expect-error grecaptcha comes from a script
            onClick={ () => window.grecaptcha && window.grecaptcha.execute() }
          >
            { isFetching
              ? <Loader2 className='h-5 aspect-square animate-spin mx-auto' />
              : 'Get Quote' }
          </Button> }
          <input id='__survey-form-sub' type='submit' hidden />
        </div>
      </form>
    </FormProvider>
  );
}