import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';


type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};


export function Textarea( { className, label, ...props }: TextareaProps )
{

  if ( label && !props.id ) throw new Error( 'element id must be provided if a label is provided' );

  const defaultStyles = 'w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-transparent focus:outline outline-rose-400 bg-slate-50 peer order-2 resize-none py-6 placeholder:text-slate-400';

  return (
    <div className='relative w-full flex flex-col'>
      <textarea { ...props } className={ twMerge( defaultStyles, className ) } rows={6}/>
      { label && <label htmlFor={ props.id } className='absolute top-1.5 text-[12px] px-4 peer-focus:text-rose-500 order-1 font-medium text-slate-500'>{ label }</label> }
    </div>
  );
}