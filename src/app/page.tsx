import { ZipSearch } from './components/landing/ZipSearch';
import { CategoryPanel } from './components/landing/CategoryPanel';
export default function Home()
{
  return (
    <div className="h-full grid grid-rows-3">
      <div className='row-span-2 bg-landing bg-cover bg-center'>
        <div className='grid grid-cols-2 h-full backdrop-contrast-10 px-20'>
          <div className='flex items-center'>
            <div className='bg-black/35 px-6 py-10 w-full rounded-2xl space-y-10'>
              <h1 className='text-5xl font-black tracking-tight text-white leading-[3.5rem]'>Find highly rated certified pros in Arizona.</h1>
              <ZipSearch />
            </div>
          </div>
        </div>
      </div>
      <div className='px-20'>
        <CategoryPanel/>
      </div>
    </div>
  );
}
