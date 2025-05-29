'use client';
import { JSX, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/app/components/ui/textarea';
import { Input, InputError } from '@/app/components/ui/input';
import { Button } from '@/app/components/shadcnUI/button';
import { useForm, FormProvider, useFormContext, type SubmitHandler, Controller } from 'react-hook-form';
import validator from 'validator';
import { cn } from '@/lib/utils';
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

const BUDGET_RANGE = [ '< $1000', '$1k-$10k', '$10k-$50k', '> $50k' ];

enum STEPS
{
  FIRST = 1,

  SECOND = 2,

  THIRD = 3,

  FOURTH = 4,

  FIFTH = 5,
  LAST = 6,
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
 }

const STATUS_CONFIG: Record<STATUS, STATUS_MSGS | undefined> = {
  SUBMITTED: {
    title: 'Oops!',
    desc: 'Something went wrong! Please contact system admin.'
  },
  COMPLETED: {
    title: 'Done!',
    desc: 'Our top rated contractor will be in touch soon.'
  },
  IDLE: undefined
}

export interface SurveyJobPayload
{
  comments: string;

  desc: string;
  location: {
    desc: string;
    zipcode: string;
  };
  timeline: string;
  budget: string;

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
  const { register, formState: { errors } } = useFormContext<SurveyJobPayload>();


  return (
    <div>
      <div>
        <h2 className='font-medium mb-5 text-zinc-800 flex items-center text-lg'>Description of the job</h2>
        <div className='bg-secondary border text-secondary-foreground py-4 px-5 rounded-lg mb-5 font-semibold text-sm'>
          <div>
            <p className='mb-2.5'>Provide a detailed description of what you need done</p>
            <ul className='list-disc list-inside'>
              <li>What specifically needs done?</li>
              <li>Are there any special requests or customizations?</li>
            </ul>
          </div>
        </div>
      </div>
      <Textarea placeholder='Type here...' { ...register( 'desc', {
        required: 'Please enter job description'
      } ) } />
      <InputError errors={ errors } name={ 'desc' } />
    </div>
  );
};

const LocationStep = () =>
{
  const { register, formState: { errors } } = useFormContext<SurveyJobPayload>();

  return (
    <div>
      <div>
        <h2 className='font-medium mb-5 text-zinc-800 flex items-center text-lg'>Location of the job</h2>
        <div className='bg-secondary border text-secondary-foreground text-sm font-semibold py-4 px-5 rounded-lg mb-5'>
          <div >
            <ul className='list-disc list-inside'>
              <li>Exact address or at least the city/area.</li>
              <li>Any access issues? (e.g., limited parking, gated entry, remote location)</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='space-y-6'>
        <div>
          <Textarea placeholder='Type here...' { ...register( 'location.desc' ) } />
        </div>
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

const TimelineStep = () =>
{
  const { register, formState: { errors } } = useFormContext<SurveyJobPayload>();

  return (
    <div>
      <div>
        <h2 className='font-medium mb-5 text-zinc-800 flex items-center text-lg'>Timeline</h2>
        <div className='bg-secondary text-secondary-foreground border font-semibold text-sm py-4 px-5 rounded-lg mb-5'>
          <div>
            <ul className='list-disc list-inside'>
              <li>When do you want the job to start?</li>
              <li>Any deadlines or urgency?</li>
              <li>Is flexibility allowed?</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='space-y-6'>
        <div>
          <Textarea placeholder='Type here...' { ...register( 'timeline', {
            required: 'Please enter timeline'
          } ) } />
          <InputError errors={ errors } name={ 'timeline' } />
        </div>
      </div>
    </div>
  );
};

const BudgetStep = () =>
{
  const { register, formState: { errors }, watch } = useFormContext<SurveyJobPayload>();

  const currentBudget = watch( 'budget' );

  const attributes = register( 'budget', {
    required: 'Select budget range'
  } );

  const radioClsx = ( budgetValue: string ) => cn( 'cursor-pointer h-14 border shadow-sm inline-block px-3 rounded-lg flex items-center justify-center text-sm font-medium tracking-wide min-w-[6rem]', budgetValue === currentBudget && 'bg-secondary text-secondary-foreground' );

  return (
    <div>
      <div className='mb-5'>
        <h2 className='font-medium text-zinc-800 flex items-center text-lg'>Budget</h2>
      </div>
      <div>
        <div className='grid md:grid-flow-col auto-cols-fr grid-cols-2 gap-2.5 h-full w-full'>
          {
            BUDGET_RANGE.map( b => (
              <label
                key={ b }
                htmlFor={ `__radio-option-${ b }` }
                className={ radioClsx( b ) }
              >
                <input
                  id={ `__radio-option-${ b }` }
                  className='appearance-none'
                  type={ 'radio' }
                  { ...attributes }
                  value={b}
                />
                { b }
              </label>
            ) )
          }
        </div>
        <InputError errors={ errors } name={ 'budget' } />
      </div>
    </div>
  );
};

const ContactStep = () =>
{
  const { register, formState: { errors }, control } = useFormContext<SurveyJobPayload>();

  return (
    <div>
      <div className='mb-5'>
        <h2 className='font-medium text-zinc-800 flex items-center text-lg'>Contact Details</h2>
      </div>
      <div className='space-y-6'>
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
              validate: v => v.length === 0 || validator.isEmail( v ) || 'Email must be of the format name@example.com'
            } ) } />
          <InputError errors={ errors } name={ 'contacts.email' } />
        </div>
        <div>
          <Input
            placeholder='Phone'
            { ...register( 'contacts.phone', {
              validate: v => v.length === 0 || validator.isMobilePhone( v ) || 'Please enter valid phone number'
            } ) } />
          <InputError errors={ errors } name={ 'contacts.phone' } />
        </div>
        <div>
          <Controller
            name={ 'contacts.method' }
            control={control}
            rules={ {
              required: 'Select contact method'
            } }
            render={ ( { formState: { errors: errors_contact }, field } ) => (
              <>
                <Select
                  onValueChange={ v => field.onChange( v ) }
                  value={ field.value }
                >
                  <SelectTrigger ref={field.ref} name={ field.name }>
                    <SelectValue placeholder='Contact Method*'/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='email'>Email</SelectItem>
                    <SelectItem value='phone'>Phone</SelectItem>
                  </SelectContent>
                </Select>
                <InputError errors={ errors_contact } name={ field.name } />
              </>
              
            ) }
          />
        </div>
      </div>
    </div>
  );
  };

