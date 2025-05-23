import { ZipSearch } from './components/landing/zip-search';
import { CategoryPanel } from './components/landing/category-panel';
export default function Home()
{
  return (
    <div className="h-full">
      <div className='row-span-2 bg-landing bg-cover bg-center h-[70vh]'>
        <div className='grid grid-cols-2 h-full backdrop-contrast-10 px-20'>
          <div className='flex items-center'>
            <div className='bg-black/35 p-16 w-full rounded-2xl space-y-10'>
              <h1 className='text-5xl font-black tracking-tight text-white leading-[3.5rem]'>Find highly rated certified pros in Arizona.</h1>
              <ZipSearch />
            </div>
          </div>
        </div>
      </div>
      <div className='p-20 bg-white'>
        <CategoryPanel/>
      </div>
    </div>
  );
}
