import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';


type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};


export function Textarea( { className, label, ...props }: TextareaProps )
{

  if ( label && !props.id ) throw new Error( 'element id must be provided if a label is provided' );

  const defaultStyles = 'w-full py-2 px-3 rounded-md border border-input focus:border-transparent focus:ring-1 outline-none ring-primary bg-transparent peer order-2 resize-none placeholder:text-muted-foreground shadow-sm text-sm';

  return (
    <div className='relative w-full flex flex-col'>
      <textarea { ...props } className={ twMerge( defaultStyles, className ) } rows={6}/>
    </div>
  );
}