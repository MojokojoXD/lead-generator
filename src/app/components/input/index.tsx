import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';


type InputProps = InputHTMLAttributes<HTMLInputElement> & {};


export function Input( { className, ...props }: InputProps )
{

  const defaultStyles = 'w-full py-3 px-4 rounded-full border border-slate-300 focus:outline-rose-400 bg-slate-100'

  return (
    <input { ...props } className={ twMerge(defaultStyles, className) } />
  )
}