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
    <Link href={destination}>
      <div className='flex flex-col justify-between w-26 p-3 rounded-xl border-slate-200 border bg-slate-50 hover:bg-slate-100 hover:shadow-sm'>
        <div className='h-20 flex justify-center items-center'>
          { children }
        </div>
        <div>
          <p className='text-sm text-center font-medium text-wrap'>{ name }</p>
        </div>
      </div>
    </Link>
  )
}