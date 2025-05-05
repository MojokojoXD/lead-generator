import { ReactNode } from 'react';
import Link from 'next/link';
interface CategoryButtonProps
{
  name: string;
  children: ReactNode;
  destination: string;
}

export function CategoryButton({ name, children,destination }: CategoryButtonProps)
{


  return (
      <Link href={destination} className='block flex flex-col justify-between w-full aspect-square p-3 rounded-xl border-slate-200 border bg-slate-50 hover:bg-slate-100 hover:shadow-sm'>
        <div className='h-full flex flex-col justify-center items-center'>
          { children }
          <p className='text-base text-center font-medium text-wrap mt-5'>{ name }</p>
        </div>
      </Link>
  )
}