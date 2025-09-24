import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';


const baseClx = 'w-fit rounded-full px-3 py-1 text-lg font-bold h-10 flex justify-center items-center capitalize';

const badgeVariants = cva( baseClx, {
  variants: {
    variant: {
      base: 'bg-slate-900 text-white',
      danger: 'bg-red-500 text-white',
      outline: 'bg-neutral text-neutral-foreground'
    }
  },
  defaultVariants: {
    variant: 'base'
  }
})
interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants>
{
  label: string;
}


export function Badge( { label,className,variant, ...props }: BadgeProps )
{
  


  return (
    <span {...props} className={ twMerge( badgeVariants({ variant }), className ) }>{ label }</span>
  )
}