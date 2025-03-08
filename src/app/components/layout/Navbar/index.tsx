import { Navlinks } from './Navlinks';

export default function Navbar()
{
  return (
    <div className='fixed top-0 inset-x-0 bg-white z-10 flex h-14 border-b border-zinc-200 px-20 justify-between'>
      {/* logo */ }
      <div className='flex items-center w-full space-x-5'>
        <div>
          <div className='border'>
            Logo
          </div>
        </div>
        <div className='grow flex justify-between'>
         <Navlinks/>
        </div>
      </div>
    </div>
  );
}