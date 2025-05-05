import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';


const buttonVariants = cva( 'inline-flex items-center transition-colors justify-center space-x-[.5rem] whitespace-nowrap disabled:opacity-50 rounded-full', {
  variants: {
    variant: {
      primary: 'bg-rose-500 hover:bg-rose-500/90 text-white border border-transparent',
      secondary: 'bg-slate-900 hover:bg-slate-900/90 text-white',
      ghost: 'hover:bg-neutral-50 hover:text-slate-900',
      outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
      link: 'text-slate-700 underline-offset-4 hover:underline'
    },
    size: {
      default: 'py-3 px-4 w-full min-w-[9.5rem]',
      sm: 'text-sm p-2',
      icon: 'p-4'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})
type ButtonProps = HTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {};


export function Button( { className,children,variant,size, ...props }: ButtonProps )
{


  return (
    <button { ...props } className={twMerge( buttonVariants({ variant, size }), className)}>
      { children }
    </button>
  )
}