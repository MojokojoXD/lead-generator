import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';
import { Upload } from 'lucide-react';
import { type FieldErrors, type FieldValues, type FieldName } from 'react-hook-form';
import { ErrorMessage, type FieldValuesFromFieldErrors } from '@hookform/error-message';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  wrapperClx?: string;
  fileName?: string;
};

interface InputErrorProps<T extends FieldValues = FieldValues>
{
  errors: FieldErrors<T>,

  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
}

export function InputError<T extends FieldValues>( { errors, name }: InputErrorProps<T> )
{
  return (
    <ErrorMessage errors={ errors } name={ name } render={ ( { message } ) => (
      <span className='text-red-500 mt-1 text-sm'>{ message }</span>
    )}/>
  )
}


export function Input( { className, label, wrapperClx, fileName, ...props }: InputProps )
{

  if ( label && !props.id ) throw new Error( 'element id must be provided if a label is provided' );

  const defaultStyles = 'h-14 w-full py-2 px-3 rounded-md bg-transparent border border-input text-sm peer order-2 focus:ring-1 ring-primary focus:border-transparent placeholder:text-muted-foreground shadow-sm focus:outline-none';


  if ( props.type === 'file' ) return (
    <div className='flex justify-between items-center'>
      <label htmlFor={ props.id } className='cursor-pointer inline-flex items-center transition-colors justify-center space-x-[.5rem] whitespace-nowrap disabled:opacity-50 bg-primary hover:bg-primary/90 text-white border border-transparent rounded-lg font-bold justify-start text-[14px] py-3 shadow-sm px-3.5'>
          <Upload className='mr-1.5 size-5'/>Upload Image
      </label>
      <input type="file" name="file-upload" className='hidden' { ...props } />
      <span className='underline'>{ fileName ?? '' }</span>
    </div>
  );


  return (
    <div className={ twMerge( 'relative w-full flex flex-col', wrapperClx && wrapperClx ) }>
      <input { ...props } className={ twMerge( defaultStyles, className ) } />
      {/* { label && <label htmlFor={ props.id } className='absolute top-1.5 text-[12px] px-4 peer-focus:text-primary order-1 text-slate-500'>{ label }</label> } */}
    </div>
  );
}