import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';
import { Upload } from 'lucide-react';


type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  wrapperClx?: string;
  fileName?: string;
};


export function Input( { className, label, wrapperClx, fileName, ...props }: InputProps )
{

  if ( label && !props.id ) throw new Error( 'element id must be provided if a label is provided' );

  const defaultStyles = 'w-full py-5 px-4 rounded-lg border border-slate-200 bg-slate-50 peer order-2 focus:outline outline-rose-500 focus:border-transparent';

  const fileStyles = 'hidden';

  if ( props.type === 'file' ) return (
    <div className='flex justify-between items-center'>
      <label htmlFor={ props.id } className='cursor-pointer inline-flex items-center transition-colors justify-center space-x-[.5rem] whitespace-nowrap disabled:opacity-50 bg-rose-500 hover:bg-rose-500/90 text-white border border-transparent rounded-lg font-bold justify-start text-[14px] py-3 shadow-sm px-3.5'>
          <Upload className='mr-1.5 size-5'/>Upload Image
      </label>
      <input type="file" name="file-upload" className='hidden' { ...props } />
      <span className='underline'>{ fileName ?? '' }</span>
    </div>
  );


  return (
    <div className={ twMerge( 'relative w-full flex flex-col', wrapperClx && wrapperClx ) }>
      <input { ...props } className={ twMerge( defaultStyles, className, props.type === 'file' && fileStyles ) } />
      { label && <label htmlFor={ props.id } className='absolute top-1.5 text-[10px] px-4 peer-focus:text-rose-500 order-1 font-bold text-slate-500 uppercase tracking-wide'>{ label }</label> }
    </div>
  );
}