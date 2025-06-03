import { SurveyForm } from '../components/SurveryForm';

export default async function SurveyCategory( { params }: {params: Promise<{ category: string; }>} )
{
  const slug = await params;

  const category = slug.category.split( '-' ).join( ' ' );

  return (
    <div className='h-fit flex justify-center py-16'>
      <div className='h-full max-w-3xl text-prose'>
        <h1 className='text-3xl sm:text-5xl font-normal tracking-tighter text-center leading-tight mb-10 mx-5'>Compare quotes from top-rated <span className='text-primary'>{ category }</span> contractors</h1>
        <div className='bg-white py-6 shadow-sm rounded-lg px-8 max-w-lg mx-1.5 sm:mx-auto space-y-8 border '>
          <SurveyForm category={ category as Categories } />
        </div>
      </div>
    </div>
  );
}