const CommentStep = () =>
{
  const { register } = useFormContext<SurveyJobPayload>();

  return (
    <div>
      <div className='mb-5'>
        <h2 className='font-medium text-zinc-800 flex items-center text-lg'>Comments</h2>
      </div>
      <div className='space-y-6'>
        <div>
          <Textarea placeholder='Type here...' { ...register( 'comments' ) } />
        </div>
      </div>
    </div>
  );
};
export function SurveyForm()
{

  const [ step, setStep ] = useState<STEPS>( STEPS.FIRST );
  const [ submissionStatus, setSubmissionStatus ] = useState<STATUS>( STATUS.IDLE );
  const methods = useForm<SurveyJobPayload>( {
    defaultValues: {
      budget: BUDGET_RANGE.at(0) ?? '',
      location: {
        desc: '',
        zipcode: ''
      },
      timeline: '',
      comments: '',
      desc: '',
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

  const handleNext = async () =>
  {
    const isStepValid = await trigger();
    if ( !isStepValid ) return;
    if(step < STEPS.LAST) setStep( prevStep => prevStep + 1 );
  };
  const handlePrev = () => step > STEPS.FIRST && setStep( prevStep => prevStep - 1 );

  const handleAlertDialogAction = () =>
  {
    reset();
    setStep( STEPS.FIRST );
  }

  const submitHandler: SubmitHandler<SurveyJobPayload> = async ( data ) =>
  {
    setIsFetching( true );

    try
    {
      const result = await fetch( '/get-quote', {
        method: 'POST',
        body: JSON.stringify( data )
      } );

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
    3: <TimelineStep />,
    4: <BudgetStep />,
    5: <ContactStep/>,
    6: <CommentStep />
  };


  return (
    <FormProvider { ...methods }>
      <form onSubmit={ handleSubmit( submitHandler ) }>
        <AlertDialog open={ submissionStatus === STATUS.COMPLETED || submissionStatus === STATUS.SUBMITTED } onOpenChange={ ( open ) =>
        {
          if ( open ) return;

          setSubmissionStatus( STATUS.IDLE );
        } }>
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
        <div className='mb-10'>
          { FormComponent[ step ] }
        </div>
        <hr className='mb-10'/>
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
            type='submit'
            size={ 'lg' }
            className='min-w-[8rem]'
          >
            { isFetching ? <Loader2 className='h-5 aspect-square animate-spin mx-auto' /> : 'Get Quote' }
          </Button> }
        </div>
      </form>
    </FormProvider>
  );
}