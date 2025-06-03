import { Loader2 } from 'lucide-react';


export function Loading()
{
  return (
    <div className='fixed z-[999] inset-0 bg-white/30 flex items-center justify-center'>
      <Loader2 className='size-14 text-primary animate-spin'/>
    </div>
  )
}