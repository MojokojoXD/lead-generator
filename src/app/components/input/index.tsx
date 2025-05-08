import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';


type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  wrapperClx?: string;
};


export function Input( { className,label,wrapperClx, ...props }: InputProps )
{

  if ( label && !props.id ) throw new Error( 'element id must be provided if a label is provided' );

  const defaultStyles = 'w-full py-3 px-4 rounded-full border border-slate-300 focus-visible:outline-rose-400 bg-slate-50 peer order-2 mt-3'

  return (
    <div className={twMerge('w-full flex flex-col', wrapperClx && wrapperClx)}>
      <input { ...props } className={ twMerge(defaultStyles, className) } />
      { label && <label htmlFor={ props.id } className='text-sm px-4 peer-focus:text-rose-500 order-1 font-medium'>{ label }</label>}
    </div>
  )
}