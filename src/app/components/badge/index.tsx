import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';


const baseClx = 'w-fit rounded-full px-2.5 text-[12px] text-white font-bold h-5 flex justify-center items-center';

const badgeVariants = cva( baseClx, {
  variants: {
    variant: {
      base: 'bg-slate-900',
      danger: 'bg-red-500'
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