import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';


type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};


export function Textarea( { className, label, ...props }: TextareaProps )
{

  if ( label && !props.id ) throw new Error( 'element id must be provided if a label is provided' );

  const defaultStyles = 'w-full py-3 px-4 rounded-xl border border-slate-300 focus:outline-rose-400 bg-slate-50 peer order-2 mt-3 resize-none';

  return (
    <div className='w-full flex flex-col'>
      <textarea { ...props } className={ twMerge( defaultStyles, className ) } rows={6}/>
      { label && <label htmlFor={ props.id } className='text-sm px-4 peer-focus:text-rose-500 order-1 font-medium'>{ label }</label> }
    </div>
  );
}