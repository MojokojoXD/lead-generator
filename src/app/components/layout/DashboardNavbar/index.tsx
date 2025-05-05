import Link from 'next/link'

export function DashboardNavbar()
{
  return (
    <div className={ 'fixed top-0 inset-x-0 bg-white z-10 flex h-14 border-b border-slate-200 px-20 justify-between' }>
      {/* logo */ }
      <div className='flex items-center w-full space-x-5'>
        <div>
          <div className='border'>
            <Link href={'/'}>
              Logo
            </Link>
          </div>
        </div>
        <div className='grow flex justify-between'>
          
        </div>
      </div>
    </div>
  )
}