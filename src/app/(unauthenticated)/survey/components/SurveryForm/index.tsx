'use client';
import { ChangeEvent, FormEventHandler, JSX, useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Loader2 } from 'lucide-react';

enum STEPS
{
  FIRST = 1,

  SECOND = 2,

  THIRD = 3,
  LAST = 4,
}

type FormStepHandler = ( entry: { prop: string, value: string; } ) => void;
type SurveyData = Record<string, string>;

interface FormStepProps
{
  handler: FormStepHandler;
}

//handler to handle change events in all inputs

const inputHandler = <T extends HTMLInputElement | HTMLTextAreaElement,>( e: ChangeEvent<T>, dataHandler: FormStepHandler ) =>
{
  const fieldName = e.target.name;
  const fieldValue = e.target.value;

  dataHandler( { prop: fieldName, value: fieldValue } );
};

//

const ZipcodeStep = ( { handler }: FormStepProps ) =>
{

  return (
    <div className='space-y-2.5 text-center'>
      <label htmlFor="__zipcode">Enter your location</label>
      <Input placeholder='ZIP code' name='zipcode' id='__zipcode' onChange={ e => inputHandler( e, handler ) } />
    </div>
  );
};

const EmailStep = ( { handler }: FormStepProps ) =>
{
  return (
    <div className='text-center space-y-2.5'>
      <label htmlFor="__email">Enter email address</label>
      <Input placeholder='Email' name='email' id='__email' onChange={ e => inputHandler( e, handler ) } />
    </div>
  );
};

const PhoneNumberStep = ( { handler }: FormStepProps ) =>
{
  return (
    <div className='space-y-2.5 text-center'>
      <label htmlFor="__phone-number">Enter phone number</label>
      <Input placeholder='Phone Number' name='cell' id='__phone-number' onChange={ e => inputHandler( e, handler ) } />
    </div>
  );
};

const CommentStep = ( { handler }: FormStepProps ) =>
{
  return ( <div className='space-y-2.5 text-center'>
    <label htmlFor="__phone-number">Comments</label>
    <textarea
      placeholder='Please provide any additional information here'
      name='comments'
      id='__comments'
      onChange={ e => inputHandler( e, handler ) }
      rows={ 6 }
      className='w-full py-3 px-4 rounded-lg border border-slate-300 focus:outline-rose-400 bg-slate-100 resize-none'
    />
  </div> );
};
export function SurveyForm()
{

  const [ step, setStep ] = useState<STEPS>( STEPS.FIRST );
  const [ surveyData, setSurveyData ] = useState<SurveyData>( {} );
  const [ isFetching, setIsFetching ] = useState( false );

  const handleNext = () => step < STEPS.LAST && setStep( prevStep => prevStep + 1 );
  const handlePrev = () => step > STEPS.FIRST && setStep( prevStep => prevStep - 1 );
  const handleSurveyData: FormStepHandler = ( entry ) =>
  {
    setSurveyData( prevEntry => ( { ...prevEntry, [ entry.prop ]: entry.value } ) );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async ( e ) =>
  {
    e.preventDefault();

    setIsFetching( true );

    try
    {
      const result = await fetch( '/get-quote', {
        method: 'POST',
        body: JSON.stringify( surveyData )
      } );

      setIsFetching( false );

      if ( result.ok )
      {

      }

      throw result;
    } catch ( error )
    {
      setIsFetching( false );
      console.log( error );
    }

  };

  const FormComponent: Record<STEPS, JSX.Element> = {
    1: <ZipcodeStep handler={ handleSurveyData } />,
    2: <EmailStep handler={ handleSurveyData } />,
    3: <PhoneNumberStep handler={ handleSurveyData } />,
    4: <CommentStep handler={ handleSurveyData } />
  };


  return (
    <form className='space-y-5' onSubmit={ handleSubmit }>
      { FormComponent[ step ] }
      <div className={ `flex ${ step === STEPS.FIRST ? 'justify-end' : 'justify-between' }` }>
        <button
          type='button'
          className={ `w-24 h-10 border border-slate-300 font-medium text-lg rounded ${ step === STEPS.FIRST ? 'hidden' : '' }` }
          onClick={ handlePrev }
        >
          Prev
        </button>
        { step !== STEPS.LAST && <button
          type='button'
          className='w-24 h-10 bg-rose-500 text-white font-medium text-lg rounded'
          onClick={ handleNext }
        >
          Next
        </button> }
        { step === STEPS.LAST && <button
          type='submit'
          className='min-w-[10rem] h-10 px-4 bg-rose-500 text-white font-medium text-lg rounded'
          onClick={ handleNext }
        >
          { isFetching ? <Loader2 className='h-5 aspect-square animate-spin mx-auto' /> : 'Get Quote' }
        </button> }
      </div>
    </form>
  );
}